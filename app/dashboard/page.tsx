'use client'

import { useEffect, useState } from 'react';
import RoomCard from '../Componenets/roomCard';
import axios from 'axios';
import { Http_BackendUrl } from '../config';
import Navbar from '../Componenets/Navbar';
import ProtectedRoute from '../Componenets/protectedRoutes';

const DashboardContent = () => {
  const [allRooms, setAllRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const fetchAllRooms = async () => {
    try {
      const response = await axios.get(`${Http_BackendUrl}/allRooms`, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      });

      if (response.data) {
        console.log('All rooms:', response.data.rooms);
        setAllRooms(response.data.rooms);
      }
    } catch (error) {
      console.error('Error fetching rooms: ', error);
      setErr('Error fetching rooms: ' + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRooms();
  }, []);

  if (loading) {
    return (
      <div className='bg-black min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 flex justify-center items-center'>
        <div className="w-12 h-12 border-4 border-emerald-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (err) {
    return (
      <div className='bg-black min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20'>
        <h1 className='text-red-500 text-2xl'>{err}</h1>
      </div>
    );
  }

  return (
    <div className='bg-black min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20'>
      <div className='fixed top-6 left-0 w-full z-50 flex justify-center'>
        <Navbar onRoomCreated={fetchAllRooms} />
      </div>
      <div className='pt-32'>
        <div className='flex flex-col top-6 items-center justify-center mb-11'>
          <h1 className='text-4xl font-bold text-white p-4'>CollabSketch Rooms</h1>
          <p className='text-slate-400 text-xl'>
            Join collaborative drawing rooms with your friends
          </p>
        </div>
        <div className='flex flex-wrap justify-center gap-5 p-5'>
          {allRooms.length > 0 ? (
            allRooms.map((room: any) => (
              <div key={room.id}>
                <RoomCard
                  creatorName={room.admin?.name}
                  slug={room.slug}
                  roomId={room.id}
                />
              </div>
            ))
          ) : (
            <div className='text-xl text-emerald-300'>No Rooms Here, Create New Room</div>
          )}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => (
  <ProtectedRoute>
    <DashboardContent />
  </ProtectedRoute>
);

export default Dashboard;
