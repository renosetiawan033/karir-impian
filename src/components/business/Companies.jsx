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
