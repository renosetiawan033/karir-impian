import React, { useEffect, useState } from 'react';
import Navbar from './shared/navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const isLoggedIn = useGetAllJobs(); // Assuming this hook returns true if logged in
  const [filterJobs, setFilterJobs] = useState(allJobs)

  useEffect(() => {
    if (searchedQuery) {
        const filteredJobs = allJobs.filter((job) => {
            return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        })
        setFilterJobs(filteredJobs)
    } else {
        setFilterJobs(allJobs)
    }
}, [allJobs, searchedQuery]);


  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
          <div className='w-1/5'> {/* Adjusted width to be more appropriate */}
            <FilterCard />
          </div>
          <div className='flex-1 h-[88vh] overflow-y-auto p-5'>
            {isLoggedIn ? (
              filterJobs.length > 0 ? (
                <div className='grid grid-cols-3 gap-4'>
                  {filterJobs.map((job) => (
                    <motion.div 
                    initial={{opacity:0,x:100}}
                    animate={{opacity:1,x:0}}
                    exit={{opacity:0,x:-100}}
                    transition={{duration:0.3}}
                    key={job?._id}>
                      <Job job={job} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <span>Tidak ada lowongan</span>
              )
            ) : (
              <span>Anda belum login</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
