import { setCompanies } from '@/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCompanies = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            console.log('Fetching companies from:', `${COMPANY_API_END_POINT}/get`);

            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (res.data && res.data.companies) {
                    dispatch(setCompanies(res.data.companies));
                } else {
                    dispatch(setCompanies([])); // Set to empty array if no companies found
                }
            } catch (error) {
                if (error.response) {
                    console.error('Error fetching companies:', error.response.data);
                    dispatch(setCompanies([])); // Clear companies on error
                } else if (error.request) {
                    console.error('No response received:', error.request);
                    dispatch(setCompanies([])); // Clear companies on no response
                } else {
                    console.error('Error:', error.message);
                }
            }
        };

        fetchCompanies();
    }, [dispatch]);
};

export default useGetAllCompanies;
