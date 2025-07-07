"use client"

import {useState} from 'react';
import {  User, ArrowRight, Palette, LineSquiggle, ArchiveX } from 'lucide-react';
import Link from 'next/link';
import DeleteModel from './DeleteModel';
import axios from 'axios';
import { Http_BackendUrl } from '../config';

interface RoomCardProps {
  slug: string;
  creatorName: string;
  roomId : number;

}

const RoomCard = ({
  slug,
  creatorName,
  roomId,
 
}: RoomCardProps) => {
       const [showDeleteModal, setShowDeleteModal] = useState(false)


       const handleDeleteRoom = async() => {
         try {
          const response = await axios.delete(`${Http_BackendUrl}/room/${roomId}`,{
            headers: {
              Authorization: `${localStorage.getItem("token")}`
            }
          })

          if(response.data){
            console.log("Room deleted successfully:", response.data);
            // alert("Room deleted successfully: " + response.data.slug);
            setShowDeleteModal(false); // Close the modal after successful deletion
            window.location.reload(); // Reload the page to reflect changes
          }
          
         } catch (error : any) {
          console.error("Error deleting room:", error);
          alert("Error deleting room: " + "you are not owner of this room or something wrong" );
          // window.location.reload();
         }

       }

  return (
    <>
    <div className="group relative w-80 overflow-hidden isolate bg-gradient-to-br from-purple-900/25 via-gray-900 to-blue-900/20 rounded-2xl p-6 shadow-2xl border border-slate-700/30 hover:border-blue-400/40 hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-500 backdrop-blur-sm">
    
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl z-0"></div>

     
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
      </div>


      <div className="relative z-10 flex flex-col gap-4">
      
        <div className="flex justify-between items-center">
  {/* Left: Creator Info */}
  <div className="flex items-center gap-2 text-slate-400 text-sm group-hover:text-slate-300 transition-colors duration-300">
    <User size={16} className="opacity-70" />
    <span>
      Created by <span className="font-semibold text-slate-300">{creatorName}</span>
    </span>
  </div>

  {/* Right: Archive Icon */}
  <div className="text-slate-400 hover:text-emerald-500 cursor-pointer transition-colors duration-200">
   <button onClick={() => setShowDeleteModal(true)} className="p-2 rounded-full hover:bg-slate-700/20 transition-colors duration-300">
    <ArchiveX />
   </button>
  </div>
</div>
        <div className="flex items-center self-start gap-1.5   backdrop-blur-sm px-1 py-1.5 rounded-lg   transition-all duration-300 group-hover:border-slate-500/50">
          <LineSquiggle size={18} className="text-slate-400 group-hover:text-blue-400 transition-colors duration-300" />
          <span className="text-xl text-slate-300 font-medium">{slug}</span>
        </div>

        <div className="flex items-center gap-3 p-2.5 bg-gradient-to-r from-emerald-900/30 to-green-900/30 rounded-lg border border-emerald-700/20 group-hover:border-emerald-600/30 transition-all duration-300">
          <Palette size={16} className="text-emerald-400" />
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-emerald-300 font-medium">Excalidraw Canvas</span>
        </div>

       <Link href={`/canvas/${roomId}`} className="w-full">
        <button
          className="w-full mt-2 bg-gradient-to-r bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 group/button shadow-lg hover:shadow-blue-500/25 hover:shadow-xl">
          <span className="tracking-wide">Join Room</span>
          <ArrowRight
            size={18}
            className="transform group-hover/button:translate-x-1 group-hover/button:scale-110 transition-all duration-300"
          />
        </button>
    </Link>
      </div>
      <div className="absolute top-3 right-3 w-20 h-20 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none z-0"></div>
      <div className="absolute bottom-3 left-3 w-16 h-16 bg-gradient-to-tr from-purple-500/15 via-pink-500/15 to-orange-500/15 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none z-0"></div>

    </div>
    {showDeleteModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <DeleteModel
      roomId={roomId}
      roomName={slug}
      onDelete={handleDeleteRoom}
      onCancel={() => setShowDeleteModal(false)}
    />
  </div>
)}
  </>
  );
};

export default RoomCard;
