import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AdminJobsTable from "./AdminJobsTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchJobByName } from "@/redux/jobSlice";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  useEffect(() => {
    dispatch(setSearchJobByName(input));
  }, [input]);
  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto my-6 md:my-10 px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between mb-6">
          <Input
            className="w-full sm:w-80"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/jobs/post")} className="w-full sm:w-auto">
            Post New Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
