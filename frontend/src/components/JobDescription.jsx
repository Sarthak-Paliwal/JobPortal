import React, { useEffect } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_ENDPOINTS, JOB_API_ENDPOINTS } from "@/utils/constants";
import Navbar from "./shared/Navbar";
import { toast } from "sonner";


const JobDescription = () => {
  const user = useSelector((state) => state.auth.user);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINTS}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const currJob = useSelector((state) => state.job.singleJob);
  
  // Debug: Log the application data and user data
  console.log("Current Job:", currJob);
  console.log("User ID:", user?.id);
  console.log("Applications:", currJob?.application);
  
  const isApplied =
    currJob?.application?.some(
      (app) => {
        console.log("Checking app:", app);
        console.log("App applicant:", app.applicant);
        console.log("User ID:", user?.id);
        console.log("User _id:", user?._id);
        // Check both id and _id fields
        return app.applicant?.toString() === user?.id?.toString() || 
               app.applicant?.toString() === user?._id?.toString();
      }
    ) || false;
const handleApply=async()=>{
  try {
    const res=await axios.get(`${APPLICATION_API_ENDPOINTS}/apply/${jobId}`,{
      withCredentials:true
    })
    console.log(res.data)
    if(res.data.success){
      dispatch(setSingleJob({...currJob,application:res.data.application}))
      toast.success(res.data.message);
    }
  } catch (error) {
    console.log(error)
    toast.error(error?.response?.data?.message)
  }
}
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl ">{currJob?.title}</h1>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center mt-4">
            <Badge variant="ghost" className="text-[#687FE5] font-bold">
              {currJob?.position}
            </Badge>
            <Badge variant="ghost" className="text-[#687FE5] font-bold">
              {currJob?.jobType}
            </Badge>
            <Badge variant="ghost" className="text-[#687FE5] font-bold">
              {currJob?.salary}
            </Badge>
          </div>
          <Button
            disabled={isApplied}
            onClick={isApplied ? null : handleApply}
            className={`rounded-lg ${
              isApplied
                ? "bg-gray-600 hover:bg-gray-600 cursor-not-allowed"
                : "bg-black hover:bg-black cursor-pointer"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
        <div className="my-10">
          <h1 className="border-b-2 border-b-gray-300 font-medium py-2">
            Job Description
          </h1>
          <div className="my-4">
            <h1 className="font-bold my-1">
              Role:
              <span className="pl-4 font-normal text-gray-800">
                {currJob?.title}
              </span>
            </h1>
            <h1 className="font-bold my-1">
              Location:
              <span className="pl-4 font-normal text-gray-800">
                {currJob?.location}
              </span>
            </h1>
            <h1 className="font-bold my-1">
              Description:
              <span className="pl-4 font-normal text-gray-800">
                {currJob?.description}
              </span>
            </h1>
            <h1 className="font-bold my-1">
              Requirements:
              <span className="pl-4 font-normal text-gray-800">
                {Array.isArray(currJob?.requirements)
                  ? currJob.requirements.join(", ")
                  : currJob?.requirements
                      ?.split(",")
                      .map((req, idx) => <div key={idx}>{req.trim()}</div>)}
              </span>
            </h1>
            <h1 className="font-bold my-1">
              Experience:
              <span className="pl-4 font-normal text-gray-800">
                {currJob?.experienceLevel} Years
              </span>
            </h1>
            <h1 className="font-bold my-1">
              Salary:
              <span className="pl-4 font-normal text-gray-800">
                {currJob?.salary}
              </span>
            </h1>
            <h1 className="font-bold my-1">
              Total Applicants:
              <span className="pl-4 font-normal text-gray-800">
                {currJob?.application?.length || 0}
              </span>
            </h1>
            <h1 className="font-bold my-1">
              Posted Date:
              <span className="pl-4 font-normal text-gray-800">
                {currJob?.createdAt ? currJob.createdAt.slice(0, 10) : ""}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
