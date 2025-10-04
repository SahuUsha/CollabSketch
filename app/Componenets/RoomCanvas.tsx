// "use client"

// import { useEffect, useState} from "react"
// import { WS_URl } from "../config"
// import CanavsPage from "./Canavs"


// const RoomCanvas = ({ roomId } : {roomId :string} ) => {

//   const [socket, setsocket] = useState<WebSocket | null>(null)
  
//   useEffect(()=>{
//      const token = localStorage.getItem('token')
//     const ws = new WebSocket(`${WS_URl}?token=${token}`)

//     ws.onopen=()=>{
//         setsocket(ws)
//         ws.send(JSON.stringify({
//           type : "join_room",
//           roomId
//         }))
//     }
//    },[])

//    if(!socket){
//     return <div className="h-[100vh] bg-black  bg-gradient-to-b from-gray-900 to-black/50 flex items-center  justify-center text-white">
//         Connecting to server...
//     </div>
//    }
//   return (
//     <div className="h-[100vh] bg-slate-700 overflow-hidden">
//        <CanavsPage roomId={roomId} socket={socket}/>
       
      
//     </div>
//   )
// }

// export default RoomCanvas


"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { WS_URl, Http_BackendUrl } from "../config";
import CanavsPage from "./Canavs";

const RoomCanvas = ({ roomId }: { roomId: string }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [password, setPassword] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // ✅ Function to check password via API
  const handleJoinRoom = async () => {
    try {
      const res = await axios.post(
        `${Http_BackendUrl}/join-room`,
  {
    roomId: Number(roomId),  // ✅ fix type
    password,
  },
  {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  }
      );

      if (res.data.message === "Joined successfully") {
        setShowPasswordModal(false);
        connectWebSocket(password); // move to ws only if password is correct
      }
    } catch (err: any) {
      console.error("Error joining room:", err);
      setErrorMessage(err.response?.data?.message || "Invalid password");
    }
  };

  // ✅ Function to connect websocket after password is correct
  const connectWebSocket = (pwd: string) => {
    const token = localStorage.getItem("token");
    const ws = new WebSocket(`${WS_URl}?token=${token}`);

    ws.onopen = () => {
      setSocket(ws);
      ws.send(
        JSON.stringify({
          type: "join_room",
          roomId,
          password: pwd,
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "error") {
        setErrorMessage(data.message);
        setShowPasswordModal(true);
        ws.close();
      }
    };
  };

  // ✅ Password Modal
  if (showPasswordModal) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="relative bg-purple-800/10 backdrop-blur-md border border-purple-500/30 rounded-xl p-6 w-full max-w-md mx-auto text-white shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Enter Room Password</h2>

          <label className="block text-sm mb-1 text-slate-300" htmlFor="roomPassword">
            Password :
          </label>
          <input
            type="password"
            id="roomPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-2 mb-2 rounded-lg border border-purple-500/30 focus:outline-none focus:ring-1 focus:ring-blue-400/50 text-white placeholder-slate-400"
          />

          {errorMessage && <span className="text-red-500 text-sm mb-2 block">{errorMessage}</span>}

          <button
            onClick={handleJoinRoom}
            disabled={!password}
            className="w-full mt-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg hover:shadow-blue-500/25 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Join
          </button>
        </div>
      </div>
    );
  }

  // ✅ While socket is connecting
  if (!socket) {
    return (
      <div className="h-[100vh] bg-black bg-gradient-to-b from-gray-900 to-black/50 flex items-center justify-center text-white">
        Connecting to server...
      </div>
    );
  }

  // ✅ Once connected
  return (
    <div className="h-[100vh] bg-slate-700 overflow-hidden">
      <CanavsPage roomId={roomId} socket={socket} />
    </div>
  );
};

export default RoomCanvas;
