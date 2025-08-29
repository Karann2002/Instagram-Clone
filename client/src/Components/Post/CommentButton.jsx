  const [showPopup, setShowPopup] = useState(false);
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

// return (
//   <div className="scroll-smooth md:px-40 px-2">
//     <div>
//       {loading ? (
//         Array.from({ length: 1 }).map((_, idx) => <PostSkeleton key={idx} />)
//       ) : (
//         <div className="flex md:flex-row flex-col">
//           {/* FEED SECTION */}
//           <div className="w-full flex flex-col items-center min-h-screen">
//             {/* STORIES */}
//             <div className="w-full max-w-2xl overflow-x-auto flex gap-4 py-4 border-b border-gray-300">
//               {stories.map((note, idx) => (
//                 <div
//                   key={idx}
//                   className="flex flex-col items-center min-w-[60px]"
//                 >
//                   <img
//                     src={note.image}
//                     alt=""
//                     className="h-16 w-16 rounded-full border-2 border-pink-500 object-cover"
//                   />
//                   <p className="text-xs md:text-sm text-center mt-1 w-20 truncate">
//                     {note.title}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* FEED POSTS */}
//             <div className="w-full max-w-xl mt-4 md:mt-6 space-y-6">
//               {posts.map((post) => (
//                 <div
//                   key={post._id}
//                   className="bg-white px-3 md:px-5 border border-gray-200 rounded-md"
//                 >
//                   {/* Header */}
//                   <div className="flex items-center gap-3 mb-3">
//                     <Link to={`/profile/${post.author?.username}`}>
//                       <img
//                         src={post.authorProfilePicUrl}
//                         alt=""
//                         className="h-10 w-10 rounded-full object-cover"
//                       />
//                     </Link>
//                     <div>
//                       <Link to={`/profile/${post.author?.username}`}>
//                         <h1 className="font-semibold text-sm">
//                           {post.author?.username || "N/A"}
//                         </h1>
//                       </Link>
//                       <p className="text-xs text-gray-500">
//                         {new Date(post.createdAt).toLocaleTimeString()}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Post Image */}
//                   <div
//                     className="rounded-sm"
//                     onClick={() => {
//                       setShowPopup(true);
//                       setSelectedPost(post);
//                     }}
//                   >
//                     <img
//                       src={post.imageUrl}
//                       alt=""
//                       className="w-full object-contain max-h-[400px] md:max-h-[600px]"
//                     />
//                   </div>

//                   {/* Like & Caption */}
//                   <div className="mt-2">
//                     <LikeButton
//                       postId={post._id}
//                       initialLikes={post.likes}
//                       initialComments={post.comments}
//                       currentUserId={user._id}
//                     />
//                     <div className="mt-1 text-sm">
//                       <span className="font-semibold">
//                         {post.author?.username}
//                       </span>{" "}
//                       <span className="text-gray-700">{post.caption}</span>
//                     </div>
//                   </div>

//                   {/* Comments */}
//                   <div className="py-2">
//                     <p className="text-sm font-normal mb-1">
//                       View all comments
//                     </p>
//                     <div className="space-y-1 max-h-32 overflow-y-auto">
//                       {(comments[post._id] || []).map((c, i) => (
//                         <div key={i} className="flex items-center gap-2 text-sm">
//                           <Link to={`/profile/${c.userId?.username}`}>
//                             <img
//                               src={c.userCommentProfilePicUrl}
//                               alt="profile pic"
//                               className="h-6 w-6 rounded-full object-cover"
//                             />
//                           </Link>
//                           <p>
//                             <span className="font-semibold">
//                               <Link to={`/profile/${c.userId?.username}`}>
//                                 {c.userId?.username || "User"}
//                               </Link>
//                               :
//                             </span>{" "}
//                             {c.text}
//                           </p>
//                         </div>
//                       ))}
//                     </div>

//                     {/* Comment Input */}
//                     <div className="flex items-center mt-2">
//                       <input
//                         type="text"
//                         value={commentText[post._id] || ""}
//                         onChange={(e) =>
//                           setCommentText((prev) => ({
//                             ...prev,
//                             [post._id]: e.target.value,
//                           }))
//                         }
//                         placeholder="Add a comment..."
//                         className="flex-grow text-sm rounded px-3 py-1 outline-none border"
//                       />
//                       <button
//                         onClick={() => handleComment(post._id)}
//                         className="ml-2 text-blue-600 font-semibold text-sm"
//                       >
//                         Post
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* SUGGESTIONS - HIDDEN ON MOBILE */}
//           <div className="hidden md:block w-full max-w-sm p-5">
//             <div className="flex justify-between items-center">
//               <div className="flex gap-3 items-center">
//                 <img
//                   src={user?.profilePicUrl}
//                   alt=""
//                   className="h-12 w-12 rounded-full object-cover"
//                 />
//                 <div>
//                   <p className="font-bold text-sm">{user?.username}</p>
//                   <p className="font-light text-xs">{user?.fullName}</p>
//                 </div>
//               </div>
//               <button className="text-blue-600 text-sm">Switch</button>
//             </div>

//             <div className="flex justify-between mt-5">
//               <p className="text-sm">Suggested for you</p>
//               <button className="text-sm">See All</button>
//             </div>

//             <div className="flex flex-col py-2 space-y-2">
//               {users.map((sUser) => (
//                 <div key={sUser._id} className="flex justify-between items-center">
//                   <div className="flex items-center gap-3">
//                     <Link to={`/profile/${sUser?.username}`}>
//                       <img
//                         src={sUser?.profilePicUrl}
//                         alt=""
//                         className="h-10 w-10 rounded-full object-cover"
//                       />
//                     </Link>
//                     <div>
//                       <Link to={`/profile/${sUser?.username}`}>
//                         <p className="font-bold text-sm">{sUser?.username}</p>
//                       </Link>
//                       <p className="text-xs">{sUser?.fullName}</p>
//                     </div>
//                   </div>
//                   <FollowButton profileUserId={sUser._id} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// );

<div
                      className="rounded-sm "
                      onClick={() => {
                        setShowPopup(true);
                        setSelectedPost(post);
                      }}
                    >
                      <img
                        src={post.imageUrl}
                        alt=""
                        className="w-full object-contain max-h-[400px]"
                      />
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
                                  <img
                                    src={selectedPost.imageUrl}
                                    alt="Post"
                                    className="max-w-130 h-full object-contain rounded-lg mb-4"
                                  />
                                </div>
                                <div className="flex flex-col w-full justify-between ">
                                  <div>
                                    <div key={post.id} className="bg-white ">
                                      <div className="flex items-center pl-5 gap-3 py-3 border-b border-gray-200">
                                        <img
                                          src={selectedPost.authorProfilePicUrl}
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
                                              {selectedPost.author?.username ||
                                                "N/A"}
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
                                                  className="h-7 w-7 rounded-full object-cover"
                                                />
                                                <span className="font-semibold">
                                                  {c.userId?.username || "User"}
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
                                        initialComments={selectedPost.comments}
                                        currentUserId={user._id}
                                      /> 
                                      {/* <CommentButton
                                        postId={selectedPost._id}
                                        initialComments={selectedPost.comments}
                                        currentUserId={user._id}
                                      />  */}
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