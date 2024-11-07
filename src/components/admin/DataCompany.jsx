import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';

const shortlistingStatus = ["diterima", "ditolak"];

const DateCompany = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 
    const token = localStorage.getItem('token');

    useEffect(() => {
        const filteredCompany = companies.filter(company => {
            if (!searchCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    const handleAcceptCompany = async (status, companyId) => {
        setLoading(true);
        try {
            const res = await axios.put(`${COMPANY_API_END_POINT}/${companyId}/approve`, { status }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data.success) {
                toast.success(res.data.message);
                // Update the company list or fetch it again
                // You might want to refresh or refetch the companies here
            }
        } catch (error) {
            console.error(`Error accepting company: ${error}`);
            toast.error(error.response?.data?.message || 'An error occurred while accepting the company.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleDeleteCompany = async (companyId) => {
        try {
            const response = await axios.delete(`${COMPANY_API_END_POINT}/delete/${companyId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.success) {
                toast.success(response.data.message);
                // Optionally refresh the company list here
            }
        } catch (error) {
            console.error(`Error deleting company: ${error}`);
            toast.error(error.response?.data?.message || 'An error occurred while deleting the company.');
        }
    };

    return (
        <div>
            <Table className='bg-white'>
                <TableCaption>Daftar perusahaan</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Tindakan</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                Data perusahaan tidak ada.
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterCompany.map((company) => (
                            <TableRow key={company._id} className="cursor-pointer hover:bg-gray-100">
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo} alt={company.name} />
                                    </Avatar>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/admin/alljob/${company._id}`}>
                                        {company.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{new Date(company.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>{company.isApproved}</TableCell>
                                <TableCell className="text-center">
                                    <div className="flex items-center justify-center space-x-2">
                                        <Popover>
                                        <PopoverTrigger>
                                             <MoreHorizontal />
                                        </PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                {loading ? (
                                                    <div>Silakan Tunggu...</div>
                                                ) : (
                                                    shortlistingStatus.map((status) => (
                                                        <div
                                                            key={status}
                                                            onClick={() => handleAcceptCompany(status, company._id)}
                                                            className='flex w-fit items-center my-2 cursor-pointer hover:bg-gray-100'
                                                        >
                                                            <span>{status}</span>
                                                        </div>
                                                    ))
                                                )}
                                                            <div
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteCompany(company._id);
                                                        }}
                                                        className='flex w-fit items-center my-2 cursor-pointer hover:bg-gray-100'
                                                    >
                                                        Hapus
                                                    </div>
                                            </PopoverContent>
                                        </Popover>
                                       
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default DateCompany;
