import { setAllBusinessJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const useGetAllBusinessJobs = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        const fetchAllBusinessJobs = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage');
                setIsLoggedIn(false);
                navigate('/login'); // Redirect to login if no token
                return;
            }

            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getbusinessjobs`, {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (res.data.success) {
                    dispatch(setAllBusinessJobs(res.data.jobs));
                } else {
                    console.log('Failed to fetch jobs:', res.data.message);
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.data.message === 'Token expired') {
                        toast.error('Session expired. Please log in again.');
                        setIsLoggedIn(false);
                        navigate('/login'); // Redirect to login on token expiry
                    } else {
                        console.error('Error fetching jobs:', error.response.data);
                    }
                } else if (error.request) {
                    console.error('No response received:', error.request);
                } else {
                    console.error('Error:', error.message);
                }
                console.error('Error config:', error.config);
            }
        };

        fetchAllBusinessJobs();
    }, [dispatch, navigate]);

    return isLoggedIn;
};

export default useGetAllBusinessJobs;
