using System;
namespace GiftyAPI.Models
{
    public class Friendships
    {
        public int FriendshipId { get; set; }

        public int RequestSender { get; set; }

        public int RequestReceiver{ get; set; }

        public Boolean StatusSender { get; set; }

        public Boolean StatusReceiver { get; set; }

    }
}
