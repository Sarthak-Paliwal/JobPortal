import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({job}) => {
  const navigate=useNavigate();
  
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className="p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer h-full flex flex-col">
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">{job?.location}</p>
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {job?.company?.description || "No company description available"}
        </p>
        <h1 className="font-bold text-lg mb-3">{job?.title}</h1>
        <div className="flex gap-2 items-center flex-wrap">
          <Badge variant="ghost" className="text-[#687FE5] font-bold">{job?.position} positions</Badge>
          <Badge variant="ghost" className="text-[#687FE5] font-bold">{job?.jobType}</Badge>
          <Badge variant="ghost" className="text-[#687FE5] font-bold">{job?.salary} per month</Badge>
        </div>
      </div>
    </div>
  );
};

export default LatestJobCards;
