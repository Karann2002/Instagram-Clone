import React, { useEffect, useState } from "react";
import axios from "axios";

const FollowButton = ({ profileUserId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [doesUserFollowMe, setDoesUserFollowMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${profileUserId}/is-following`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsFollowing(res.data.isFollowing);
        setDoesUserFollowMe(res.data.doesUserFollowMe);
      } catch (error) {
        console.error("Error checking follow status", error);
      }
    };

    if (profileUserId && token) {
      checkFollowStatus();
    }
  }, [profileUserId, token]);

  const handleToggleFollow = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_API_URL}/users/${profileUserId}/${
        isFollowing ? "unfollow" : "follow"
      }`;

      await axios.post(url, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error("Follow/Unfollow failed:", err);
    }
    setLoading(false);
  };

  // let buttonText = "Follow";
  // if (isFollowing) {
  //   buttonText = "Following";
  // } else if (!isFollowing && doesUserFollowMe) {
  //   buttonText = "Follow Back";
  // }

  return (
    <button
      className={`px-4 py-1 text-sm rounded-full ${
        isFollowing ? "bg-gray-300 text-black" : "bg-blue-600 text-white"
      }`}
      onClick={handleToggleFollow}
      disabled={loading}
    >
      {loading ? "Loading..." : isFollowing
  ? "Following"
  : doesUserFollowMe 
  ? "Follow Back"
  : "Follow"}
    </button>
  );
};

export default FollowButton;
