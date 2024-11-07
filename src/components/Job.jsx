import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  const truncateDescription = (description, limit = 100) => {
    return description.length > limit ? description.substring(0, limit) + '...' : description;
  };

  return (
    <div className="flex flex-col h-full p-4 rounded-lg shadow-lg bg-white border border-gray-200 transition-transform transform hover:scale-105">
      
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">{daysAgoFunction(job?.createdAt) === 0 ? "Hari ini" : `${daysAgoFunction(job?.createdAt)} Hari yang lalu`}</p>
      </div>
      <div className="flex items-center gap-4 mb-2">
        <Button className="p-2" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-semibold text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>
      <div className="flex-grow">
        <h1 className="font-bold text-lg mb-1">{job?.title}</h1>
        <p className="text-base text-gray-700 min-h-[60px]">{truncateDescription(job?.description)}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-2">
        <Badge className="text-[#0039FF] font-bold" variant="ghost">{job?.position} Posisi</Badge>
        <Badge className="text-[#FF0000] font-bold" variant="ghost">{job?.jobType}</Badge>
        <Badge className="text-[#0039FF] font-bold" variant="ghost">{job?.salary}</Badge>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="ml-auto text-white bg-[#0039FF] hover:bg-[#0026A3] hover:text-white transition-colors"
        >
          Detail
        </Button>
      </div>
    </div>
  );
};

export default Job;
