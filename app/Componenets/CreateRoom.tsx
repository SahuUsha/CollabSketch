import axios from 'axios';
import { useState } from 'react';
import { Http_BackendUrl } from '../config';

const CreateRoom = ({ onClose, onRoomCreated }: any) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateRoom = async () => {
    try {
      const response = await axios.post(
        `${Http_BackendUrl}/room`,
        {
          name,
          password, // ✅ send password too
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data) {
        console.log("Room created successfully:", response.data);
        onClose(); // Close the modal after success
        onRoomCreated();
      }
    } catch (error: any) {
      console.error("Error creating room:", error);
      alert("Error creating room: " + error.message);
    }
  };

  return (
    <div className="relative bg-purple-800/10 backdrop-blur-md border border-purple-500/30 rounded-xl p-6 w-full max-w-md mx-auto text-white shadow-lg">
      <button
        onClick={onClose}
        className="absolute top-2 right-3 text-white text-xl font-bold hover:text-purple-300"
      >
        &times;
      </button>

      <h1 className="text-2xl font-semibold mb-4">Create Room</h1>

      {/* Room Name */}
      <label className="block text-sm mb-1 text-slate-300" htmlFor="roomName">
        Room Name:
      </label>
      <input
        type="text"
        placeholder="Enter room name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-2 mb-4 rounded-lg border border-purple-500/30 focus:outline-none focus:ring-1 focus:ring-blue-400/50 text-white placeholder-slate-400"
      />

      {/* Room Password */}
      <label className="block text-sm mb-1 text-slate-300" htmlFor="roomPassword">
        Room Password:
      </label>
      <input
        type="password"
        placeholder="Enter room password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 mb-4 rounded-lg border border-purple-500/30 focus:outline-none focus:ring-1 focus:ring-blue-400/50 text-white placeholder-slate-400"
      />

      <button
        onClick={handleCreateRoom}
        className="w-full mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 group/button shadow-lg hover:shadow-blue-500/25 hover:shadow-xl"
      >
        Create
      </button>
    </div>
  );
};

export default CreateRoom;
