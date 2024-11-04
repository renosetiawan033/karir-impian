import React, { useEffect, useState } from 'react';
import Navbar from '../shared/navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import JobsByCompanyIdTable from './JobsByCompanyIdTable';
import { setSearchJobByText } from '@/redux/jobSlice';
import useGetJobsByCompanyId from '@/hooks/useGetJobsByCompanyId';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

const JobsByCompanyId = () => {
    const { companyId } = useParams(); // Ensure this matches the route param
    const { jobs, isLoggedIn } = useGetJobsByCompanyId(companyId);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [input, setInput] = useState("");

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input, dispatch]);

    if (!isLoggedIn) {
        return <div>Silakan masuk untuk melihat pekerjaan.</div>;
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
            <Button
              onClick={() => navigate("/admin/company")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Kembali</span>
            </Button>
                </div>
                {jobs.length > 0 ? (
                    <JobsByCompanyIdTable jobs={jobs} />
                ) : (
                    <div>Tidak ada pekerjaan ditemukan untuk perusahaan ini.</div>
                )}
            </div>
        </div>
    );
}

export default JobsByCompanyId;
