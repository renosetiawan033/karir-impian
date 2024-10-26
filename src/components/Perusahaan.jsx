import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage } from './ui/avatar';
import Navbar from './shared/navbar';
import { Badge } from './ui/badge';
import axios from 'axios';
import { setCompanies } from '@/redux/companySlice'; // Adjust the import as needed
import { COMPANY_API_END_POINT } from '@/utils/constant'; // Ensure this constant is defined

const Perusahaan = () => {
    const dispatch = useDispatch();
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState([]);
    const [error, setError] = useState(null); // Add state for error handling

    // Fetch companies when the component mounts
    useEffect(() => {
        const fetchCompanies = async () => {
            const token = localStorage.getItem('token'); // Get token from local storage
            try {
                const response = await axios.get(`${COMPANY_API_END_POINT}/get`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in the request headers
                    },
                });
                console.log("API Response:", response.data); // Log the response
                dispatch(setCompanies(response.data.companies)); // Extract the companies array
                setError(null); // Reset error if fetch is successful
            } catch (error) {
                console.error("Error fetching companies:", error);
                setError("Data perusahaan tidak ditemukan."); // Set error message
            }
        };

        fetchCompanies();
    }, [dispatch]);

    useEffect(() => {
        const filteredCompany = Array.isArray(companies) ? companies.filter(company => {
            if (!searchCompanyByText) {
                return true; // Show all companies if no search text
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        }) : []; // Default to an empty array if companies is not an array

        console.log("Filtered Companies:", filteredCompany);
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <div>
            <Navbar />
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {error ? ( // Check for error state
                    <div className="col-span-3 text-center">
                        {error}
                    </div>
                ) : filterCompany.length === 0 ? (
                    <div className="col-span-3 text-center">
                        Data perusahaan tidak ada.
                    </div>
                ) : (   
                    filterCompany.map((company) => (
                        <div key={company._id} className="bg-white shadow-md rounded-lg p-4 flex items-center cursor-pointer hover:shadow-lg transition">
                            <Avatar className="mr-4">
                                <AvatarImage src={company.logo} alt={company.name} />
                            </Avatar>
                            <div>
                                <h2 className="text-lg font-bold ml-2">
                                    <Link to={`/description/company/${company._id}`}>{company.name}</Link>  
                                </h2>
                                <p className="text-gray-500 mb-1 ml-2">{company.location}</p>
                                <Badge className="text-[#0039FF] font-bold justify-end" variant="secondary">
                                    <Link to={`/job/${company._id}`} className="text-blue-600 hover:underline">Lowongan</Link>
                                </Badge>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Perusahaan;
