using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class TestUserController : BaseApiController
    {
        private readonly DataContext _context;
        public TestUserController(DataContext context)
        {
            _context = context;
        }
        [AllowAnonymous]
        [HttpGet("GetTestUsers")]
        public async Task<ActionResult<IEnumerable<TestUser>>> GetUsers()
        {
            return await _context.TestUsers.ToListAsync();
        }
        [AllowAnonymous]
        [HttpPost("AddTestUser")]
        public async Task<ActionResult<IEnumerable<TestUser>>> AddTestUser(TestUser user)
        {
            await _context.TestUsers.AddAsync(user);
            await _context.SaveChangesAsync();
            return Ok(); 
        }
    }
}

