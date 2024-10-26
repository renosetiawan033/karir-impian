import { setAllJob } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useGetJobsByCompanyId = (companyId) => {
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [jobs, setJobs] = useState([]); // Initialize as an empty array

    useEffect(() => {
        const fetchJobsByCompanyId = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('No token found in localStorage');
                setIsLoggedIn(false);
                return;
            }

            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getbycompany/${companyId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (res.data.success) {
                    setJobs(res.data.jobs);
                    dispatch(setAllJob(res.data.jobs));
                } else {
                    console.log('Failed to fetch jobs:', res.data.message);
                    setJobs([]);
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        if (companyId) {
            fetchJobsByCompanyId();
        }
    }, [companyId, dispatch]);

    return { jobs, isLoggedIn };
};

export default useGetJobsByCompanyId;
