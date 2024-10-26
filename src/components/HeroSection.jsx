import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery} from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query))
    navigate("/browse");
  }
  return (
    <div className='flex items-center justify-center min-h-[55vh] text-center'>
      <div className='flex flex-col gap-4'>
      <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#0039FF] font-medium'>Temukan Karir Anda</span>
        <h1 className='text-5xl font-bold'>
          Cari, terapkan & Dapatkan <br />
          Pekerjaan <span className='text-[#0039FF]'>Impian Anda</span>
        </h1>
        <p className='mx-auto max-w-xl'>
          Get Job adalah sebuah platform digital yang dirancang untuk menghubungkan pencari kerja dengan perusahaan yang menawarkan berbagai lowongan pekerjaan
        </p>

      
        <div className='flex w-[100%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
            <input 
            type='text'
            placeholder='Temukan pekerjaan impian Anda  '
            onChange={(e) => setQuery(e.target.value)}
            className='outline-none border-none w-full'
            />
            <Button onClick={searchJobHandler} className="rounded-r-full hover:bg-[#0026A3] bg-[#0039FF]">
                <Search className='h-5 w-5' />
            </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
