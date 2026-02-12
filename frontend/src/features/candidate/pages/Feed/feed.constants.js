import {
  FaBookmark,
  FaShareAlt,
  FaLink,
  FaFlag,
  FaEyeSlash,
  FaBellSlash,
  FaBell,
  FaStar,
  FaUserTimes,
  FaUserSlash,
  FaSlidersH,
} from "react-icons/fa";

export const FEED_MENU_SECTIONS = [
  [
    { icon: FaBookmark, title: "Save Post", desc: "Add this to your saved posts." },
    { icon: FaShareAlt, title: "Share Post", desc: "Share with your friends or groups." },
    { icon: FaLink, title: "Copy Link", desc: "Copy link to share externally." },
    { icon: FaFlag, title: "Report Post", desc: "Let us know if something’s wrong." },
  ],
  [
    { icon: FaEyeSlash, title: "Hide Post", desc: "Remove this post from your feed." },
    { icon: FaBellSlash, title: "Not Interested", desc: "See fewer posts like this in the future." },
    { icon: FaBell, title: "Turn on Post Notifications", desc: "Get notified about updates to this post." },
    { icon: FaStar, title: "Add to Favorites", desc: "Prioritize posts like this in your feed." },
  ],
  [
    { icon: FaUserTimes, title: "Unfollow User", desc: "Stop seeing posts from this user." },
    { icon: FaUserSlash, title: "Block User", desc: "You won’t see or contact each other." },
    { icon: FaSlidersH, title: "Manage Your Feed", desc: "Customize what appears on your feed." },
  ],
];
