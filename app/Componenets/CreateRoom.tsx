import axios from 'axios';
import {useState} from 'react';
import { Http_BackendUrl } from '../config';

const CreateRoom = ({ onClose , onRoomCreated} :  any) => {

    const [name, setname] = useState("")

 const handleCreateRoom =async() =>{
    try {
        const response = await axios.post(`${Http_BackendUrl}/room`,{
            name
        }, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`
            }
        })

        if(response.data){
            console.log("Room created successfully:", response.data);
            // alert("Room created successfully: " + response.data.slug);
            onClose(); // Close the modal after successful room creation
             onRoomCreated();
        }
    } catch (error:any) {
        console.error("Error creating room:", error);
        alert("Error creating room: " + error.message );
        // Optionally, you can handle specific error cases here
        
    }
 }



  return (
    <div className="relative bg-purple-800/10 backdrop-blur-md border border-purple-500/30 rounded-xl p-6 w-full max-w-md mx-auto text-white shadow-lg">
      <button
        onClick={onClose}
        className="absolute top-2 right-3 text-white text-xl font-bold hover:text-purple-300"
      >
        &times;
      </button>

      <h1 className="text-2xl font-semibold mb-4">Create Room</h1>

      <label className="block text-sm mb-1 text-slate-300" htmlFor="roomName">
        Room Name :
      </label>
      <input
    
        type="text"
        placeholder=""
        value={name}
        onChange={(e) => setname(e.target.value)}
        className="w-full px-4 py-2 mb-4 rounded-lg  border border-purple-500/30 focus:outline-none focus:ring-1 focus:ring-blue-400/50 text-white placeholder-slate-400"
      />

      <button onClick={()=>handleCreateRoom()}  className="w-full mt-2 bg-gradient-to-r bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 group/button shadow-lg hover:shadow-blue-500/25 hover:shadow-xl">
        Create
      </button>
    </div>
  );
};

export default CreateRoom;