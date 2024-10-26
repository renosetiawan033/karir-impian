import React, { useEffect, useState } from 'react'
import Navbar from '../shared/navbar'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { useDispatch } from 'react-redux';
import DataCompany from './DataCompany'

const Company = () => {
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
        <DataCompany/>
      </div>
    </div>
  )
}

export default Company
