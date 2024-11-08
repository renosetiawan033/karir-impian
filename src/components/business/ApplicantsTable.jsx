import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["diterima", "ditolak"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    const [loading, setLoading] = useState(false);

    const statusHandler = async (status, id) => {
        setLoading(true);
        try {
            axios.defaults.withCredentials = true;

            const token = localStorage.getItem('token'); // Ambil token dari localStorage

            const res = await axios.post(
                `${APPLICATION_API_END_POINT}/status/${id}/update`,
                { status },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="overflow-x-auto">
            <Table className="bg-white text-xs sm:text-sm">
                <TableCaption className="text-sm sm:text-base">Daftar pelamar</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-xs sm:text-sm">Nama Lengkap</TableHead>
                        <TableHead className="text-xs sm:text-sm">Email</TableHead>
                        <TableHead className="text-xs sm:text-sm">No.Telpon</TableHead>
                        <TableHead className="text-xs sm:text-sm">Tanggal</TableHead>
                        <TableHead className="text-xs sm:text-sm">Status</TableHead>
                        <TableHead className="text-xs sm:text-sm text-right">Tindakan</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants?.applications?.map((item) => (
                        <TableRow key={item._id} className="cursor-pointer hover:bg-gray-100">
                            <TableCell className="py-2 px-3 text-xs sm:text-sm">{item?.applicant?.fullname}</TableCell>
                            <TableCell className="py-2 px-3 text-xs sm:text-sm">{item?.applicant?.email}</TableCell>
                            <TableCell className="py-2 px-3 text-xs sm:text-sm">{item?.applicant?.phoneNumber}</TableCell>
                            <TableCell className="py-2 px-3 text-xs sm:text-sm">{item?.applicant.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="py-2 px-3 text-xs sm:text-sm">{item?.status}</TableCell>
                            <TableCell className="text-right py-2 px-3">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="w-5 h-5 text-gray-600" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32 text-xs sm:text-sm">
                                        {loading ? (
                                            <div className="text-center">Silakan Tunggu...</div>
                                        ) : (
                                            shortlistingStatus.map((status) => (
                                                <div
                                                    onClick={() => statusHandler(status, item?._id)}
                                                    key={status}
                                                    className="flex w-fit items-center gap-2 cursor-pointer mt-2 hover:bg-gray-100"
                                                >
                                                    <span>{status}</span>
                                                </div>
                                            ))
                                        )}
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

export default ApplicantsTable;
