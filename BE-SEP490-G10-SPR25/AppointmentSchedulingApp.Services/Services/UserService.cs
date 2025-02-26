using AppointmentSchedulingApp.Services.DTOs;
using AppointmentSchedulingApp.Domain.Entities;

using AppointmentSchedulingApp.Services.Helper;
using Microsoft.Extensions.Options;

using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using AppointmentSchedulingApp.Domain.Repositories;

namespace AppointmentSchedulingApp.Services.Services
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

            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(authClaims),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKeyBytes), SecurityAlgorithms.HmacSha512Signature),
            };
            var token = jwtTokenHandler.CreateToken(tokenDescription);


            return jwtTokenHandler.WriteToken(token);
        }

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
            var existingUser = await _userRepository.Get(u => u.Email == registrationDto.Email);
            if (existingUser != null)
            {
                message.Append("Email already exists");
                return null;
            }

            //var newUser = _mapper.Map<User>(registrationDto);
            //newUser.Role = "Patient";

            //_userRepository.Add(newUser);


            //return _mapper.Map<UserDTO>(newUser);

            var newUser = new User()
            {
                UserName = registrationDto.UserName,
                Email = registrationDto.Email,
                Password = registrationDto.Password,
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

        private bool VerifyPassword(string enteredPassword, string storedPassword)
        {
            return enteredPassword == storedPassword;
        }

    }
}
