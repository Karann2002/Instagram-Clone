import React from 'react'
import { Outlet,useLocation } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../Components/Sidebar';




const SettingLayout = () => {
    


  

  return (
    <div className="h-[98vh] overflow-y-auto">
       
      <div className="flex flex-1  bg-white z-50 ">
      <Sidebar  />
      <main className=' overflow-y-auto h-[98vh]  w-full  '>
      <Outlet/>
      
      </main>
   
    </div>
    </div>
  
  )
}

export default SettingLayout;
