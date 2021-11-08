using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using GiftyAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace GiftyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendshipsController : ControllerBase
    { 
        private readonly IConfiguration _configuration;

        public FriendshipsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get()
        {
            string query = @"
                    select FriendshipId as ""FriendshipId"",
                            RequestSender as ""RequestSender"",
                            RequestReceiver as ""RequestReceiver"",
                            StatusSender as ""StatusSender"",
                            StatusReceiver as ""StatusReceiver""
                    from Friendships
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

        [HttpPost]

        public JsonResult Post(Friendships friendship)
        {
            string query = @"
                    insert into Friendships (RequestSender, RequestReceiver, StatusSender, StatusReceiver)
                    values (@RequestSender, @RequestReceiver, @StatusSender, @StatusReceiver)
                ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GiftyAppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@RequestSender", friendship.RequestSender);
                    myCommand.Parameters.AddWithValue("@RequestReceiver", friendship.RequestReceiver);
                    myCommand.Parameters.AddWithValue("@StatusSender", friendship.StatusSender);
                    myCommand.Parameters.AddWithValue("@StatusReceiver", friendship.StatusReceiver);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]

        public JsonResult Put(Friendships friendship)
        {
            string query = @"
                    update Friendships set
                        FriendshipId = @FriendshipId,
                        RequestSender = @RequestSender,
                        RequestReceiver = @RequestReceiver,
                        StatusSender = @StatusSender,
                        StatusReceiver = @StatusReceiver
                    where FriendshipId = @FriendshipId
                ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GiftyAppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@FriendshipId", friendship.FriendshipId);
                    myCommand.Parameters.AddWithValue("@RequestSender", friendship.RequestSender);
                    myCommand.Parameters.AddWithValue("@RequestReceiver", friendship.RequestReceiver);
                    myCommand.Parameters.AddWithValue("@StatusSender", friendship.StatusSender);
                    myCommand.Parameters.AddWithValue("@StatusReceiver", friendship.StatusReceiver);

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
                    delete from Friendships 
                    where FriendshipId = @FriendshipId
                ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GiftyAppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@FriendshipId", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
            }

            return new JsonResult("Deleted Successfully");
        }
    }
}