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
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      
      <div className='relative'>
        {/* Decorative wave shape above the main content, facing downward */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320" 
          className="absolute top-0 left-0 w-full -z-10" // Place SVG behind other content
        >
          <path 
            fill="#60A5FA" 
            fillOpacity="1" 
            d="M0,160L24,165.3C48,171,96,181,144,208C192,235,240,277,288,277.3C336,277,384,235,432,192C480,149,528,107,576,112C624,117,672,171,720,186.7C768,203,816,181,864,165.3C912,149,960,139,1008,154.7C1056,171,1104,213,1152,213.3C1200,213,1248,171,1296,170.7C1344,171,1392,213,1416,234.7L1440,256L1440,0L0,0Z"
          />
        </svg>

        <div className='max-w-full mx-auto pt-20 z-20'> {/* Set z-10 to bring content above SVG */}
          <div className='flex gap-5 mx-auto max-w-7xl'>
            <div className='w-1/5'>
              <FilterCard />
            </div>
            <div className='flex-1 h-[88vh] overflow-y-auto p-5'>
              {isLoggedIn ? (
                filterJobs.length > 0 ? (
                  <div className='grid grid-cols-3 gap-4'>
                    {filterJobs.map((job) => (
                      <motion.div 
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                        key={job?._id}
                      >
                        <Job job={job} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <span>Tidak ada lowongan</span>
                )
              ) : (
                <span >Anda belum login</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
