import { useNavigate } from 'react-router-dom';
import { Badge } from './ui/badge';
import React from 'react';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  const truncateDescription = (description, limit = 100) => {
    return description.length > limit ? description.substring(0, limit) + '...' : description;
  };

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className='flex flex-col h-full p-6 rounded-lg shadow-lg bg-white border border-gray-200 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl duration-300'
    >
      <div>
        <h1 className='font-semibold text-lg text-gray-800'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>{job?.location}</p>
      </div>
      <div className='flex-grow'> {/* Memastikan div ini tumbuh untuk mengisi ruang */}
        <h1 className='font-bold text-xl my-1 text-gray-900'>{job?.title}</h1>
        <p className='text-sm text-gray-600 min-h-[60px]'>{truncateDescription(job?.description)}</p> {/* Menambahkan truncate */}
      </div>
      <div className='flex flex-wrap items-center gap-2 mt-4'>
        <Badge className='text-[#0039FF] font-bold' variant='ghost'>{job?.position} Posisi</Badge>
        <Badge className='text-[#FF0000] font-bold' variant='ghost'>{job?.jobType}</Badge>
        <Badge className='text-[#0039FF] font-bold' variant='ghost'>{job?.salary}</Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
