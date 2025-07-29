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
    <div className="overflow-x-auto">
      <Table>
          <TableCaption>A list of your recent applied user</TableCaption>
          <TableHeader>
              <TableRow>
                  <TableHead className="min-w-[120px]">Full Name</TableHead>
                  <TableHead className="min-w-[180px]">Email</TableHead>
                  <TableHead className="min-w-[120px]">Contact</TableHead>
                  <TableHead className="min-w-[150px]">Resume</TableHead>
                  <TableHead className="min-w-[100px]">Date</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="text-right min-w-[80px]">Action</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
                {allApplicants && allApplicants?.map((item) => (
                    <TableRow key={item?._id}>
                      <TableCell className="font-medium">{item?.applicant?.fullName}</TableCell>
                      <TableCell className="text-sm">{item?.applicant?.email}</TableCell>
                      <TableCell className="text-sm">{item?.applicant?.phoneNumber}</TableCell>
                      <TableCell className="text-blue-600 cursor-pointer text-sm">
                        <a href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {item?.applicant?.profile?.resumeOriginalName}
                        </a>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">{item?.createdAt?.split("T")[0]}</TableCell>
                      <TableCell>
                        <Badge variant={item?.status === "accepted" ? "success" : "destructive"} className="text-xs">
                          {item?.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right cursor-pointer">
                          <Popover>
                              <PopoverTrigger><MoreHorizontal className="h-4 w-4" /></PopoverTrigger>
                              <PopoverContent className="w-32">
                                  {
                                      shortlistingStatus.map((sts, idx) => {
                                          return (
                                              <div
                                                  key={idx}
                                                  onClick={() => statusHandler(sts, item?._id)}
                                                  className="flex w-fit items-center gap-2 my-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                                                  <span className="text-sm">{sts}</span>
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
    </div>
  )
}
export default ApplicantsTable;