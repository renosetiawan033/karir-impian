import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }

  return (
    <div className='flex items-center justify-center min-h-[55vh] text-center'>
      <div className='flex flex-col gap-6'>
        <motion.span
          className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#0039FF] font-medium'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Temukan Karir Anda
        </motion.span>
        
        <motion.h1
          className='text-5xl font-bold'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Cari, terapkan & Dapatkan <br />
          Pekerjaan <span className='text-[#0039FF]'>Impian Anda</span>
        </motion.h1>

        <motion.p
          className='mx-auto max-w-xl text-gray-700'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Karir impian adalah sebuah platform digital yang dirancang untuk menghubungkan pencari kerja dengan perusahaan yang menawarkan berbagai lowongan pekerjaan.
        </motion.p>

        <div className='flex w-full shadow-lg border border-gray-200 rounded-full items-center gap-4 mx-auto bg-white'>
          <input 
            type='text'
            placeholder='Temukan pekerjaan impian Anda'
            onChange={(e) => setQuery(e.target.value)}
            className='outline-none border-none w-full px-4 py-2 rounded-l-full'
          />
          <Button 
            onClick={searchJobHandler} 
            className="rounded-r-full hover:bg-[#0026A3] bg-[#0039FF]"
          >
            <Search className='h-5 w-5 text-white' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
