import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import { motion as Motion } from "framer-motion";

const AppliedJobTable = () => {
  const {appliedJobs}=useSelector((store)=>store.job);
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>Your applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[100px]">Date</TableHead>
            <TableHead className="min-w-[150px]">Job Role</TableHead>
            <TableHead className="min-w-[120px]">Company</TableHead>
            <TableHead className="text-right min-w-[100px]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(!appliedJobs || appliedJobs.length === 0) && (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No applied jobs
              </TableCell>
            </TableRow>
          )}
          
          {
          appliedJobs?.map((item, index) => (
            <TableRow key={index}
            initial={{opacity:0,x:100}}
            animate={{opacity:1,x:0}}
            exit={{opacity:0,x:-100}}
            transition={{duration:0.5}}
            >
              <TableCell className="text-sm text-gray-500">{item?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="font-medium">{item?.job?.title}</TableCell>
              <TableCell className="text-sm">{item?.job?.company?.name}</TableCell>
              <TableCell className={"text-right"}>
                <Badge variant={item?.status === "accepted" ? "success" : "destructive" || "outline"} className="text-xs">
                  {item?.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
