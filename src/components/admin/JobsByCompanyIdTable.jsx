import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';


const token = localStorage.getItem('token');
const shortlistingStatus = ["diterima", "ditolak"];
const JobsByCompanyIdTable = ({ jobs }) => {
    const [acceptedJobs, setAcceptedJobs] = useState(new Set());

    const handleAcceptJob = async (status ,jobId) => {
        try {
            const res = await axios.put(`${JOB_API_END_POINT}/${jobId}/approve`, {status}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data.success) {
                setAcceptedJobs(prev => new Set(prev).add(jobId));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(`Error accepting job: ${error}`);
        }
    };

    const handleDeleteJob = async (jobId) => {
        try {
            const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(`Error deleting job: ${error}`);
        }
    };

    return (
        <Table>
            <TableCaption>Pekerjaan berdasarkan Perusahaan</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Posisi</TableHead>
                    <TableHead>Lokasi</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Tindakan</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {jobs.map(job => (
                    <TableRow key={job._id}>
                        <TableCell>{job.title}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{job.isApproved}</TableCell>
                        <TableCell className="text-center">
                            <div className="flex items-center justify-center space-x-2">
                            <Popover>
                                        <PopoverTrigger>
                                             <MoreHorizontal />
                                        </PopoverTrigger>
                                            <PopoverContent className="w-32">
                                {!acceptedJobs.has(job._id) && (
                                    shortlistingStatus.map((status) => (
                                    <div 
                                    key={status}
                                        onClick={() => { 
                                            console.log(`Accepting job: ${job._id}`); 
                                            handleAcceptJob(status, job._id);
                                        }} 
                                        className='flex w-fit items-center my-2 cursor-pointer hover:bg-gray-100'
                                    >
                                      <span>{status}</span>
                                    </div>
                                    ))
                                )}
                                <div 
                                    onClick={(e) => { 
                                        e.stopPropagation(); 
                                        console.log(`Deleting job: ${job._id}`); 
                                        handleDeleteJob(job._id); 
                                    }} 
                                    className='flex w-fit items-center my-2 cursor-pointer hover:bg-gray-100'
                                >
                                   <span> Hapus</span>
                                </div>
                                </PopoverContent>
                                </Popover>
                                
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default JobsByCompanyIdTable;
