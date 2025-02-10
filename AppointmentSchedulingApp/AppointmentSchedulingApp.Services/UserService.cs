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

namespace AppointmentSchedulingApp.Services
{
    public class UserService : IUserService
    {
        private readonly IGenericRepository<User> _userRepository;
 
        private readonly AppSettings _appSettings;

        public UserService(IGenericRepository<User> userRepository, IOptionsMonitor<AppSettings> optionsMonitor)
        {
            _userRepository = userRepository;
            _appSettings = optionsMonitor.CurrentValue;
        }


        // chua xong - di hop da~
        public string GenerateToken(UserDTO user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            return null;
        }

        private readonly IMapper _mapper;

        public UserService(IGenericRepository<User> userRepository,IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
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
                //Dob = user.Dob
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

            var hashedPassword = HashPassword(registrationDto.Password);

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

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                var builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }

        private bool VerifyPassword(string enteredPassword, string storedPassword)
        {
            return HashPassword(enteredPassword) == storedPassword;
        }
    }
}
