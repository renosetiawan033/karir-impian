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
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {error ? (
                    <div className="col-span-3 text-center">
                        {error}
                    </div>
                ) : filterCompany.length === 0 ? (
                    <div className="col-span-3 text-center">
                        Data perusahaan tidak ada.
                    </div>
                ) : (   
                    filterCompany.map((company) => (
                        <motion.div
                            key={company._id}
                            className="bg-white shadow-md rounded-lg  flex items-center cursor-pointer hover:shadow-xl transition duration-300 p-4"
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
    );
}

export default Perusahaan;
