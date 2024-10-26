import { setAllJob } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(true); 

    useEffect(() => {
        const fetchAllJobs = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('No token found in localStorage');
                setIsLoggedIn(false); // Set login status to false
                return;
            }

            try {
                // Ambil semua pekerjaan tanpa keyword
                const res = await axios.get(`${JOB_API_END_POINT}/get`, {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (res.data.success) {
                    dispatch(setAllJob(res.data.jobs));
                } else {
                    console.log('Failed to fetch jobs:', res.data.message);
                    dispatch(setAllJob([])); // Kosongkan daftar pekerjaan jika tidak berhasil
                }
            } catch (error) {
                if (error.response) {
                    console.error('Error fetching jobs:', error.response.data);
                } else if (error.request) {
                    console.error('No response received:', error.request);
                } else {
                    console.error('Error:', error.message);
                }
                console.error('Error config:', error.config); 
            }
        };

        fetchAllJobs();
    }, []); // Kosongkan array ketergantungan agar hanya berjalan sekali saat komponen pertama kali dimuat

    return isLoggedIn; // Return the login status
}

export default useGetAllJobs;
