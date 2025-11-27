import React, { useState } from "react";
import { Helmet } from "react-helmet";
import {
  FaRegThumbsUp,FaBellSlash, FaRegComment, FaShare, FaEllipsisV, FaTimes, FaBookmark,
  FaLink, FaEyeSlash, FaFlag, FaStar,FaUserTimes,FaUserSlash,FaSlidersH, FaClock, FaHeart, FaBell, FaShareAlt, FaChevronDown,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "./Feed.css";

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "Rahamottulla Haque Mondal",
      avatar: "/images/hnn.jpg",
      tagline: "Full Stack Developer",
      time: "2 hrs ago",
      content: "Excited to share my new project on AI-powered chatbots!",
      image: "/images/posts/post1.jpg",
      likes: 25,
      comments: 10,
      reposts: 3,
      liked: false,
    },
    {
      id: 2,
      name: "Sana Mehta",
      avatar: "/images/h.jpg",
      tagline: "UI/UX Designer",
      time: "5 hrs ago",
      content: "Designing experiences that delight users is my passion!",
      image: "/images/posts/post2.jpg",
      likes: 18,
      comments: 6,
      reposts: 1,
      liked: false,
    },
  ]);

  const [newPost, setNewPost] = useState("");
  const [postingAsCompany, setPostingAsCompany] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const handlePost = () => {
    if (newPost.trim() === "") return;
    const post = {
      id: posts.length + 1,
      name: postingAsCompany ? "Hirenexon" : "You",
      avatar: postingAsCompany ? "/images/company.png" : "/images/avatar1.png",
      tagline: postingAsCompany ? "Company Page" : "Active User",
      time: "Just now",
      content: newPost,
      likes: 0,
      comments: 0,
      reposts: 0,
      liked: false,
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const handleRemovePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  return (
    <>
      <Helmet>
        <title>Feed | HireNexon</title>
      </Helmet>
    <div className="feed-main">
      {/* ---------- Create Post Box ---------- */}
      <div className="feed-post-box">
        <div className="feed-post-top">
          <div className="account-selector">
            <div
              className="active-account"
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenu(openMenu === "postbox" ? null : "postbox");
              }}
            >
              <img
                src={postingAsCompany ? "/images/h.jpg" : "/images/hnn.jpg"}
                alt="Profile"
                className="feed-post-avatar"
              />
              <FaChevronDown className="dropdown-icon" />
            </div>

            <AnimatePresence>
              {openMenu === "postbox" && (
                <motion.div
                  className="account-dropdown"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={`account-item ${!postingAsCompany ? "selected" : ""}`}
                    onClick={() => {
                      setPostingAsCompany(false);
                      setOpenMenu(null);
                    }}
                  >
                    <img
                      src="/images/hnn.jpg"
                      alt="You"
                      className="feed-post-avatar"
                      style={{ width: "32px", height: "32px" }}
                    />
                    <span>You</span>
                  </div>
                  <div
                    className={`account-item ${postingAsCompany ? "selected" : ""}`}
                    onClick={() => {
                      setPostingAsCompany(true);
                      setOpenMenu(null);
                    }}
                  >
                    <img
                      src="/images/h.jpg"
                      alt="Hirenexon"
                      className="feed-post-avatar"
                      style={{ width: "32px", height: "32px" }}
                    />
                    <span>Hirenexon</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder={
              postingAsCompany
                ? "Share an update from your company..."
                : "What's on your mind?"
            }
            className="feed-post-input"
          />
        </div>

        {/* ---------- Action Options ---------- */}
        <div className="post-action-options">
          <div className="action-item">
            <img src="/images/feeds/photo.png" alt="Photo" className="action-icon" />
            <span>Photo</span>
          </div>
          <div className="action-item">
            <img src="/images/feeds/video.png" alt="Video" className="action-icon" />
            <span>Video</span>
          </div>
          <div className="action-item">
            <img src="/images/feeds/event.png" alt="Event" className="action-icon" />
            <span>Event</span>
          </div>
          <div className="action-item">
            <img src="/images/feeds/document.png" alt="Document" className="action-icon" />
            <span>Document</span>
          </div>
          <div
            className="action-item"
            onClick={() => setShowMore(!showMore)}
            style={{ position: "relative" }}
          >
            <img src="/images/feeds/more.png" alt="More" className="action-icon" />
            <span>More</span>

            {showMore && (
              <div className="action-more-dropdown">
                <ul>
                  <li ><img src="/images/feeds/poll.png"  alt="Poll" /> Poll</li>
                  <li><img src="/images/feeds/gif.png" alt="GIF" /> GIF / Sticker</li>
                  <li><img src="/images/feeds/location.png" alt="Location" /> Check-in</li>
                  <li><img src="/images/feeds/feeling.png" alt="Feeling" /> Feeling / Activity</li>
                  <li><img src="/images/feeds/link.png" alt="Link" /> Share Link</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ---------- Feed Posts ---------- */}
      <div className="feed-content">
        {posts.map((post) => (
          <motion.div key={post.id} className="feed-card">
            <div className="feed-card-header">
              <img src={post.avatar} alt={post.name} className="feed-card-avatar" />
              <div className="feed-card-userinfo">
                <h4>{post.name}</h4>
                <p>{post.tagline}</p>
                <span>{post.time}</span>
              </div>

              <div className="feed-card-actions">
  <button className="feed-card-menu-btn" onClick={() => toggleMenu(post.id)}>
    <FaEllipsisV />
  </button>
  <button className="feed-card-close-btn" onClick={() => handleRemovePost(post.id)}>
    <FaTimes />
  </button>

  <AnimatePresence>
    {openMenu === post.id && (
      <motion.div
        className="feed-card-menu"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        {/* -------- Section 1 -------- */}
        <div className="feed-card-menu-section">
          <ul>
            <li>
              <FaBookmark />
              <div>
                <strong>Save Post</strong>
                <p>Add this to your saved posts.</p>
              </div>
            </li>
            <li>
              <FaShareAlt />
              <div>
                <strong>Share Post</strong>
                <p>Share with your friends or groups.</p>
              </div>
            </li>
            
            <li>
              <FaLink />
              <div>
                <strong>Copy Link</strong>
                <p>Copy link to share externally.</p>
              </div>
            </li>
            <li>
              <FaFlag />
              <div>
                <strong>Report Post</strong>
                <p>Let us know if something’s wrong.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* -------- Divider -------- */}
        <hr className="feed-card-menu-divider" />

        {/* -------- Section 2 -------- */}
        <div className="feed-card-menu-section">
          <ul>
            <li>
              <FaEyeSlash />
              <div>
                <strong>Hide Post</strong>
                <p>Remove this post from your feed.</p>
              </div>
            </li>
             <li>
              <FaBellSlash />
              <div>
                <strong>Not Interested</strong>
                <p>See fewer posts like this in the future.</p>
              </div>
            </li>
            <li>
              <FaBell />
              <div>
                <strong>Turn On post Notifications</strong>
                <p>Get notified about updates to this post.</p>
              </div>
            </li>
            <li>
              <FaStar />
              <div>
                <strong>Add to Favorites</strong>
                <p>Prioritize posts like this in your feed.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* -------- Divider -------- */}
        <hr className="feed-card-menu-divider" />

        {/* -------- Section 3 -------- */}
        <div className="feed-card-menu-section">
          <ul>
            <li>
              <FaUserTimes />
              <div>
                <strong>Unfollow User</strong>
                <p>Stop seeing posts from this user.</p>
              </div>
            </li>
            <li>
              <FaUserSlash />
              <div>
                <strong>Block User</strong>
                <p>You won’t see or contact each other.</p>
              </div>
            </li>
            <li>
              <FaSlidersH />
              <div>
                <strong>Manage Your Feed</strong>
                <p>Customize what appears on your feed.</p>
              </div>
            </li>
          </ul>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>
</div>

            <p className="feed-card-content">{post.content}</p>
            {post.image && <img src={post.image} alt="Post" className="feed-card-image" />}

            <div className="feed-card-stats">
              <span>{post.likes} Likes</span>
              <span>{post.comments} Comments</span>
              <span>{post.reposts} Reposts</span>
            </div>

            <div className="feed-card-footer">
              <button
                className={`feed-card-btn ${post.liked ? "liked" : ""}`}
                onClick={() => toggleLike(post.id)}
              >
                <FaRegThumbsUp /> Like
              </button>
              <button className="feed-card-btn">
                <FaRegComment /> Comment
              </button>
              <button className="feed-card-btn">
                <FaShare /> Repost
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Feed;

