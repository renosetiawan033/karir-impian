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
              {/* Decorative wave shape directly below the navbar */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320" 
          className="absolute top-0 left-0 w-full -z-10" // Make sure z-index is lower
        >
          <path 
            fill="#60A5FA" 
            fillOpacity="1" 
            d="M0,160L24,165.3C48,171,96,181,144,208C192,235,240,277,288,277.3C336,277,384,235,432,192C480,149,528,107,576,112C624,117,672,171,720,186.7C768,203,816,181,864,165.3C912,149,960,139,1008,154.7C1056,171,1104,213,1152,213.3C1200,213,1248,171,1296,170.7C1344,171,1392,213,1416,234.7L1440,256L1440,0L0,0Z"
          />
        </svg>
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
