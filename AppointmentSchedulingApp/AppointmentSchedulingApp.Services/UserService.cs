using AppointmentSchedulingApp.Domain.Contracts.Repositories;
using AppointmentSchedulingApp.Domain.Contracts.Services;
using AppointmentSchedulingApp.Domain.DTOs;
using AppointmentSchedulingApp.Domain.Models;

using AppointmentSchedulingApp.Services.Helper;
using Microsoft.Extensions.Options;

using AutoMapper;

using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace AppointmentSchedulingApp.Services
{
    public class UserService : IUserService
    {
        private readonly IGenericRepository<User> _userRepository;
        private readonly AppSettings _appSettings;
        public readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;

        private readonly IMapper _mapper;
        

        public UserService(IGenericRepository<User> userRepository,
            IOptionsMonitor<AppSettings> optionsMonitor,
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration configuration,
            IMapper mapper)
        {
            _userRepository = userRepository;
            _appSettings = optionsMonitor.CurrentValue;
            _userManager = userManager;
            _mapper = mapper;
            _signInManager = signInManager;
            _configuration = configuration;
        }


        public string GenerateToken(UserDTO user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            var secretKeyBytes = Encoding.UTF8.GetBytes(_appSettings.SecretKey);

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.DateOfBirth,user.Dob.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
               
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                
                new Claim("UserName", user.UserName ),
                //new Claim("Id", user.UserId.ToString()),
                
                new Claim("TokenId", Guid.NewGuid().ToString()),
            };

            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(authClaims),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKeyBytes), SecurityAlgorithms.HmacSha512Signature),
            };
            var token = jwtTokenHandler.CreateToken(tokenDescription);


            return jwtTokenHandler.WriteToken(token);
        }
        // da~ oke

        //public async Task<UserDTO?> LoginUser(SignInDTO userLogin, StringBuilder message)
        //{
        //    var user = await _userRepository.Get(u => u.Phone == userLogin.Phone);
        //    if (user == null || !VerifyPassword(userLogin.Password, user.Password))
        //    {
        //        message.Append("Invalid Phone/Password");
        //        return null;
        //    }

        //    var userDTO = new UserDTO
        //    {
        //        //UserId = user.UserId,
        //        Email = user.Email,
        //        UserName = user.UserName,
        //        Password = user.Password,
        //        Phone = user.Phone,
        //        Gender = user.Gender,
        //        Dob = user.Dob
        //    };

        //    return userDTO;
        //}
        public async Task<UserDTO?> RegisterUser(RegistrationDTO registrationDto, StringBuilder message)
        {
            var existingUser = await _userRepository.Get(u => u.Phone == registrationDto.Phone);
            if (existingUser != null)
            {
                message.Append("Phone already exists");
                return null;
            }

            // ma~ hoa mat khau
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(registrationDto.Password);


            //var newUser = _mapper.Map<User>(registrationDto);
            //newUser.Role = "Patient";

            //_userRepository.Add(newUser);


            //return _mapper.Map<UserDTO>(newUser);

            var newUser = new User()
            {
                UserName = registrationDto.UserName,
                Email = registrationDto.Email,
                //Password = registrationDto.Password,
                Password = hashedPassword,
                Phone = registrationDto.Phone,
                Gender = registrationDto.Gender,
                Dob = registrationDto.Dob,
                Address = registrationDto.Address,
                Role = "Patient",
                CitizenId = registrationDto.CitizenId
                
            };

            _userRepository.Add(newUser);

            var userDTO = new UserDTO()
            {
                UserName = newUser.UserName,
                Email = newUser.Email,
                Password = newUser.Password,
                Phone = newUser.Phone,
                Gender = newUser.Gender,
                Dob = newUser.Dob,
                Address = newUser.Address,
                Role = newUser.Role,
                CitizenId = newUser.CitizenId
            };

            return userDTO;

            //var user = _mapper.Map<User>(registrationDto);
            //var c = _mapper.Map<UserDTO>(user);
            //return c;
            //var newUser = _mapper.Map<User>(registrationDto);
            //_userRepository.Add(newUser);
            //return _mapper.Map<UserDTO>(newUser);
        }


        //chua xong
        public async Task<string> SignInAsync(SignInDTO signInDTO)
        {
            var result = await _signInManager.PasswordSignInAsync(signInDTO.Phone, signInDTO.Password, false, false);

            if(!result.Succeeded)
            {
                return string.Empty;
            }

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, signInDTO.Phone),
            };
            return "a";


        }


        public async Task<IdentityResult> SignUpAsync(RegistrationDTO registrationDTO)
        {
            var user = new User
            {
                UserName = registrationDTO.UserName,
                Email = registrationDTO.Email,
                //Password = registrationDTO.Password,
                Phone = registrationDTO.Phone,
                Gender = registrationDTO.Gender,
                Dob = registrationDTO.Dob,
                Address = registrationDTO.Address,
                Role = registrationDTO.Role,
                CitizenId = registrationDTO.CitizenId
            };
            return await _userManager.CreateAsync(user, registrationDTO.Password);
        }

        //private bool VerifyPassword(string enteredPassword, string storedPassword)
        //{
        //    return enteredPassword == storedPassword;
        //}

        private bool VerifyPassword(string enteredPassword, string storedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(enteredPassword, storedPassword);
        }

        public async Task<UserDTO?> LoginUser(SignInDTO userLogin, StringBuilder message)
        {
            var user = await _userManager.FindByNameAsync(userLogin.Phone);
            var checkPassword = await _userManager.CheckPasswordAsync(user, userLogin.Password);
            if (user == null || !checkPassword)
            {
                message.Append("Invalid Username/Password");
                return null;
            }
            if (checkLockoutAccount(user, message))
            {

                return null;
            }

            var result = await _signInManager.PasswordSignInAsync(userLogin.Phone, userLogin.Password, false, false);
            if (result.Succeeded)
            {
                //var userDTO = new UserDTO
                //{
                //    Id = user.Id,
                //    FirstName = user.FirstName,
                //    LastName = user.LastName,
                //    Email = user.Email,
                //    UserName = user.UserName,
                //    BirthDate = user.BirthDate,
                //    RoleInformations = await _roleService.GetRoleInformationsByUserId(user.Id)
                //    //RoleNames = (await userManager.GetRolesAsync(user)).ToList()

                //};

                var userDTO = new UserDTO
                {
                    //UserId = user.UserId,
                    Email = user.Email,
                    UserName = user.UserName,
                    Password = user.Password,
                    Phone = user.Phone,
                    Gender = user.Gender,
                    Dob = user.Dob
                };

                return userDTO;
            }
            message.Append("Invalid Username/Password");
            return null;
        }

        public async Task<IdentityResult?> RegisterPatient(RegistrationDTO registrationDTO)
        {
            //var validatedInformationRequest = await ValidatedInformationRequest(registrationDTO);
            //if (validatedInformationRequest == null)
            //{
            //    return null;
            //}
            //else
            //{
            //    var newUser = new User
            //    {

            //        FirstName = validatedInformationRequest.FirstName,
            //        LastName = validatedInformationRequest.LastName,
            //        Email = validatedInformationRequest.Email,
            //        UserName = validatedInformationRequest.UserName,
            //        TwoFactorEnabled = true,
            //    };
            //    var result = await _userManager.CreateAsync(newUser, registrationDTO.Password);
            //    if (result.Succeeded)
            //    {
            //        await _userManager.AddToRoleAsync(newUser, AppRole.Patient);
            //        return result;
            //    }
            //}

            var user = new User
            {
                UserName = registrationDTO.UserName,
                Email = registrationDTO.Email,
                //Password = registrationDTO.Password,
                Phone = registrationDTO.Phone,
                Gender = registrationDTO.Gender,
                Dob = registrationDTO.Dob,
                Address = registrationDTO.Address,
                Role = registrationDTO.Role,
                CitizenId = registrationDTO.CitizenId
            };
            return await _userManager.CreateAsync(user, registrationDTO.Password);
        }



        public bool checkLockoutAccount(User
             user, StringBuilder message)
        {
            // Check if the account is locked out
            if (user.LockoutEnd.HasValue && user.LockoutEnd.Value > DateTime.UtcNow)
            {
                // Account is locked out
                message.Append("Account is locked out");
                return true;
            }

            return false;
        }


        private async Task<RegistrationDTO> ValidatedInformationRequest(RegistrationDTO registrationDTO)
        {
            //Validate information

            if (true)
            {
                return registrationDTO;
            }
            return null;
        }

    }
}
