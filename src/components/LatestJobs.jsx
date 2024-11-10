import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs'; // Import your hook
import { motion } from 'framer-motion';

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);
  const isLoggedIn = useGetAllJobs(); // Check if the user is logged in

  return (
    <div className='max-w-7xl mx-auto my-28'>
      <h1 className='text-2xl md:text-4xl font-bold'>
        Lowongan Kerja <span className='text-[#0039FF]'>Teratas</span>
      </h1>
      <div className='grid md:grid-cols-3 gap-4 my-5 mx-auto '>
        {!isLoggedIn ? (
          <div>
            <p>Anda harus login untuk melihat lowongan kerja.</p>
          </div>
        ) : (
          Array.isArray(allJobs) && allJobs.length > 0 ? (
            allJobs.slice(0, 6).map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }} // Start slightly below and transparent
                animate={{ opacity: 1, y: 0 }} // Fade in and move to position
                exit={{ opacity: 0, y: 20 }} // Exit with same effect
                transition={{ duration: 0.5 }} // Duration of the animation
              >
                <LatestJobCards job={job} />
              </motion.div>
            ))
          ) : (
            <span>Tidak Ada Lowongan</span>
          )
        )}
      </div>
    </div>
  );
}

export default LatestJobs;
