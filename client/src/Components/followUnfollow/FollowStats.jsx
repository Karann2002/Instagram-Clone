import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../../../socket";

const FollowStats = ({ profileUserId }) => {
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);


    const fetchFollowStats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/${profileUserId}/follow-stats`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setFollowersCount(res.data.followersCount);
        setFollowingCount(res.data.followingCount);
      } catch (error) {
        console.error("Failed to fetch follow stats:", error);
      }
    };

    if (profileUserId) {
      fetchFollowStats();
    }
  useEffect(() => {
    if (profileUserId) {
      fetchFollowStats();

      // 🟢 Listen for real-time updates
      socket.on("followStatsUpdated", (data) => {
        if (data.userId === profileUserId) {
          fetchFollowStats(); // Refresh follow stats only for this profile
        }
      });

      // 🔴 Clean up on unmount
      return () => {
        socket.off("followStatsUpdated");
      };
    }
  }, [profileUserId]);

  

  return (
    <div>
      
      <p className="flex gap-5">
              
              <p className="flex gap-1">
                <h1 className="font-bold">{followersCount} </h1>followers
              </p>
              <p className="flex gap-1">
                <h1 className="font-bold">{followingCount} </h1>following
              </p>
              </p>
    </div>
  );
};

export default FollowStats;
