import React, {  useState } from "react";
import Navbar from "../shared/Navbar";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { JOB_API_ENDPOINTS } from "@/utils/constants";

import { useNavigate} from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

const PostJob = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    position: "",
    location: "",
    salary: "",
    experienceLevel: "",
    requirements: "",
    jobType: "",
    title: "",
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
   
    try {
      const res = await axios.post(`${JOB_API_ENDPOINTS}/post`, input, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const { companies } = useSelector((state) => state.company);
  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-6 md:my-10 shadow-lg p-4 md:p-6 rounded-md mx-4">
        <motion.form onSubmit={submitHandler}
        initial={{opacity:0,x:100}}
        animate={{opacity:1,x:0}}
        exit={{opacity:0,x:-100}}
        transition={{duration:0.5}}
        >
          <div className="mb-6">
            <h1 className="font-bold text-lg md:text-xl">Enter Job Details</h1>
          </div>
          <div className="flex flex-col gap-4 md:gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Job Title</Label>
                <Input
                  type="text"
                  name="title"
                  value={input.title}
                  placeholder="Enter Job Title"
                  className={"my-2"}
                  onChange={changeHandler}
                />
              </div>
              <div>
                <Label>Job Type</Label>
                <Input
                  type="text"
                  name="jobType"
                  value={input.jobType}
                  placeholder="Enter Job Type"
                  className={"my-2"}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div>
              <Label>Job Description</Label>
              <textarea
                name="description"
                value={input.description}
                placeholder="Enter detailed job description..."
                className="w-full my-2 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={6}
                onChange={changeHandler}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Salary</Label>
                <Input
                  type="text"
                  name="salary"
                  placeholder="Enter Salary"
                  value={input.salary}
                  className={"my-2"}
                  onChange={changeHandler}
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  type="text"
                  name="location"
                  placeholder="Your Company Location"
                  value={input.location}
                  className={"my-2"}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Position</Label>
                <Input
                  type="text"
                  name="position"
                  placeholder="Enter Positions"
                  value={input.position}
                  className={"my-2"}
                  onChange={changeHandler}
                />
              </div>

              <div>
                <Label>Experience</Label>
                <Input
                  type="text"
                  name="experienceLevel"
                  placeholder="Enter Experience"
                  value={input.experienceLevel}
                  className={"my-2"}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Requirements</Label>
                <Input
                  type="text"
                  name="requirements"
                  placeholder="Enter Requirements"
                  value={input.requirements}
                  className={"my-2"}
                  onChange={changeHandler}
                />
              </div>
              <div>
                <Label>Company Name</Label>
                <Select onValueChange={(value)=>setInput({...input,companyId:value})}>
                  <SelectTrigger className="my-2">
                    <SelectValue placeholder="Select Company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company._id} value={company._id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Post Job
            </Button>
          )}
        </motion.form>
      </div>
    </div>
  );
};

export default PostJob;
