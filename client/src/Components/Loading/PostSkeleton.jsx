import React from "react";

const FeedSkeleton = () => {
  return (
    <div className="flex animate-pulse">
      {/* Left Section (Stories + Feed) */}
      <div className="w-full flex flex-col items-center min-h-screen">
        {/* STORIES */}
        <div className="w-full max-w-2xl overflow-x-auto flex gap-4 py-4 border-b border-gray-300">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="flex flex-col items-center min-w-[60px]">
              <div className="h-16 w-16 bg-gray-300 rounded-full" />
              <div className="w-14 h-3 bg-gray-200 rounded mt-2" />
            </div>
          ))}
        </div>

        {/* FEED SKELETON */}
        <div className="w-full max-w-xl mt-6 space-y-6">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx} className="bg-white p-4 shadow rounded-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-gray-300" />
                <div>
                  <div className="w-24 h-3 bg-gray-300 mb-1 rounded" />
                  <div className="w-16 h-2 bg-gray-200 rounded" />
                </div>
              </div>

              <div className="w-full h-60 bg-gray-300 rounded-lg mb-3" />

              <div className="w-3/4 h-3 bg-gray-300 mb-2 rounded" />
              <div className="w-1/2 h-3 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Right Section (Sidebar) */}
      <div className="w-full max-w-lg p-10 hidden md:block">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 bg-gray-300 rounded-full" />
            <div>
              <div className="w-24 h-3 bg-gray-300 rounded mb-1" />
              <div className="w-20 h-2 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="w-12 h-3 bg-gray-300 rounded" />
        </div>

        <div className="flex justify-between mt-5">
          <div className="w-32 h-3 bg-gray-300 rounded" />
          <div className="w-16 h-3 bg-gray-300 rounded" />
        </div>

        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="flex items-center justify-between mt-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gray-300 rounded-full" />
              <div>
                <div className="w-20 h-3 bg-gray-300 rounded mb-1" />
                <div className="w-16 h-2 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="w-10 h-3 bg-gray-300 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedSkeleton;
