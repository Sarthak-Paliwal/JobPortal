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
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-2 p-8">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Avatar className="h-20 w-20 mr-5">
              <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}  />
            </Avatar>
            <div>
              
              <h1 className="font-medium text-xl">{user?.fullName ||"Sarthak Paliwal"}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={()=>setOpen(true)} className="text-right" variant="outline">
            <PenIcon />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email || "user@gmail.com"}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber || "9090909090"}</span>
          </div>
        </div>
        <div>
          <h1>Skills</h1>
          <div className="flex items-center gap-2 my-3">
            {Array.isArray(Skills) && Skills.length != 0 ? (
              Skills.map((item, index) => (
                <Badge key={index} variant="outline">
                  {item}
                </Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="text-md font-bold">Resume</Label>
            {isResumePresent ? (
              <a
                target="blank"
                href={user?.profile?.resume}
                className="text-blue-500 w-full hover:underline cursor-pointer"
              >
                {user?.profile?.resumeOriginalName}
              </a>
              
            ) : (
              <span>NA</span>
            )
            }
            
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="text-md font-medium">Applied Jobs</h1>
        {/* Application Table */}
        <AppliedJobTable />
      </div>
        <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Profile;
