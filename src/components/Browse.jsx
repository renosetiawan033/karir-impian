import React, { useEffect } from 'react';
import Navbar from './shared/navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchJobByText } from '@/redux/jobSlice';
import useGetJobsSearch from '@/hooks/useGetJobsSearch';

const Browse = () => {
  useGetJobsSearch();
  const { allJobs, error } = useSelector(store => store.job); // Asumsikan error ditambahkan ke Redux store
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchJobByText(""));
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-xl my-10'>Hasil Pencarian ({allJobs.length})</h1>
        
        {error ? (
          <p className="text-center text-lg text-red-500">Terjadi kesalahan: {error}</p> // Tampilkan pesan kesalahan
        ) : allJobs.length === 0 ? (
          <p className="text-center text-lg text-gray-500">Pekerjaan tidak ditemukan</p>
        ) : (
          <div className='grid grid-cols-3 gap-4'>
            {allJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Browse;
