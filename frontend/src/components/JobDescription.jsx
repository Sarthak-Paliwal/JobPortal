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
      <div className="max-w-7xl mx-auto my-6 md:my-10 px-4 md:px-6">
        <h1 className="font-bold text-lg md:text-xl mb-4">{currJob?.title}</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2 items-center">
            <Badge variant="ghost" className="text-[#687FE5] font-bold">
              {currJob?.position} openings
            </Badge>
            <Badge variant="ghost" className="text-[#687FE5] font-bold">
              {currJob?.jobType}
            </Badge>
            <Badge variant="ghost" className="text-[#687FE5] font-bold">
              {currJob?.salary}/per month
            </Badge>
          </div>
          <Button
            disabled={isApplied}
            onClick={isApplied ? null : handleApply}
            className={`rounded-lg w-full sm:w-auto ${
              isApplied
                ? "bg-gray-600 hover:bg-gray-600 cursor-not-allowed"
                : "bg-black hover:bg-black cursor-pointer"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
        <div className="my-8 md:my-10">
          <h1 className="border-b-2 border-b-gray-300 font-medium py-2 mb-6">
            Job Description
          </h1>
          <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <h2 className="font-bold text-sm md:text-base min-w-[120px]">Role:</h2>
              <span className="pl-0 sm:pl-4 font-normal text-gray-800 text-sm md:text-base">
                {currJob?.title}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <h2 className="font-bold text-sm md:text-base min-w-[120px]">Location:</h2>
              <span className="pl-0 sm:pl-4 font-normal text-gray-800 text-sm md:text-base">
                {currJob?.location}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <h2 className="font-bold text-sm md:text-base min-w-[120px]">Experience:</h2>
              <span className="pl-0 sm:pl-4 font-normal text-gray-800 text-sm md:text-base">
                {currJob?.experienceLevel} Years
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <h2 className="font-bold text-sm md:text-base min-w-[120px]">Salary:</h2>
              <span className="pl-0 sm:pl-4 font-normal text-gray-800 text-sm md:text-base">
                {currJob?.salary}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <h2 className="font-bold text-sm md:text-base min-w-[120px]">Total Applicants:</h2>
              <span className="pl-0 sm:pl-4 font-normal text-gray-800 text-sm md:text-base">
                {currJob?.application?.length || 0}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <h2 className="font-bold text-sm md:text-base min-w-[120px]">Posted Date:</h2>
              <span className="pl-0 sm:pl-4 font-normal text-gray-800 text-sm md:text-base">
                {currJob?.createdAt ? currJob.createdAt.slice(0, 10) : ""}
              </span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold text-sm md:text-base mb-2">Description:</h2>
              <span className="font-normal text-gray-800 text-sm md:text-base">
                {currJob?.description}
              </span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold text-sm md:text-base mb-2">Requirements:</h2>
              <div className="font-normal text-gray-800 text-sm md:text-base">
                {Array.isArray(currJob?.requirements)
                  ? currJob.requirements.join(", ")
                  : currJob?.requirements
                      ?.split(",")
                      .map((req, idx) => <div key={idx} className="mb-1">{req.trim()}</div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
