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

namespace AppointmentSchedulingApp.Services
{
    public class UserService : IUserService
    {
        private readonly IGenericRepository<User> _userRepository;
        private readonly AppSettings _appSettings;
        private readonly IMapper _mapper;

        public UserService(IGenericRepository<User> userRepository, IOptionsMonitor<AppSettings> optionsMonitor, IMapper mapper)
        {
            _userRepository = userRepository;
            _appSettings = optionsMonitor.CurrentValue;
            _mapper = mapper;
        }
        
        // chua xong - di hop da~
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
                new Claim("Id", user.UserId.ToString()),
                
                new Claim("TokenId", Guid.NewGuid().ToString()),
            };

            // chua dung den


            //foreach (var roleName in User.RoleInformations)
            //{
            //    authClaims.Add(new Claim(ClaimTypes.Role, roleName.RoleName));
            //    authClaims.Add(new Claim("RoleId", roleName.RoleId));
            //}
            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(authClaims),
                Expires = DateTime.UtcNow.AddMinutes(1),
                //Expires = DateTime.UtcNow.AddDays(_appSettings.ExpiryInDays),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKeyBytes), SecurityAlgorithms.HmacSha512Signature),
            };
            var token = jwtTokenHandler.CreateToken(tokenDescription);


            // tam thoi chua dung

            //var accessToken = jwtTokenHandler.WriteToken(token);
            //return new TokenModel
            //{
            //    AccessToken = accessToken,
            //    RefeshToken = GenerateRefeshToken()
            //};

            return jwtTokenHandler.WriteToken(token);
        }

        // tam thoi chua dung

        //private string GenerateRefeshToken()
        //{
        //    var randomBytes = new byte[32];
        //    using (var rngCsp = RandomNumberGenerator.Create())
        //    {
        //        rngCsp.GetBytes(randomBytes);
        //        return Convert.ToBase64String(randomBytes);
        //    }
        //}



        //public UserService(IGenericRepository<User> userRepository,IMapper mapper)
        //{
        //    _userRepository = userRepository;
        //    _mapper = mapper;
        //}


        public async Task<UserDTO?> LoginUser(SignInDTO userLogin, StringBuilder message)
        {
            var user = await _userRepository.Get(u => u.Email == userLogin.Email);
            if (user == null || !VerifyPassword(userLogin.Password, user.Password))
            {
                message.Append("Invalid Email/Password");
                return null;
            }

            var userDTO = new UserDTO
            {
                UserId = user.UserId,
                Email = user.Email,
                UserName = user.UserName,
                Password = user.Password,
                Phone = user.Phone,
                Gender = user.Gender,
                Dob = user.Dob
            };

            return userDTO;
        }
        public async Task<UserDTO?> RegisterUser(RegistrationDTO registrationDto, StringBuilder message)
        {
            var existingUser = await _userRepository.Get(u => u.UserName == registrationDto.UserName || u.Email == registrationDto.Email);
            if (existingUser != null)
            {
                message.Append("Username or Email already exists");
                return null;
            }

            //var hashedPassword = HashPassword(registrationDto.Password);

            //var user = new User
            //{
            //    UserName = registrationDto.UserName,
            //    Email = registrationDto.Email,
            //    Password = hashedPassword,
            //    Phone = registrationDto.Phone,
            //    Gender = registrationDto.Gender,
            //    Dob = registrationDto.Dob
            //};

            var user = _mapper.Map<User>(registrationDto);
            //_userRepository.Add(user);

            //var userDTO = new UserDTO
            //{
            //    UserId = user.UserId,
            //    Email = user.Email,
            //    UserName = user.UserName,
            //    Password = hashedPassword,
            //    Phone = user.Phone,
            //    Gender = user.Gender,
            //    Dob = user.Dob
            //};

            var c= _mapper.Map<UserDTO>(user);
            return c;
        }

        //private string HashPassword(string password)
        //{
        //    using (var sha256 = SHA256.Create())
        //    {
        //        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        //        var builder = new StringBuilder();
        //        for (int i = 0; i < bytes.Length; i++)
        //        {
        //            builder.Append(bytes[i].ToString("x2"));
        //        }
        //        return builder.ToString();
        //    }
        //}

        //private bool VerifyPassword(string enteredPassword, string storedPassword)
        //{
        //    return HashPassword(enteredPassword) == storedPassword;
        //}

        private bool VerifyPassword(string enteredPassword, string storedPassword)
        {
            return enteredPassword == storedPassword;
        }

    }
}
