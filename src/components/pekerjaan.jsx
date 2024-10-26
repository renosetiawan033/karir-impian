import React, { useEffect, useState } from 'react';
import Navbar from './shared/navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DataPekerjaan from './DataPekerjaan';
import { setSearchJobByText } from '@/redux/jobSlice';
import useGetJobsByCompanyId from '@/hooks/useGetJobsByCompanyId';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

const Pekerjaan = () => {
    const { companyId } = useParams(); // Ensure this matches the route param
    const { jobs, isLoggedIn } = useGetJobsByCompanyId(companyId);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [input, setInput] = useState("");
    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input, dispatch]);

    if (!isLoggedIn) {
        return <div>Please log in to see the jobs.</div>;
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
            <Button
              onClick={() => navigate("/perusahaan")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Kembali</span>
            </Button>
                </div>
                {jobs.length > 0 ? (
                    <DataPekerjaan jobs={jobs} />
                ) : (
                    <div>No jobs found for this company.</div>
                )}
            </div>
        </div>
    );
}

export default Pekerjaan;
