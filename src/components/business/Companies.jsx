import React, { useEffect, useState } from 'react'
import Navbar from '../shared/navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { useDispatch } from 'react-redux';

const Companies = () => {
  useGetAllCompanies();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  useEffect(() =>{
    dispatch(setSearchCompanyByText(input))
  },[input]);
  return (
    <div>
      <Navbar />
        {/* Decorative wave shape directly below the navbar */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320" 
          className="absolute top-0 left-0 w-full -z-10" // Make sure z-index is lower
        >
          <path 
            fill="#60A5FA" 
            fillOpacity="1" 
            d="M0,160L24,165.3C48,171,96,181,144,208C192,235,240,277,288,277.3C336,277,384,235,432,192C480,149,528,107,576,112C624,117,672,171,720,186.7C768,203,816,181,864,165.3C912,149,960,139,1008,154.7C1056,171,1104,213,1152,213.3C1200,213,1248,171,1296,170.7C1344,171,1392,213,1416,234.7L1440,256L1440,0L0,0Z"
          />
        </svg>
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-end my-5'>
            <Button onClick={() => navigate("/business/companies/create")}>Tambah Perusahaan</Button>
        </div>
        <CompaniesTable/>
      </div>
    </div>
  )
}

export default Companies
