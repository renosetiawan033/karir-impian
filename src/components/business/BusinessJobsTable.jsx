import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';


const token = localStorage.getItem('token');
const BusinessJobsTable = () => {
    const { allBusinessJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allBusinessJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allBusinessJobs.filter((job) => {
            if (!searchJobByText) return true;
            const searchTerm = searchJobByText.toLowerCase();
            return job?.title?.toLowerCase().includes(searchTerm) || job?.company?.name.toLowerCase().includes(searchTerm);
        });
        setFilterJobs(filteredJobs);
    }, [allBusinessJobs, searchJobByText]);

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
        <div>
            <Table className='bg-white'>
                <TableCaption>Daftar pekerjaan anda</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama Perusahaan</TableHead>
                        <TableHead>Posisi</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead className="text-right">Tindakan</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs?.map((job) => (
                        <tr key={job._id}> {/* Add key here */}
                            <TableCell>{job?.company?.name}</TableCell>
                            <TableCell>{job?.title}</TableCell>
                            <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        <div onClick={() => navigate(`/business/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                            <Eye className='w-4'/>
                                            <span>Pelamar</span>
                                        </div>
                                        <div onClick={(e) => { 
                                        e.stopPropagation(); 
                                        console.log(`Deleting job: ${job._id}`); 
                                        handleDeleteJob(job._id); 
                                    }} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                        <Trash2  className='w-4'/>
                                     <span>Hapus</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </tr>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default BusinessJobsTable;
