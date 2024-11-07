import React, { useEffect } from 'react';
import Navbar from './shared/navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchJobByText } from '@/redux/jobSlice';
import useGetJobsSearch from '@/hooks/useGetJobsSearch';

const Browse = () => {
  useGetJobsSearch();
  const { allJobs, error } = useSelector(store => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchJobByText(""));
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="relative">
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

        <div className='max-w-7xl mx-auto z-20 pt-5'> {/* Increased padding-top to 24 */}
          <h1 className='font-bold text-xl my-10'>Hasil Pencarian ({allJobs.length})</h1>
          
          {error ? (
            <p className="text-center text-lg text-red-500">Terjadi kesalahan: {error}</p>
          ) : allJobs.length === 0 ? (
            <p className="text-center text-lg text-black">Pekerjaan tidak ditemukan</p>
          ) : (
            <div className='grid grid-cols-3 gap-4'>
              {allJobs.map((job) => (
                <Job key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Browse;
