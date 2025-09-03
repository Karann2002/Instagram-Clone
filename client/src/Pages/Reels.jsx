import React, { useState, useEffect, useRef } from "react";
import { Heart, MessageCircle, Volume2, VolumeX, Send } from "lucide-react";

const reelsData = [
  {
    id: 1,
    videoUrl: "/VID-20230402-WA0065.mp4",
    caption: "Exploring the mountains 🏔️ #adventure",
    username: "karan_kushwah",
  },
  {
    id: 2,
    videoUrl: "/VID-20230402-WA0088.mp4",
    caption: "Sunset vibes 🌅 #relax",
    username: "nature_lover",
  },
];

const Reels = () => {
  const videoRefs = useRef([]);
  const [visibleIconIdx, setVisibleIconIdx] = useState(null);
  const [mutedState, setMutedState] = useState({}); // Track mute status

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          const index = videoRefs.current.findIndex((v) => v === video);

          if (entry.isIntersecting && entry.intersectionRatio >= 0.9) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.9 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, []);

  const handleVideoClick = (e, idx) => {
    const video = e.currentTarget;
    const newMuted = !video.muted;
    video.muted = newMuted;

    setMutedState((prev) => ({ ...prev, [idx]: newMuted }));
    setVisibleIconIdx(idx);

    setTimeout(() => setVisibleIconIdx(null), 1000);
  };

  return (
    <div className="md:h-[95vh] md:w-110 md:mx-80 items-center overflow-y-scroll snap-y snap-mandatory scrollbar-hide scroll-smooth bg-black">
      {reelsData.map((reel, idx) => (
        <div
          key={reel.id}
          className="relative bg-black mb-2 h-screen w-full shadow-lg snap-start flex items-center md:justify-center"
        >
          <video
            ref={(el) => (videoRefs.current[idx] = el)}
            src={reel.videoUrl}
            className="h-full w-full object-cover"
              loop
              playsInline
              autoPlay
              preload="auto"
              disablePictureInPicture
            onClick={(e) => handleVideoClick(e, idx)}
            controls={false}
          />

          {/* Mute / Unmute Icon */}
          {visibleIconIdx === idx && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/50 p-6 rounded-full">
                {mutedState[idx] ? (
                  <VolumeX className="text-white w-8 h-8" />
                ) : (
                  <Volume2 className="text-white w-8 h-8" />
                )}
              </div>
            </div>
          )}

          {/* Overlay UI */}
          <div className="absolute bottom-16 left-4 text-white px-2 sm:px-6">
            <p className="font-semibold text-sm sm:text-base">@{reel.username}</p>
            <p className="text-xs sm:text-sm">{reel.caption}</p>
          </div>

          {/* Right-side Actions */}
          <div className="absolute right-3 sm:right-6 bottom-24 flex flex-col items-center gap-4 text-white">
            <button className="hover:scale-110 transition">
              <Heart size={28} />
              <p className="text-[10px] sm:text-xs text-center">1.2K</p>
            </button>
            <button className="hover:scale-110 transition">
              <MessageCircle size={28} />
              <p className="text-[10px] sm:text-xs text-center">125</p>
            </button>
            <button className="hover:scale-110 transition">
              <Send size={28} />
              <p className="text-[10px] sm:text-xs text-center">Share</p>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reels;
