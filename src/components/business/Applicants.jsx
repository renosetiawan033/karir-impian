import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { toast } from 'sonner';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                console.log("Fetching applicants for ID:", params.id); // Log the ID
                
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicant`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true
                });

                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.error("Error fetching applicants:", error); // Log the error
                toast.error("Failed to fetch applicants. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchAllApplicants();
    }, [params.id]);

   

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                {/* <h1 className='font-bold text-xl my-5'>Applicants {applicants?.applications?.length}</h1> */}
                <ApplicantsTable />
            </div>
        </div>
    );
};

export default Applicants;
