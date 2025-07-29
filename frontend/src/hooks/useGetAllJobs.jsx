import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_ENDPOINTS} from '@/utils/constants'
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch=useDispatch();
    const searchText=useSelector((state)=>state.job.searchText);
    useEffect(()=>{
        const fetchAllJobs=async() =>{
            try {
                const res=await axios.get(`${JOB_API_ENDPOINTS}/get?keyword=${searchText}`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAllJobs();
    },[])
}

export default useGetAllJobs
