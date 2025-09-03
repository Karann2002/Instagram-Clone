import { Heart } from 'lucide-react'
import React from 'react'

const HeroLoading = () => {
  return (
    // <div className="relative  w-screen bg-white flex items-center justify-center">
    //     {/* Animated colorful bar */}
    //     <div className=" top-0 left-0 w-full h-1 ">
    //       <div className="loading-bar"></div>
    //     </div>
        

    //     <style>
    //       {`
    //         .loading-bar {
    //           width: 200%;
    //           height: 100%;
    //           background: linear-gradient(
    //             90deg,
    //             #ff6b6b,
    //             #f7d794,
    //             #1dd1a1,
    //             #54a0ff,
    //             #5f27cd,
    //             #ff6b6b
    //           );
    //           background-size: 200% 100%;
    //           animation: slide 1s linear infinite;
    //         }

    //         @keyframes slide {
    //           from { transform: translateX(-50%); }
    //           to { transform: translateX(0%); }
    //         }
    //       `}
    //     </style>
    //   </div>
    <div className='h-screen'>
    <div className='flex flex-col w-full h-[95vh] justify-center items-center'>
        <img className='h-15 w-15' src='/logo/download.jpg' alt="" />
    </div>
        <div className='flex  w-full justify-center items-center'>Karan-Kushwah ❤️</div>
    </div>
  )
}

export default HeroLoading