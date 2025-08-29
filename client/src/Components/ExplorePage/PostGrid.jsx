import React from "react";
import PostItem from "./PostItem";

const PostGrid = ({ posts, onPostClick }) => {
  return (
    <div className="grid grid-cols-3 ">
      {posts.map((post) => (
        <PostItem key={post._id} post={post} onClick={() => onPostClick(post)} />
      ))}
    </div>
  );
};

export default PostGrid;
