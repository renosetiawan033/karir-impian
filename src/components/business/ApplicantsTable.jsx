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
        console.log('called');
        setLoading(true);
        try {
            axios.defaults.withCredentials = true;

            const token = localStorage.getItem('token'); // Ambil token dari localStorage

            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, 
                { status }, 
                { headers: { 'Authorization': `Bearer ${token}` } } // Tambahkan token ke header
            );

            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Table className='bg-white'>
                <TableCaption>Daftar pelamar</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama Lengkap</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>No.Telpon</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Tindakan</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants?.applications?.map((item) => (
                        <tr key={item._id}>
                            <TableCell>{item?.applicant?.fullname}</TableCell>
                            <TableCell>{item?.applicant?.email}</TableCell>
                            <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                            <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                            <TableCell>{item?.status}</TableCell>
                            <TableCell className="float-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        {loading ? (
                                            <div>Silakan Tunggu...</div>
                                        ) : (
                                            shortlistingStatus.map((status) => (
                                                <div onClick={() => statusHandler(status, item?._id)} key={status} className='flex w-fit items-center my-2 cursor-pointer'>
                                                    <span>{status}</span>
                                                </div>
                                            ))
                                        )}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </tr>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default ApplicantsTable;
