import { useState, useEffect } from "react";
import axios from "axios";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import socket from "../../../socket";

const LikeButton = ({
  postId,
  initialLikes,
  initialComments,
  currentUserId,
}) => {
  const [likes, setLikes] = useState(initialLikes || []);
  const [comments, setComments] = useState(initialComments || []);

  const hasLiked = likes.includes(currentUserId);
  

  const token = localStorage.getItem("token");

  const toggleLike = async () => {
    try {
      socket.emit("likePost", { postId, userId: currentUserId });

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/posts/like/${postId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLikes(res.data.likes);
    } catch (err) {
      console.error("Error liking post", err);
    }
  };

   const toggleComment = () => {
  socket.emit("commentPost", { postId, userId: currentUserId });
  
};

  useEffect(() => {
    const handlePostLiked = ({ postId: likedPostId, userId }) => {
      if (likedPostId === postId) {
        setLikes((prevLikes) =>
          prevLikes.includes(userId)
            ? prevLikes.filter((id) => id !== userId)
            : [...prevLikes, userId]
        );
      }
    };

     const handlePostCommented = ({ postId: commentedPostId }) => {
    if (commentedPostId === postId) {
      setComments(prev => [...prev, {}]); 
    }
  };

    socket.on("postLiked", handlePostLiked);
    socket.on("postCommented", handlePostCommented);

    return () => {
      socket.off("postLiked", handlePostLiked);
      socket.off("postCommented", handlePostCommented);
    };
  }, [postId]);

  return (
    <div>
      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-4 ">
          <button onClick={toggleLike} className="flex items-center gap-1">
            <Heart
              className={`transition-all duration-200 ${
                hasLiked ? "text-red-500 fill-red-500" : ""
              }`}
              fill={hasLiked ? "red" : "none"}
            />
            <span>{likes.length}</span>
          </button>

          <button onClick={toggleComment} className="flex items-center gap-1">
            <MessageCircle />
            <span>{comments.length}</span>
          </button>

          <Send className="cursor-pointer hover:text-purple-500" />
        </div>
        <Bookmark className="cursor-pointer hover:text-yellow-500" />
      </div>

      <div className="mt-2 text-sm font-medium">
        {likes.length} <span className="font-normal">likes</span>
      </div>
    </div>
  );
};

export default LikeButton;
