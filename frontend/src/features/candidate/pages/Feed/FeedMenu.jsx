import React from "react";
import { FEED_MENU_SECTIONS } from "./feed.constants";

const FeedMenu = () => {
  return (
    <div className="absolute right-0 top-10 w-80 bg-white rounded-xl shadow-xl z-20 overflow-hidden">
      {FEED_MENU_SECTIONS.map((section, idx) => (
        <div key={idx} className="border-b last:border-none">
          {section.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
            >
              <Icon className="text-lg mt-1" />
              <div>
                <p className="font-medium">{title}</p>
                <p className="text-xs text-gray-500 whitespace-normal break-words leading-snug">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FeedMenu;
