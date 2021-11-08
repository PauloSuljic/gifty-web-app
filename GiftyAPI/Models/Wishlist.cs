using System;
namespace GiftyAPI.Models
{
    public class Wishlist
    {
        public int ItemId { get; set; }

        public string ItemName { get; set; }

        public int ItemPrice { get; set; }

        public string ItemLink { get; set; }

        public Boolean Reserved { get; set; }

        public long UserId { get; set; }

    }
}
