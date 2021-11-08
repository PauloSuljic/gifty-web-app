using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using GiftyAPI.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace GiftyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public UsersController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;

        }

        [HttpGet]

        public JsonResult Get()
        {
            string query = @"
                select UserId as ""UserId"",
                        FirstName as ""FirstName"",
                        LastName as ""LastName"",
                        Username as ""Username"",
                        to_char(DateOfBirth, 'YYYY-MM-DD') as ""DateOfBirth"",
                        Email as ""Email"",
                        Password as ""Password"",
                        PhotoFileName as ""PhotoFileName""
                from Users
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GiftyAppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
            }

            return new JsonResult(table);
        }

        [HttpGet("{id}")]

        public JsonResult GetUser(int id)
        {
            string query = @"
                select UserId as ""UserId"",
                        FirstName as ""FirstName"",
                        LastName as ""LastName"",
                        Username as ""Username"",
                        to_char(DateOfBirth, 'YYYY-MM-DD') as ""DateOfBirth"",
                        Email as ""Email"",
                        Password as ""Password"",
                        PhotoFileName as ""PhotoFileName""
                from Users where userId = @UserId
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GiftyAppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@UserId", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
            }

            return new JsonResult(table);
        }

        [HttpPost]

        public JsonResult Post(Users usr)
        {
            string query = @"
                insert into Users (FirstName, LastName, Username, DateOfBirth, Email, Password, PhotoFileName)
                values (@FirstName, @LastName, @Username, @DateOfBirth, @Email, @Password, @PhotoFileName)
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GiftyAppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@FirstName", usr.FirstName);
                    myCommand.Parameters.AddWithValue("@LastName", usr.LastName);
                    myCommand.Parameters.AddWithValue("@Username", usr.Username);
                    myCommand.Parameters.AddWithValue("@DateOfBirth", Convert.ToDateTime(usr.DateOfBirth));
                    myCommand.Parameters.AddWithValue("@Email", usr.Email);
                    myCommand.Parameters.AddWithValue("@Password", usr.Password);
                    myCommand.Parameters.AddWithValue("@PhotoFileName", usr.PhotoFileName);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]

        public JsonResult Put(Users usr)
        {
            string query = @"
                update Users set
                    FirstName = @FirstName,
                    LastName = @LastName,
                    Username = @Username,
                    DateOfBirth = @DateOfBirth,
                    Email = @Email,
                    Password = @Password,
                    PhotoFileName = @PhotoFileName
                where UserId = @UserId
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GiftyAppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@UserId", usr.UserId);
                    myCommand.Parameters.AddWithValue("@FirstName", usr.FirstName);
                    myCommand.Parameters.AddWithValue("@LastName", usr.LastName);
                    myCommand.Parameters.AddWithValue("@Username", usr.Username);
                    myCommand.Parameters.AddWithValue("@DateOfBirth", Convert.ToDateTime(usr.DateOfBirth));
                    myCommand.Parameters.AddWithValue("@Email", usr.Email);
                    myCommand.Parameters.AddWithValue("@Password", usr.Password);
                    myCommand.Parameters.AddWithValue("@PhotoFileName", usr.PhotoFileName);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]

        public JsonResult Delete(int id)
        {
            string query = @"
                delete from Users 
                where UserId = @UserId
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GiftyAppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@UserId", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
            }

            return new JsonResult("Deleted Successfully");
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }
    }
}