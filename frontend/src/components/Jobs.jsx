import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Filtercard from "./Filtercard";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "@/redux/jobSlice";
import { motion } from "framer-motion";

const Jobs = () => {
  const jobsArray = useSelector((state) => state.job.allJobs);
  const searchText = useSelector((state) => state.job.searchText);
  const dispatch = useDispatch();
  const [filterJobs, setFilterJobs] = useState(jobsArray);
  useEffect(() => {
    if (searchText) {
      const filteredJobs = jobsArray.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchText.toLowerCase()) ||
          job.description.toLowerCase().includes(searchText.toLowerCase()) ||
          job.location.toLowerCase().includes(searchText.toLowerCase()) ||
          job.salary.toString().includes(searchText)
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(jobsArray);
    }
  }, [jobsArray, searchText]);
  useEffect(() => {
    return () => {
      dispatch(setSearchText(""));
    };
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="max-20%">
            {/* filter page */}
            <Filtercard />
          </div>
          {/* job cards multiple */}
          {filterJobs.length <= 0 ? (
            <span>Job Not Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4 items-stretch">
                {filterJobs.map((item) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Job job={item} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
