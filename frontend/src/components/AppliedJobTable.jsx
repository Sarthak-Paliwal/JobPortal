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
    <div>
      <Table>
        <TableCaption>Your applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedJobs.length === 0 && <TableRow><TableCell colSpan={4} className="text-center">No applied jobs</TableCell></TableRow>}
          
          {
          appliedJobs.map((item, index) => (
            <TableRow key={index}
            initial={{opacity:0,x:100}}
            animate={{opacity:1,x:0}}
            exit={{opacity:0,x:-100}}
            transition={{duration:0.5}}
            >
              <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
              <TableCell>{item?.job?.title}</TableCell>
              <TableCell>{item?.job?.company?.name}</TableCell>
              <TableCell className={"text-right"}>
                <Badge variant={item?.status === "accepted" ? "success" : "destructive" || "outline"}>{item?.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
