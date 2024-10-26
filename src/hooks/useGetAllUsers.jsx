import { setAllUser } from '@/redux/userSlice';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllUsers = () => {
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllUsers = async () => {
            const token = localStorage.getItem('token');
            console.log('Token found:', token); // Log token
            
            if (!token) {
                console.error('No token found in localStorage');
                setIsLoggedIn(false);
                setLoading(false);
                return;
            }
    
            try {
                
                const res = await axios.get(`${USER_API_END_POINT}/getalluser`, {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
    
                console.log('Response from API:', res.data); // Log seluruh respons

                // Cek apakah ada data pengguna
                if (res.data.success) {
                    if (res.data.users && res.data.users.length > 0) {
                        dispatch(setAllUser(res.data.users));
                    } else {
                        console.warn('No users found in response.');
                        dispatch(setAllUser([])); // Kosongkan jika tidak ada pengguna
                    }
                } else {
                    console.log('Failed to fetch users:', res.data.message);
                    dispatch(setAllUser([]));
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Axios error fetching users:', error.response ? error.response.data : error.message);
                } else {
                    console.error('Unexpected error fetching users:', error);
                }
                dispatch(setAllUser([])); // Kosongkan jika terjadi kesalahan
            } finally {
                setLoading(false);
                console.log('Loading finished'); // Log setelah selesai loading
            }
        };
    
        fetchAllUsers();
    }, [dispatch]);
    
    return { isLoggedIn, loading };
};

export default useGetAllUsers;
