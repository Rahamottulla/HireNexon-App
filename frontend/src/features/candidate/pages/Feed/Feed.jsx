import React, { useState } from "react";
import useTitle from "@/shared/hooks/useTitle";
import CreatePost from "./CreatePost";
import FeedPost from "./FeedPost";

const Feed = () => {
  useTitle("Feed");
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "Rahamottulla Haque Mondal",
      avatar: "/icons/hh.png",
      tagline: "Full Stack Developer",
      time: "2 hrs ago",
      content: "Excited to share my new project on AI-powered chatbots!",
      image: "/images/candidate/posts/post.jpg",
      likes: 25,
      comments: 10,
      reposts: 3,
      liked: false,
    },
    {
      id: 2,
      name: "Jahanara Khatun",
      avatar: "/icons/hh.png",
      tagline: "Full Stack Developer",
      time: "2 hrs ago",
      content: "Excited to share my new project on AI-powered chatbots!",
      image: "/images/candidate/posts/post1.jpg",
      likes: 35,
      comments: 10,
      reposts: 3,
      liked: false,
    },
  ]);

  const addPost = (content, postingAsCompany) => {
    const newPost = {
      id: Date.now(),
      name: postingAsCompany ? "HireNexon" : "You",
      avatar: postingAsCompany ? "/icons/hh.png" : "/images/hh.png",
      tagline: postingAsCompany ? "Company Page" : "Active User",
      time: "Just now",
      content,
      likes: 0,
      comments: 0,
      reposts: 0,
      liked: false,
    };
    setPosts([newPost, ...posts]);
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

  const removePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
      <div className="max-w-[600px] ml-[220px] mr-[100px] font-[Poppins] py-6 space-y-6">
        <CreatePost onPost={addPost} />
        {posts.map((post) => (
          <FeedPost
            key={post.id}
            post={post}
            onLike={toggleLike}
            onRemove={removePost}
          />
        ))}
      </div>
  );
};

export default Feed;
