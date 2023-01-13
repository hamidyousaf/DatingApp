﻿using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class TestUser
    {
        [Key]
        public long Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Gender { get; set; }
    }
}
