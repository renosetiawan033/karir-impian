import React, { useEffect, useState } from 'react'
import Navbar from '../shared/navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import BusinessJobsTable from './BusinessJobsTable'
import useGetAllBusinessJobs from '@/hooks/useGetAllBusinessJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const BusinessJobs = () => {
  useGetAllBusinessJobs();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  useEffect(() =>{
    dispatch(setSearchJobByText(input))
  },[input]);
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
            <Input 
            className="w-fit"
            placeholder="Berdasarkan nama, Posisi"
            onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={() => navigate("/business/jobs/create")}>Pekerjaan Baru</Button>
        </div>
        <BusinessJobsTable/>
      </div>
    </div>
  )
}

export default BusinessJobs
