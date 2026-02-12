import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
         
const CreatePost = ({ onPost }) => {
  const [text, setText] = useState("");
  const [postingAsCompany, setPostingAsCompany] = useState(false);
  const [open, setOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const submit = () => {
    if (!text.trim()) return;
    onPost(text, postingAsCompany);
    setText("");
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 space-y-3">
      {/* Top */}
      <div className="flex items-center gap-2 border-b pb-1">
        <div className="relative">
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <img
              src={postingAsCompany ? "/icons/hh.png" : "/images/candidate/hackathons/google.png"}
              className="w-12 h-12 rounded-full"
            />
            <FaChevronDown className="text-xs text-gray-500" />
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute top-full left-0 bg-white border rounded-lg w-[180px] shadow z-10"
              >
                <div
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setPostingAsCompany(false);
                    setOpen(false);
                  }}
                >
                  <img src="/images/candidate/hackathons/google.png" className="w-8 h-8 rounded-full" />
                  <span>You</span>
                </div>
                <div
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setPostingAsCompany(true);
                    setOpen(false);
                  }}
                >
                  <img src="/icons/hh.png" className="w-8 h-8 rounded-full" />
                  <span>HireNexon</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <textarea
          className="flex-1 border rounded-full px-4 py-1 h-10 resize-none focus:outline-none leading-tight placeholder-gray-600"
          placeholder={
            postingAsCompany
              ? "Share an update from your company..."
              : "What's on your mind?"
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      {/* Action options */} 
      <div className="flex gap-10 mt-1">
        {[
          ["Photo", "/images/candidate/feed/photo.png"],
          ["Video", "/images/candidate/feed/video.png"],
          ["Event", "/images/candidate/feed/event.png"],
          ["Document", "/images/candidate/feed/document.png"],
        ].map(([label, img]) => (
          <div key={label} className="flex items-center cursor-pointer">
            <img src={img} className="w-10 h-10 object-contain" />
            <span>{label}</span>
          </div>
        ))}

        <div
          className="relative flex items-center cursor-pointer"
          onClick={() => setShowMore(!showMore)}
        >
          <img src="/images/candidate/feed/more.png" className="w-10 h-10" />
          <span>More</span>

          {showMore && (
            <div className="absolute top-full bg-white border rounded-lg shadow w-[200px] z-10">
              {[
                ["Poll", "/images/candidate/feed/poll.png"],
                ["GIF / Sticker", "/images/candidate/feed/gif.png"],
                ["Check-in", "/images/candidate/feed/location.png"],
                ["Feeling / Activity", "/images/candidate/feed/feeling.png"],
                ["Share Link", "/images/candidate/feed/link.png"],
              ].map(([label, img]) => (
                <div key={label} className="flex items-center gap-2 p-2 hover:bg-gray-100">
                  <img src={img} className="w-10 h-10" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
