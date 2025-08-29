import React, { useEffect, useState } from "react";
import PostGrid from "./PostGrid";
import PostModal from "./PostModal";
import axios from "axios";
import FeedSkeleton from "../Loading/PostSkeleton";
// import SearchBar from "./SearchBar"; 


const ExplorePage = () => {
  const [posts, setPosts] = useState([]);
  
    const [loading, setLoading] = useState(true);
  
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('http://localhost:5000/api/posts', {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
      setPosts(res.data)
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between">
      <h1 className="text-2xl font-bold mb-4">Explore</h1>
      {/* <div>
      <SearchBar/></div> */}
      </div>
      {loading ? Array.from({ length: 1 }).map((_, idx) => <FeedSkeleton key={idx} />):
      <PostGrid posts={posts} onPostClick={setSelectedPost} />
  }
      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    
     
    </div>
  );
};

export default ExplorePage;
