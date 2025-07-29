
import { JOB_API_ENDPOINTS} from '@/utils/constants'
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAdminJobs } from '@/redux/jobSlice';

const useGetAllAdminJobs = () => {
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchAllAdminJobs=async() =>{
            try {
                const res=await axios.get(`${JOB_API_ENDPOINTS}/getadminjobs`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setAdminJobs(res.data.job));
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAllAdminJobs();
    },[])
}

export default useGetAllAdminJobs;
