import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import astronautImg from '../assets/astronot.png';
import astronautImg2 from '../assets/astronot2.png';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }

  return (
    <div className='flex items-center bg-blue-400 justify-center min-h-[55vh] text-center relative'>
      <motion.img 
        src={astronautImg2} 
        alt="Left Side Image" 
        className='absolute left-0 bottom-0 w-1/4 z-10 transform translate-x-1/4 translate-y-6 ' 
        initial={{ x: -50, opacity: 0 }} // Start slightly to the left and transparent
        animate={{ x: 0, opacity: 1 }} // Move to position and fade in
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      <div className='flex flex-col gap-6 z-20'>
        <motion.span
          className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#0039FF] font-medium hover:scale-105 hover:shadow-xl duration-300'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Temukan Karir Anda
        </motion.span>

        <motion.h1
          className='text-2xl md:text-5xl font-bold'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Cari, terapkan & Dapatkan <br />
          Pekerjaan <span className='text-[#0039FF]'>Impian Anda</span>
        </motion.h1>

        <motion.p
          className='text-sm md:text-md mx-auto md:max-w-xl text-gray-700'
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

      <motion.img 
        src={astronautImg} 
        alt="Astronaut" 
        className='absolute right-0 bottom-0 z-10 w-1/4 transform -translate-x-1/4 translate-y-6' 
        initial={{ x: 50, opacity: 0 }} // Start slightly to the right and transparent
        animate={{ x: 0, opacity: 1 }} // Move to position and fade in
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {/* Animated Cloud Shape */}
      <motion.svg
        className="absolute bottom-0 z-0 left-0 w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        fill="#FFFFFF"
        initial={{ y: 20 }} // Start a bit lower
        animate={{ y: 0 }} // Animate to normal position
        transition={{ duration: 1, ease: "easeInOut" }} // Smooth animation
      >
        <path d="M0,128L30,117.3C60,107,120,85,180,90.7C240,96,300,128,360,160C420,192,480,224,540,218.7C600,213,660,171,720,138.7C780,107,840,85,900,80C960,75,1020,85,1080,90.7C1140,96,1200,96,1260,101.3C1320,107,1380,117,1410,122.7L1440,128L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320H0V128Z" />
      </motion.svg>
    </div>
  );
};

export default HeroSection;
