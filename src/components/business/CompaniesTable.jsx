import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

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
        <div className="overflow-x-auto">
            <Table className="bg-white text-xs sm:text-sm">
                <TableCaption>Daftar perusahaan Anda</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-xs sm:text-sm">Logo</TableHead>
                        <TableHead className="text-xs sm:text-sm">Nama</TableHead>
                        <TableHead className="text-xs sm:text-sm">Tanggal</TableHead>
                        <TableHead className="text-xs sm:text-sm text-right">Tindakan</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany?.map((company) => (
                        <TableRow key={company._id} className="cursor-pointer hover:bg-gray-100">
                            <TableCell className="py-2 px-3">
                                <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                                    <AvatarImage src={company.logo} alt={company.name} />
                                </Avatar>
                            </TableCell>
                            <TableCell className="text-xs sm:text-sm">{company.name}</TableCell>
                            <TableCell className="text-xs sm:text-sm">{company.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right py-2">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="w-5 h-5 text-gray-600" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32 text-xs sm:text-sm">
                                        <div
                                            onClick={() => navigate(`/business/companies/${company._id}`)}
                                            className="flex items-center gap-2 w-fit cursor-pointer hover:bg-gray-100"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                            <span>Perbarui</span>
                                        </div>
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteCompany(company._id);
                                            }}
                                            className="flex items-center gap-2 w-fit cursor-pointer mt-2 hover:bg-gray-100"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            <span>Hapus</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CompaniesTable;
