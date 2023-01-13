using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            this.tokenService = tokenService;
            _context = context;
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register (RegisterDto register)
        {
            if(await this.UserExist(register.Username)) return BadRequest("Username is taken.");
            using var hmac = new HMACSHA512();

            var user = new AppUser(){
                UserName = register.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(register.Password)),
                PasswordSalt = hmac.Key,
                DateOfBirth = DateTime.UtcNow,
                KnownAs = "Hamid Yousaf",
                Created = DateTime.UtcNow,
                LastActive = DateTime.UtcNow,
                Gender = "MALE",
                Introduction = "This is introduction",
                LookingFor = "Female",
                Intrests = "Female",
                City = "Faisalabad",
                Country = "Pakistan",
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto(){
                Username = user.UserName,
                Token = tokenService.CreateToken(user)
            };
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto login)
        {
            AppUser user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == login.Username);
            if(user == null) return Unauthorized("Invalid username.");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return new UserDto(){
                Username = user.UserName,
                Token = tokenService.CreateToken(user)
            };
        }
        private async Task<bool> UserExist(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}