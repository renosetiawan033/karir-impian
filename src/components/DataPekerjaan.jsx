import React, { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";

const DataPekerjaan = ({ jobs = [] }) => {
  const dispatch = useDispatch();
  const { singleJob } = useSelector(store => store.job);
  const user = useSelector(store => store.user);
  const navigate = useNavigate();

  const [AppliedJobs, setAppliedJobs] = useState({});

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  const applyJobHandler = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        withCredentials: true 
      });

      if (res.data.success) {
        // Update AppliedJobs state
        setAppliedJobs(prev => ({ ...prev, [jobId]: true }));
        
        const updateSingleJob = { 
          ...singleJob, 
          applications: [...(singleJob.applications || []), { applicant: user?._id }] 
        };
        
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response ? error.response.data.message : "Terjadi kesalahan yang tidak terduga.");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job._id} className="p-5 rounded-lg shadow-lg bg-white border border-gray-100 max-w-md h-full">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {daysAgoFunction(job.createdAt) === 0
                  ? "Hari ini"
                  : `${daysAgoFunction(job.createdAt)} Hari yang lalu`}
              </p>
            </div>
            <h1 className="font-bold text-lg my-2">{job.title}</h1>
            <p className="text-sm text-gray-600">{job.description}</p>
            <div className="flex items-center gap-2 mt-4">
              <Badge className="text-[#0039FF] font-bold" variant="ghost">
                {job.position} Posisi
              </Badge>
              <Badge className="text-[#FF0000] font-bold" variant="ghost">
                {job.jobType}
              </Badge>
              <Badge className="text-[#0039FF] font-bold" variant="ghost">
                {job.salary}
              </Badge>
            </div>
            <div className="flex justify-end items-center mt-4">
              <Button
                onClick={AppliedJobs[job._id] ? null : () => applyJobHandler(job._id)}
                disabled={AppliedJobs[job._id]}
                className={`rounded-lg ${AppliedJobs[job._id] ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#2563eb] hover:bg-[#1d4ed8]'}`}
              >
                {AppliedJobs[job._id] ? 'Sudah Melamar' : 'Lamar'}
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center">
          <p>No jobs found.</p>
        </div>
      )}
    </div>
  );
};

export default DataPekerjaan;
