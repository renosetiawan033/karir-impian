import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";   
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  
  const isInitiallyApplied = singleJob?.applications?.some(applications => applications.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        headers: {
          "Authorization": `Bearer ${token}`, // Include the token in the headers
        },
        withCredentials: true 
      });
      if (res.data.success) {
        setIsApplied(true); // Update local state
        const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
        dispatch(setSingleJob(updateSingleJob)); // Update UI in real-time
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          withCredentials: true
        });
        
        console.log("Fetched job data:", res.data); // Check the entire response
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          const applied = res.data.job.applications.some(application => application.applicant === user?._id);
          setIsApplied(applied);
          console.log("Job applications:", res.data.job.applications);
        } else {
          toast.error("Failed to fetch job details.");
        }
      } catch (error) {
        console.error("Error fetching job:", error);
        toast.error(error.response?.data?.message || "An error occurred while fetching the job.");
      }
    };
    
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={'text-[#0039FF] font-bold'} variant='ghost'>{singleJob?.position} Posisi</Badge>
            <Badge className={'text-[#FF0000] font-bold'} variant='ghost'>{singleJob?.jobType}</Badge>
            <Badge className={'text-[#0039FF] font-bold'} variant='ghost'>{singleJob?.salary} MPT</Badge>
          </div>
        </div>
        <Button onClick={isApplied ? null : applyJobHandler} disabled={isApplied} className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#2563eb] hover:bg-[#1d4ed8]'}`}>
          {isApplied ? 'Sudah Melamar' : 'Lamar'}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Deskripsi Pekerjaan</h1>
      <div className="my-4">
        <h1 className="font-bold my-1">Posisi <span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span></h1>
        <h1 className="font-bold my-1">Lokasi <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span></h1>
        <h1 className="font-bold my-1">Deskripsi <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span></h1>
        <h1 className="font-bold my-1">Pengalaman <span className="pl-4 font-normal text-gray-800">{singleJob?.experienceLevel}</span></h1>
        <h1 className="font-bold my-1">Gaji <span className="pl-4 font-normal text-gray-800">{singleJob?.salary}</span></h1>
        <h1 className="font-bold my-1">Total Pelamar <span className="pl-4 font-normal text-gray-800">{singleJob?.applications.length} Orang</span></h1>
        <h1 className="font-bold my-1">Di posting tanggal <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span></h1>
      </div>
    </div>
  );
};

export default JobDescription;
