import React, { useEffect } from 'react'
import Navbar from "../shared/Navbar";
import ApplicantsTable from './ApplicantsTable';
import { useParams } from 'react-router-dom';
import { setAllApplicants } from '@/redux/applicationSlice';
import { useSelector,useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_ENDPOINTS } from '@/utils/constants';
import axios from 'axios';

const JobApplicants = () => {
    const dispatch=useDispatch();
      const {allApplicants}=useSelector((store)=>store.application);
    const {id}=useParams();
    useEffect(() => {
      const fetchAllApplicants = async () => {
          try {
              axios.defaults.withCredentials = true;
              const res = await axios.get(`${APPLICATION_API_ENDPOINTS}/${id}/applicants`);
              if (res.data.success) {
                  dispatch(setAllApplicants(res.data.job.application));
              }
          } catch (error) {
              console.log(error);
              toast.error(error.response.data.message);
          }
      }
      fetchAllApplicants();
  }, []);
  return (
    <>
    <Navbar/>
    <div className="max-w-7xl mx-auto px-4">
        <h1 className='text-lg md:text-xl my-4 md:my-5 font-bold'>Total Applicants ({allApplicants?.length})</h1>
        <ApplicantsTable/>
    </div>
    </>
  )
}

export default JobApplicants