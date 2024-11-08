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
        <div className="overflow-x-auto">
            <Table className="bg-white text-xs sm:text-sm">
                <TableCaption className="text-sm sm:text-base">Daftar pekerjaan anda</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-xs sm:text-sm">Nama Perusahaan</TableHead>
                        <TableHead className="text-xs sm:text-sm">Posisi</TableHead>
                        <TableHead className="text-xs sm:text-sm">Tanggal</TableHead>
                        <TableHead className="text-xs sm:text-sm text-right">Tindakan</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs?.map((job) => (
                        <TableRow key={job._id} className="cursor-pointer hover:bg-gray-100">
                            <TableCell className="py-2 px-3 text-xs sm:text-sm">{job?.company?.name}</TableCell>
                            <TableCell className="py-2 px-3 text-xs sm:text-sm">{job?.title}</TableCell>
                            <TableCell className="py-2 px-3 text-xs sm:text-sm">{job?.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right py-2 px-3">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="w-5 h-5 text-gray-600" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32 text-xs sm:text-sm">
                                        <div
                                            onClick={() => navigate(`/business/jobs/${job._id}/applicants`)}
                                            className="flex items-center gap-2 w-fit cursor-pointer mt-2 hover:bg-gray-100"
                                        >
                                            <Eye className="w-4 h-4" />
                                            <span className="text-xs sm:text-sm">Pelamar</span>
                                        </div>
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteJob(job._id);
                                            }}
                                            className="flex items-center gap-2 w-fit cursor-pointer mt-2 hover:bg-gray-100"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            <span className="text-xs sm:text-sm">Hapus</span>
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

export default BusinessJobsTable;
