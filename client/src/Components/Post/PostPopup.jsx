import React from 'react'
import { useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import PopupModal from '../Popup/PopupModal';

const PostPopup = () => {
        
    
  return (
    <div>
                  <div>
                    <button>Post</button>

                    {showPopup && (
                      <Dialog
                        open={showPopup}
                        onClose={setShowPopup}
                        className="relative z-50"
                      >
                        <DialogBackdrop className="fixed inset-0 bg-black/50" />

                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                          <DialogPanel className="w-full max-w-lg rounded-2xl bg-white shadow-lg">
                            <DialogTitle className="flex justify-between text-lg border-b-2 px-5 py-5 border-gray-100 font-semibold text-gray-800 ">
                              <p>New Post</p>
                              <button
                                type="button"
                                onClick={() => setShowPopup(false)}
                                className=" text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                              >
                                <X />
                              </button>
                            </DialogTitle>
                            <CreatePost/>
                          </DialogPanel>
                        </div>
                      </Dialog>
                    )}
                  </div>
                </div>
  )
}

export default PostPopup