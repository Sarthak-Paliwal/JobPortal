import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { APPLICATION_API_ENDPOINTS } from "@/utils/constants";
import { Badge } from "../ui/badge";
import axios from "axios";
import { toast } from "sonner";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { allApplicants } = useSelector(store => store.application);
  

  const statusHandler = async (status, id) => {
      try {
          const res = await axios.post(`${APPLICATION_API_ENDPOINTS}/status/${id}/update`, {status}, {
              withCredentials: true
          });
          if(res.data.success){ 
              toast.success(res.data.message);
          }
      } catch (error) {
          console.log(error);
          toast.error(error.response.data.message);
      }
  }

  return (
      <Table>
          <TableCaption>A list of your recent applied user</TableCaption>
          <TableHeader>
              <TableRow>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Resume</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
                {allApplicants && allApplicants?.map((item) => (
                    <TableRow key={item?._id}>
                      <TableCell>{item?.applicant?.fullName}</TableCell>
                      <TableCell>{item?.applicant?.email}</TableCell>
                      <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                      <TableCell className="text-blue-600 cursor-pointer"><a href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a></TableCell>
                      <TableCell>{item?.createdAt?.split("T")[0]}</TableCell>
                      <TableCell><Badge variant={item?.status === "accepted" ? "success" : "destructive"}>{item?.status}</Badge></TableCell>
                      <TableCell className="float-right cursor-pointer">
                          <Popover>
                              <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                              <PopoverContent className="w-32">
                                  {
                                      shortlistingStatus.map((sts, idx) => {
                                          return (
                                              <div
                                                  key={idx}
                                                  onClick={() => statusHandler(sts, item?._id)}
                                                  className="flex w-fit items-center gap-2 my-2 cursor-pointer">
                                                  <span>{sts}</span>
                                              </div>
                                          )
                                      })
                                  }
                              </PopoverContent>
                          </Popover>
                      </TableCell>
                      </TableRow>
              ))}
          </TableBody>
      </Table>
  )
}
export default ApplicantsTable;