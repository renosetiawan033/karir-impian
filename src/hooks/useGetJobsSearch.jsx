import { setAllJob } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetJobsSearch = () => {
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token'));
    const { searchedQuery } = useSelector(store => store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            const token = localStorage.getItem('token');
        
            if (!token) {
                console.error('No token found in localStorage');
                setIsLoggedIn(false);
                dispatch(setAllJob([])); // Kosongkan daftar pekerjaan
                return;
            }
        
            setIsLoggedIn(true); // Set login status jika token ada
        
            if (!searchedQuery) {
                dispatch(setAllJob([])); // Kosongkan daftar pekerjaan
                return;
            }
        
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
        
                console.log('API Response:', res.data);
        
                if (res.data.success) {
                    dispatch(setAllJob(res.data.jobs)); // Update pekerjaan
                } else {
                    console.log('Failed to fetch jobs:', res.data.message);
                    dispatch(setAllJob([]));
                }
            } catch (error) {
                console.error('Error fetching jobs:', error.response ? error.response.data : error.message);
                dispatch(setAllJob([])); // Kosongkan daftar pekerjaan jika ada error
            }
        };
        
        fetchAllJobs();
    }, [searchedQuery, dispatch]); // Pastikan dispatch ada dalam ketergantungan

    return isLoggedIn; // Return status login
}

export default useGetJobsSearch;
