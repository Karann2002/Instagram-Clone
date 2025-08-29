import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const StoryViewer = () => {
  const [stories] = useState([
    {
      image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=800",
      title: "New task assigned",
      username: "karan___kusheah",
      timestamp: Date.now() - 100000,
    },
    {
      image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800",
      title: "Another task",
      username: "karan___kusheah",
      timestamp: Date.now() - 200000,
    },
    {
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800",
      title: "New message from Admin",
      username: "office_updates",
      timestamp: Date.now() - 7200000,
    },
    {
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800",
      title: "Weekend plan!",
      username: "alice_w",
      timestamp: Date.now() - 5000000,
    },
    {
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800",
      title: "Design mockups ready",
      username: "ui_designer",
      timestamp: Date.now() - 86400000,
    },
    {
      image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=800",
      title: "Another update",
      username: "office_updates",
      timestamp: Date.now() - 172800000,
    },
  ]);

  // Group stories by username
  const groupedStories = stories.reduce((acc, story) => {
    if (!acc[story.username]) acc[story.username] = [];
    acc[story.username].push(story);
    return acc;
  }, {});

  const userList = Object.keys(groupedStories); // ordered list of users

  const [activeUser, setActiveUser] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const currentStories = activeUser ? groupedStories[activeUser] : [];

  // Auto progress
  useEffect(() => {
    let interval;
    if (activeUser !== null) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [activeUser, activeIndex]);

  const handleNext = () => {
    if (activeIndex < currentStories.length - 1) {
      // Next story of same user
      setActiveIndex(activeIndex + 1);
    } else {
      // Go to next user
      const currentUserIndex = userList.indexOf(activeUser);
      if (currentUserIndex < userList.length - 1) {
        setActiveUser(userList[currentUserIndex + 1]);
        setActiveIndex(0);
      } else {
        // No more users → close viewer
        setActiveUser(null);
      }
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      // Go to previous user’s last story
      const currentUserIndex = userList.indexOf(activeUser);
      if (currentUserIndex > 0) {
        const prevUser = userList[currentUserIndex - 1];
        setActiveUser(prevUser);
        setActiveIndex(groupedStories[prevUser].length - 1);
      }
    }
  };

  return (
    <div>
      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto">
        {userList.map((username, index) => {
          const firstStory = groupedStories[username][0];
          return (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => {
                setActiveUser(username);
                setActiveIndex(0);
              }}
            >
              <div className="h-16 w-16 rounded-full border-2 border-pink-500 overflow-hidden">
                <img
                  src={firstStory.image}
                  alt={firstStory.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-xs mt-1 w-20 truncate">{username}</span>
            </div>
          );
        })}
      </div>

      {/* Viewer */}
      {activeUser && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50">
         
          <div className="relative w-full h-[90vh] max-w-md">
            <div>
            <div className="absolute top-4 left-0 right-0 flex gap-1 px-4">
            {currentStories.map((_, i) => (
              <div key={i} className="flex-1 bg-gray-500 h-1 rounded">
                {i === activeIndex && (
                  <motion.div
                    className="bg-white h-1 rounded"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                )}
                 
              </div>
            ))}
            
          </div>
           <div className="absolute flex gap-2 top-8 justify-center items-center text-white px-2 sm:px-6">
            <img src={currentStories[activeIndex].image} alt="" 
            className="h-10 w-10 object-cover rounded-full"/>
              <p className="font-semibold text-sm sm:text-base">
                {currentStories[activeIndex].username}
              </p>
            </div>
          </div>
         
            <img
              src={currentStories[activeIndex].image}
              alt="story"
              className="w-full h-[90vh] object-cover rounded-xl"
            />
           
            <div className="absolute inset-0 flex">
              <div className="w-1/2 flex items-center" onClick={handlePrev}>
                <ChevronLeft className="text-white" />
              </div>
              <div className="w-1/2 flex items-center justify-end" onClick={handleNext}>
                <ChevronRight className="text-white" />
              </div>
            </div>
          </div>

          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white text-lg"
            onClick={() => setActiveUser(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default StoryViewer;
