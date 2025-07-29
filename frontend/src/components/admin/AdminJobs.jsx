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

      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center gap-5 justify-between">
          <Input
            className="w-fit"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/jobs/post")}>
            Post New Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
