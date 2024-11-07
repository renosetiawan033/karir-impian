import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage } from './ui/avatar';
import Navbar from './shared/navbar';
import { Badge } from './ui/badge';
import axios from 'axios';
import { setCompanies } from '@/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { motion } from 'framer-motion';

const Perusahaan = () => {
    const dispatch = useDispatch();
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompanies = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${COMPANY_API_END_POINT}/get`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                dispatch(setCompanies(response.data.companies));
                setError(null);
            } catch (error) {
                console.error("Error fetching companies:", error);
                setError("Data perusahaan tidak ditemukan.");
            }
        };

        fetchCompanies();
    }, [dispatch]);

    useEffect(() => {
        const filteredCompany = Array.isArray(companies) ? companies.filter(company => {
            if (!searchCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        }) : [];
        
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <div>
            <Navbar />
            <div className="relative">
                {/* Decorative wave shape above the main content */}
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

                <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-20">
                    {error ? (
                        <div className="col-span-3 text-center">
                            {error}
                        </div>
                    ) : filterCompany.length === 0 ? (
                        <div className="col-span-3 text-center">
                            Data perusahaan tidak ada
                        </div>
                    ) : (   
                        filterCompany.map((company) => (
                            <motion.div
                                key={company._id}
                                className="bg-white shadow-md rounded-lg mt-10 flex items-center cursor-pointer hover:shadow-xl transition duration-300 p-4"
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                                whileHover={{ scale: 1.05 }} // Hover effect
                            >
                                <Avatar className="mr-4" style={{ width: '60px', height: '60px' }}>
                                    <AvatarImage src={company.logo} alt={company.name} />
                                </Avatar>
                                <div className="flex-1">
                                    <h2 className="text-lg font-bold ml-2">
                                        <Link to={`/description/company/${company._id}`}>{company.name}</Link>  
                                    </h2>
                                    <p className="text-gray-500 mb-1 ml-2">{company.location}</p>
                                    <Badge className="text-[#0039FF] font-bold" variant="secondary">
                                        <Link to={`/job/${company._id}`} className="text-blue-600 hover:underline"> Lowongan</Link>
                                    </Badge>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Perusahaan;
