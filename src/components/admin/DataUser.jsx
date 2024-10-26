import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../ui/button';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant'; // Ensure this is set correctly

const DataUser = () => {
    const dispatch = useDispatch(); // Move this to the top level
    const { users = [], searchUserByText = '' } = useSelector(store => store.user || {});
    const [filterUser, setFilterUser] = useState(users);

    useEffect(() => {
        const filteredUser = users.filter(user => {
            if (!searchUserByText) {
                return true;
            }
            return user?.name?.toLowerCase().includes(searchUserByText.toLowerCase());
        });
        setFilterUser(filteredUser);
    }, [users, searchUserByText]);

    const handleDeleteUser = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${USER_API_END_POINT}/delete/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                // Update users in Redux after deletion
                dispatch({ type: 'user/deleteUser', payload: userId }); // Replace with your actual action
                console.log(`Deleted user with ID: ${userId}`);
            }
        } catch (error) {
            console.error(`Error deleting user: ${error.response ? error.response.data : error.message}`);
        }
    };

    return (
        <div>
            <Table>
                <TableCaption>Daftar pengguna </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Profile</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Tanggal Bergabung</TableHead>
                        <TableHead>Peran</TableHead>
                        <TableHead className='text-center'>Tindakan</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterUser.map(user => (
                        <TableRow key={user._id} className="cursor-pointer hover:bg-gray-100">
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src={user.profile?.profilePhoto} alt={user.name} />
                                </Avatar>
                            </TableCell>
                            <TableCell>{user.fullname}</TableCell>
                            <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                                <div 
                                    onClick={(e) => { 
                                        e.stopPropagation(); 
                                        handleDeleteUser(user._id); 
                                    }} 
                                    className='flex items-center justify-center w-full p-2'>
                                    <Button variant='outline'>Hapus</Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default DataUser;
