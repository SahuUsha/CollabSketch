"use client"

import { useEffect, useState} from "react"
import { WS_URl } from "../config"
import CanavsPage from "./Canavs"


const RoomCanvas = ({ roomId } : {roomId :string} ) => {

  const [socket, setsocket] = useState<WebSocket | null>(null)
  
  useEffect(()=>{
     const token = localStorage.getItem('token')
    const ws = new WebSocket(`${WS_URl}?token=${token}`)

    ws.onopen=()=>{
        setsocket(ws)
        ws.send(JSON.stringify({
          type : "join_room",
          roomId
        }))
    }
   },[])

   if(!socket){
    return <div className="h-[100vh] bg-black  bg-gradient-to-b from-gray-900 to-black/50 flex items-center  justify-center text-white">
        Connecting to server...
    </div>
   }
  return (
    <div className="h-[100vh] bg-slate-700 overflow-hidden">
       <CanavsPage roomId={roomId} socket={socket}/>
       
      
    </div>
  )
}

export default RoomCanvas
