import React, { useEffect, useState } from 'react';
import Navbar from '../shared/navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import useGetAllUsers from '@/hooks/useGetAllUsers'; // Update to use the user hook
import { useDispatch } from 'react-redux';
import DataUser from './DataUser'; // Update the component for displaying users

const User = () => {
  useGetAllUsers(); // Call the hook for fetching users
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
  }, [input, dispatch]);

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <DataUser /> {/* Update to display user data */}
      </div>
    </div>
  );
}

export default User;
