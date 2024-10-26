import { setSingleCompany } from '@/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSingleCompany = async () => {
            setError(null); // Reset error before fetch
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(res.data.company);
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                } else {
                    throw new Error('Failed to fetch company data');
                }
            } catch (error) {
                console.log(error);
                setError(error.message || 'An error occurred');
            }
        };

        fetchSingleCompany();

        // Cleanup if necessary
        return () => {
            // Any necessary cleanup here
        };
    }, [companyId, dispatch, token]);

    return { error };
};

export default useGetCompanyById;
