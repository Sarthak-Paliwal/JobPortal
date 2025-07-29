import { setAppliedJobs } from '@/redux/jobSlice';
import { APPLICATION_API_ENDPOINTS} from '@/utils/constants'
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAppliedJobs = () => {
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchAppliedJobs=async() =>{
            try {
                const res=await axios.get(`${APPLICATION_API_ENDPOINTS}/get`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setAppliedJobs(res.data.application || []));
                    console.log(res.data.application);
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAppliedJobs();
    },[])
}

export default useGetAppliedJobs
