import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, PenIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const isResumePresent = true;

const Profile = () => {
  const [open,setOpen]=useState(false);
  const { user } = useSelector((store) => store.auth);
  useGetAppliedJobs();
  const Skills=user?.profile?.skills;
 
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-2 p-4 md:p-8 mx-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="h-16 w-16 md:h-20 md:w-20">
              <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}  />
            </Avatar>
            <div>
              <h1 className="font-medium text-lg md:text-xl">{user?.fullName ||"Sarthak Paliwal"}</h1>
              <p className="text-sm md:text-base text-gray-600">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={()=>setOpen(true)} variant="outline" size="sm" className="self-start sm:self-center">
            <PenIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail className="h-4 w-4" />
            <span className="text-sm md:text-base">{user?.email || "user@gmail.com"}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact className="h-4 w-4" />
            <span className="text-sm md:text-base">{user?.phoneNumber || "9090909090"}</span>
          </div>
        </div>
        <div>
          <h1 className="text-lg font-medium mb-3">Skills</h1>
          <div className="flex flex-wrap items-center gap-2 my-3">
            {Array.isArray(Skills) && Skills.length != 0 ? (
              Skills.map((item, index) => (
                <Badge key={index} variant="outline">
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="text-md font-bold">Resume</Label>
            {isResumePresent ? (
              <a
                target="blank"
                href={user?.profile?.resume}
                className="text-blue-500 w-full hover:underline cursor-pointer text-sm md:text-base"
              >
                {user?.profile?.resumeOriginalName}
              </a>
              
            ) : (
              <span className="text-gray-500">NA</span>
            )
            }
            
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl mx-4">
        <h1 className="text-md font-medium p-4 md:p-6">Applied Jobs</h1>
        {/* Application Table */}
        <AppliedJobTable />
      </div>
        <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Profile;
