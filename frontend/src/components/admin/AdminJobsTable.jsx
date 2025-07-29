import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Edit2, MoreVertical, Users } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
const {searchJobByName}=useSelector((store)=>store.job);
const {adminJobs}=useSelector((store)=>store.job);
const navigate=useNavigate();
const [filterJobs,setFilterJobs]=useState(adminJobs);
useEffect(()=>{
  if(adminJobs.length>0){
    const filteredJobs = adminJobs.filter((job)=>{
      if(!searchJobByName){
        return true;
    }
  return job?.title?.toLowerCase().includes(searchJobByName.toLowerCase())
  })
  setFilterJobs(filteredJobs);
  } else {
    setFilterJobs([]);
  }
},[adminJobs,searchJobByName]);
  return (
    <div className="my-10">
      <Table>
        <TableCaption>A List of Your Recent Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No Registered Job Found!
              </TableCell>
            </TableRow>
          ) : (
            filterJobs?.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreVertical />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 flex flex-col gap-2">
                      
                      <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center w-fit cursor-pointer gap-3">
                        <Users className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
