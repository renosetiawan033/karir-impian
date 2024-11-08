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
                // Optionally refresh or update the company list here
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
        <div className="overflow-x-auto px-4">
            <Table className="bg-white text-xs sm:text-sm">
                <TableCaption>Daftar perusahaan</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-xs sm:text-sm">Logo</TableHead>
                        <TableHead className="text-xs sm:text-sm">Nama</TableHead>
                        <TableHead className="text-xs sm:text-sm">Tanggal</TableHead>
                        <TableHead className="text-xs sm:text-sm">Status</TableHead>
                        <TableHead className="text-xs sm:text-sm text-center">Tindakan</TableHead>
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
                                <TableCell className="py-2 px-3">
                                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                                        <AvatarImage src={company.logo} alt={company.name} />
                                    </Avatar>
                                </TableCell>
                                <TableCell className="text-xs sm:text-sm">
                                    <Link to={`/admin/alljob/${company._id}`} className="truncate">{company.name}</Link>
                                </TableCell>
                                <TableCell className="text-xs sm:text-sm">{new Date(company.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="text-xs sm:text-sm">{company.isApproved}</TableCell>
                                <TableCell className="text-center">
                                    <div className="flex items-center justify-center space-x-1">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal className="cursor-pointer text-sm" />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                {loading ? (
                                                    <div>Silakan Tunggu...</div>
                                                ) : (
                                                    shortlistingStatus.map((status) => (
                                                        <div
                                                            key={status}
                                                            onClick={() => handleAcceptCompany(status, company._id)}
                                                            className="flex w-fit items-center my-2 cursor-pointer hover:bg-gray-100 text-xs sm:text-sm"
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
                                                    className="flex w-fit items-center my-2 cursor-pointer hover:bg-gray-100 text-xs sm:text-sm"
                                                >
                                                    <span>Hapus</span>
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
};

export default DateCompany;
