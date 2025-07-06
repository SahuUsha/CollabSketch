"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import CreateRoom from './CreateRoom';


const Navbar = ({onRoomCreated} : any) => {
  const [createRoomModel, setcreateRoomModel] = useState(false);
  const pathname = usePathname()
  useEffect(()=>{
     setcreateRoomModel(false);
  },[pathname])

  return (
    <>
      <div className="mx-auto w-[90%] lg:w-[97%] max-w-7xl bg-purple-800/20 backdrop-blur-md border border-purple-500/30 rounded-2xl py-4 px-6 text-white shadow-md">
        <div className="flex items-center justify-between">
          <button className="text-xl font-semibold cursor-pointer">
            <Link href="/">🎨 CollabSketch</Link>
          </button>
          <div className="space-x-6 text-sm font-medium text-slate-200">
            <button
              onClick={() => setcreateRoomModel(true)}
              className="hover:text-white transition relative group"
            >
              Create Room
              <span className="absolute bottom-0 mb-[-0.2rem] left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
            </button>
          </div>
        </div>
      </div>

      {createRoomModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <CreateRoom
            onClose={() => setcreateRoomModel(false)}
            onRoomCreated={() => {
              setcreateRoomModel(false);
              onRoomCreated(); // ✅ Trigger room refresh
            }}
          />
        </div>
      )}
    </>
  );
};

export default Navbar;
