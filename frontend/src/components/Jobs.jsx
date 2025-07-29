import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Filtercard from "./Filtercard";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "@/redux/jobSlice";
import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";
import { Button } from "./ui/button";

const Jobs = () => {
  const jobsArray = useSelector((state) => state.job.allJobs);
  const searchText = useSelector((state) => state.job.searchText);
  const dispatch = useDispatch();
  const [filterJobs, setFilterJobs] = useState(jobsArray);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
      <div className="max-w-7xl mx-auto mt-5 px-4">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full justify-between"
          >
            <span className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter Jobs
            </span>
            {isFilterOpen ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* Filter Sidebar */}
          <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block w-full lg:w-56 lg:flex-shrink-0`}>
            <Filtercard />
          </div>
          
          {/* Job Cards */}
          <div className="flex-1">
            {filterJobs.length <= 0 ? (
              <div className="text-center py-8">
                <span className="text-lg font-medium text-gray-500">No jobs found</span>
              </div>
            ) : (
              <div className="h-[88vh] overflow-y-auto pb-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
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
    </div>
  );
};

export default Jobs;
