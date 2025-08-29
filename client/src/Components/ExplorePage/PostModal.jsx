import React from "react";
import  {  useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";


const PostModal = ({ post, onClose }) => {
      const [showPopup, setShowPopup] = useState(false);
  
  return (



    <div>
          <button
            onClick={() => setShowPopup(true)}
            className="w-full h-auto sm:min-w-[150px] bg-stone-900 text-white m-4 px-8 py-3 rounded-full text-base md:text-sm hover:bg-stone-700 transition duration-300 ease-in-out"
          >
            Get Your Consult!
          </button>
    
          {showPopup && (
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
    // <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
    //   <div className="bg-white p-4 text-white rounded-lg max-w-2xl w-full relative">
    //     <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
    //       ✖
    //     </button>
    //     <img src={post.imageUrl} alt="full" className="w-full rounded-md" />
    //     <div className="mt-4">
    //       <p><strong>{post.author.username}</strong></p>
    //       <p>{post.caption}</p>
    //       {/* <p className="text-sm text-gray-500 mt-2">{post.likes.length} likes</p> */}
    //     </div>
    //   </div>
    // </div>
  );
};

export default PostModal;
