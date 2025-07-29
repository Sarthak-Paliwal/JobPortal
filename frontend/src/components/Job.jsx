import { Bookmark } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import getdaysAgo from "@/utils/getdaysAgo";

const Job = ({job}) => {
  const navigate=useNavigate();
  
  return (
    <div className="p-5 rounded-md shadow-lg bg-white border-gray-200 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{job?.createdAt
    ? getdaysAgo(job.createdAt) === 0
      ? "Today"
      : `${getdaysAgo(job.createdAt)} days ago`:" "}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-3">
        <Button className="p-6" size="icon" variant="outline">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-gray-500">{job?.location}</p>
        </div>
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {job?.company?.description || "No company description available"}
        </p>
        <h1 className="font-bold text-lg mb-3">{job?.title}</h1>
        <div className="flex gap-2 items-center flex-wrap">
          <Badge variant="ghost" className="text-[#687FE5] font-bold">{job?.position}</Badge>
          <Badge variant="ghost" className="text-[#687FE5] font-bold">{job?.jobType}</Badge>
          <Badge variant="ghost" className="text-[#687FE5] font-bold">{job?.salary}</Badge>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button onClick={()=>navigate(`/description/${job?._id}`)} variant='outline' >Details</Button>
        <Button variant='outline' className="hover:bg-slate-200">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
