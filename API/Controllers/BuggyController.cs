using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _dbContext; 
        public BuggyController(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "This is secret";
        }
        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound() 
        {
            var user = _dbContext.Users.Find(-1);
            if (user == null) return NotFound();
            return user;
        }
        [HttpGet("server-error")]
        public ActionResult<string> GetServerError() 
        {
            var user = _dbContext.Users.Find(-1);
            return user.ToString();
        }
        //we can also handle exception through tr catch but handle exception on higher level of middleware tree. this is the best 
        //approuch, so handling exception through try catch is not good approach.
        //[HttpGet("server-error")]
        //public ActionResult<string> GetServerError()
        //{
        //    try
        //    {
        //        var user = _dbContext.Users.Find(-1);
        //        return user.ToString();
        //    }
        //    catch (Exception)
        //    {
        //        return StatusCode(500, "There is error on server!.");
        //    }
        //}
        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest() 
        {
            return BadRequest("This is a bad request");
        }
    }
}