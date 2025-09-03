import React, { useEffect, useState } from "react";
import {
  Bolt,
  Bookmark,
  Clapperboard,
  Contact,
  Grid3x3,
  Heart,
} from "lucide-react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FollowButton from "../followUnfollow/FollowButton";
import FollowStats from "../followUnfollow/FollowStats";
import LikeButton from "../Post/LikeButton";
import StoryViewer from "../Stories/story";

const UserProfile = ({ profileUser }) => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("feed");
  const [postCount, setPostCount] = useState("0");
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState({});

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        const userRes = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${username}`
        );
        const userData = await userRes.json();
        setUser(userData);

        const postsRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/posts/${username}`
        );
        const postsArray = postsRes.data;
        setMyPosts(postsArray);
         postsRes.data.forEach((post) => {
          fetchCommentsForPost(post._id);
        });
        setPostCount(postsArray.length);
      } catch (err) {
        console.error("Error fetching user or posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPosts();
  }, [username]);

  if (!user) return <div>Loading...</div>;
  const tabs = [
    { id: "feed", label: <Grid3x3 /> },
    { id: "reels", label: <Clapperboard /> },
    { id: "saved", label: <Bookmark /> },
    { id: "tag", label: <Contact /> },
  ];
  const PostSkeleton = () => {
    return (
      <div className="animate-pulse aspect-square bg-gray-200 w-full h-full" />
    );
  };

  const fetchCommentsForPost = async (postId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/${postId}/comments`
      );
      
      setComments((prev) => ({
        ...prev,
        [postId]: res.data || [],
      }));
    } catch (err) {
      console.error("Failed to load comments:", err);
    }
  };

  const handleComment = async (postId) => {
    const token = localStorage.getItem("token");
    if (!commentText.trim()) return;

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/posts/comment/${postId}`,
        {
          text: commentText,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCommentText("");
      fetchCommentsForPost(postId);
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case "feed":
        return (
          <div className="">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <PostSkeleton key={index} />
              ))
            ) : myPosts.length === 0 ? (
              <div className=" flex w-full h-70 justify-center items-center">
                <p className="  font-normal  text-2xl">Not Posts Yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-3">
                {myPosts.map((post ,idx) => (
                  <div key={idx}>
                    <div key={post._id} className="relative">
                      <div className="aspect-square overflow-hidden cursor-pointer ">
                        {post.mediaType === "video" ? (
  <video
                          src={post.imageUrl}
                          controls={false}
                          loop
                          playsInline
                          autoPlay
                          preload="auto"
                          disablePictureInPicture
    className=" w-full h-full object-cover"
  />
) : (
  <img
    src={post.imageUrl}
    alt="Post"
    className=" w-full h-full object-cover "
  />
)}
                      </div>

                      <div
                        className="absolute inset-0 bg-black  flex justify-center items-center opacity-0 hover:opacity-80 transition"
                        onClick={() => {
                          setShowPopup(true);
                          setSelectedPost(post);
                        }}
                      >
                        <div className="flex gap-5 text-white mt-2 text-sm font-medium">
                          <div className="text-white">
                            <LikeButton
                              postId={post._id}
                              initialLikes={post.likes}
                              initialComments={post.comments}
                              currentUserId={user.id}
                            />
                          </div>
                        </div>
                        {showPopup && (
                          <Dialog
                            open={showPopup}
                            onClose={setShowPopup}
                            className="relative z-50"
                          >
                            <DialogBackdrop className="fixed inset-0 bg-black/50 opacity-20" />

                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                              <DialogPanel className="w-full h-full mx-60 my-10 rounded-lg bg-white ">
                                <div className="bg-white flex  bg-opacity-100 h-full w-full relative ">
                                  <div className="">
                                     {selectedPost.mediaType === "video" ? (
                        <video
                          src={selectedPost.imageUrl}
                          controls={false}
                          loop
                          playsInline
                          autoPlay
                          preload="auto"
                          disablePictureInPicture
                          className="max-w-130  object-contain "
                        />
                      ) : (
                        <img
                          src={selectedPost.imageUrl}
                          alt="Post"
                          className="max-w-130 object-contain h-full"
                        />
                      )}
                                  </div>
                                  <div className="flex flex-col w-full justify-between ">
                                    <div>
                                      <div key={post.id} className="bg-white ">
                                        <div className="flex items-center pl-5 gap-3 py-3 border-b border-gray-200">
                                          <img
                                            src={
                                              selectedPost.authorProfilePicUrl
                                            }
                                            alt=""
                                            className="h-10 w-10 rounded-full object-cover"
                                          />
                                          <div className="">
                                            <h1 className="font-semibold text-sm">
                                              {selectedPost.author?.username ||
                                                "N/A"}
                                            </h1>
                                            <p className="text-xs text-gray-500">
                                              {new Date(
                                                selectedPost.createdAt
                                              ).toLocaleTimeString()}
                                            </p>
                                          </div>
                                        </div>

                                        <div className="mt-1 text-sm py-3 pl-5">
                                          <div className="flex items-center gap-3 mb-3">
                                            <img
                                              src={
                                                selectedPost?.authorProfilePicUrl
                                              }
                                              alt=""
                                              className="h-10 w-10 rounded-full object-cover"
                                            />
                                            <div className="flex gap-2">
                                              <h1 className="font-semibold text-sm">
                                                {selectedPost.author
                                                  ?.username || "N/A"}
                                              </h1>
                                              <span className="text-gray-700">
                                                {selectedPost.caption}
                                              </span>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="py-2 pl-5">
                                          <p className="text-sm font-normal">
                                            all comments
                                          </p>
                                          <div className="space-y-1 h-80 py-2 overflow-y-auto">
                                            {(
                                              comments[selectedPost._id] || []
                                            ).map((c, i) => (
                                              <div className="py-2">
                                                <p
                                                  key={i}
                                                  className="flex gap-2 text-sm"
                                                >
                                                  <img
                                                    src={
                                                      c.userCommentProfilePicUrl
                                                    }
                                                    alt="profile pic"
                                                    className="h-7 w-7 rounded-full"
                                                  />
                                                  <span className="font-semibold">
                                                    {c.userId?.username ||
                                                      "User"}
                                                    :
                                                  </span>{" "}
                                                  {c.text}
                                                </p>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="py-2 px-5 ">
                                        <LikeButton
                                          postId={selectedPost._id}
                                          initialLikes={selectedPost.likes}
                                          initialComments={
                                            selectedPost.comments
                                          }
                                          currentUserId={user._id}
                                        />
                                        <p className="pt-2  text-xs text-gray-500">
                                          {new Date(
                                            selectedPost.createdAt
                                          ).toLocaleTimeString()}
                                        </p>
                                      </div>

                                      <div className="my-2 flex border-t border-gray-200 ">
                                        <form
                                          onSubmit={(e) => {
                                            e.preventDefault(); // prevent page reload
                                            handleComment(selectedPost._id);
                                          }}
                                          className="flex justify-between w-full"
                                        >
                                          <input
                                            type="text"
                                            value={commentText}
                                            onChange={(e) =>
                                              setCommentText(e.target.value)
                                            }
                                            placeholder="Add a comment..."
                                            className="flex-grow w-full px-3 py-2 text-sm outline-none"
                                          />
                                          <button
                                            type="submit"
                                            className="py-2 px-4 text-blue-600 font-semibold text-sm"
                                          >
                                            Post
                                          </button>
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </DialogPanel>
                            </div>
                          </Dialog>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "reels":
        return <div className="p-4">📁 General updates here</div>;
      case "saved":
        return <div className="p-4">📨 New requests here</div>;
      case "tag":
        return <div className="p-4">📨 New requests here</div>;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <div className="ml-35 mr-35  justify-center">
        <div className="flex w-full ">
          <div className="p-10">
            <img
              src={user?.profilePicUrl}
              alt="Profile"
              className="h-32 w-32 rounded-full object-cover"
            />
          </div>
          <div className="">
            <div className="flex gap-2 p-5">
              <h1 className="text-xl font-normal">{user.username}</h1>
              <div className="flex gap-2">
                <FollowButton profileUserId={(profileUser = user._id)} />
              </div>
            </div>
            <div className="flex gap-8 p-5">
              <p className="flex gap-1">
                <h1 className="font-bold">{postCount} </h1>posts
              </p>
              <p className="flex gap-1">
                <FollowStats profileUserId={(profileUser = user._id)} />
              </p>
            </div>
            <div className="p-5">
              <p>{user.fullName}</p>
              <p>description</p>
            </div>
          </div>
        </div>
        <div className="w-full  overflow-x-auto flex gap-10 px-15 py-5 border-b border-gray-300">
          <StoryViewer />
        </div>

        <div className="w-full  mx-auto">
          {/* Tabs Header */}
          <div className="flex  items-center w-full border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-4 text-sm flex justify-center w-full font-medium capitalize ${
                  activeTab === tab.id
                    ? "border-b-2 border-black-500 text-black-600"
                    : "text-gray-600 hover:text-black-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tabs Content */}
          <div className="w-full h-full">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
