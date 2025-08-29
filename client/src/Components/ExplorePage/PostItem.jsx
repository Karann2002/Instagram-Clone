import React from "react";

const PostItem = ({ post, onClick ,selectedPost}) => {
  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <img
        src={post.imageUrl}
        alt="post"
        className="w-full h-80 object-cover  hover:opacity-80"
      />
      <div className="absolute inset-0 bg-black  flex justify-center items-center opacity-0 hover:opacity-50 transition">
        {/* <span className="text-white font-semibold">{post.likes.length} ❤️</span> */}
      </div>
      {selectedPost && (
              <Dialog open={showPopup} onClose={setShowPopup} className="relative z-50">
                            <DialogBackdrop className="fixed inset-0 bg-black/50" />
                  
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                              <DialogPanel className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
                                <DialogTitle className="text-lg font-semibold text-gray-800 mb-4">
                                  Contact Us
                                </DialogTitle>
                                
                              </DialogPanel>
                            </div>
                          </Dialog>
            )}
    </div>
  );
};

export default PostItem;
