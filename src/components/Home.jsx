import React, { useEffect } from 'react'
import Navbar from './shared/navbar'
import HeroSection from './HeroSection'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetJobsSearch'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Banner from './banner'


const Home = () => {
  useGetAllJobs();
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'business') {
      navigate("/business/companies");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <HeroSection />
      <LatestJobs />
      <Banner/>
      < Footer />
    </div>
  )
}

export default Home