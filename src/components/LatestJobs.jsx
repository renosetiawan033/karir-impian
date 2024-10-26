import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs'; // Import your hook

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);
  const isLoggedIn = useGetAllJobs(); // Check if the user is logged in
  

  return (
    <div className='max-w-7xl mx-auto my-28'>
      <h1 className='text-4xl font-bold'>Lowongan Kerja <span className='text-[#0039FF]'>Teratas</span></h1>
      <div className='grid grid-cols-3 gap-4 my-5'>
        {!isLoggedIn ? (
          <div>
            <p>Anda harus login untuk melihat lowongan kerja.</p>
          </div>
        ) : (
          Array.isArray(allJobs) && allJobs.length > 0 ? (
            allJobs.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
          ) : (
            <span>Tidak Ada Lowongan</span>
          )
        )}
      </div>
    </div>
  );
}

export default LatestJobs;
