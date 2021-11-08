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
    public class WishlistController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public WishlistController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get()
        {
            string query = @"
                select ItemId as ""ItemId"",
                        ItemName as ""ItemName"",
                        ItemPrice as ""ItemPrice"",
                        ItemLink as ""ItemLink"",
                        Reserved as ""Reserved"",
                        UserId as ""UserId""
                from Wishlist
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

        public JsonResult Post(Wishlist wshlst)
        {
            string query = @"
                insert into Wishlist (ItemName, ItemPrice, ItemLink, Reserved, UserId)
                values (@ItemName, @ItemPrice, @ItemLink, @Reserved, @UserId)
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GiftyAppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ItemName", wshlst.ItemName);
                    myCommand.Parameters.AddWithValue("@ItemPrice", wshlst.ItemPrice);
                    myCommand.Parameters.AddWithValue("@ItemLink", wshlst.ItemLink);
                    myCommand.Parameters.AddWithValue("@Reserved", wshlst.Reserved);
                    myCommand.Parameters.AddWithValue("@UserId", wshlst.UserId);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]

        public JsonResult Put(Wishlist wshlst)
        {
            string query = @"
                update Wishlist set
                    ItemName = @ItemName,
                    ItemPrice = @ItemPrice,
                    ItemLink = @ItemLink,
                    Reserved = @Reserved,
                    UserId = @UserId
                where ItemId = @ItemId
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GiftyAppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ItemId", wshlst.ItemId);
                    myCommand.Parameters.AddWithValue("@ItemName", wshlst.ItemName);
                    myCommand.Parameters.AddWithValue("@ItemPrice", wshlst.ItemPrice);
                    myCommand.Parameters.AddWithValue("@ItemLink", wshlst.ItemLink);
                    myCommand.Parameters.AddWithValue("@Reserved", wshlst.Reserved);
                    myCommand.Parameters.AddWithValue("@UserId", wshlst.UserId);

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
                delete from Wishlist 
                where ItemId = @ItemId
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("GiftyAppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ItemId", id);

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