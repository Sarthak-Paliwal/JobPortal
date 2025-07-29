import { setAllApplicants } from '@/redux/applicationSlice';
import { APPLICATION_API_ENDPOINTS} from '@/utils/constants'
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllApplicants = ({jobId}) => {
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchAllApplicants=async() =>{
            try {
                const res=await axios.get(`${APPLICATION_API_ENDPOINTS}/${jobId}/applicants`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setAllApplicants(res.data.job.application || []));
                    console.log(res.data.job.application);
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAllApplicants();
    },[])
}

export default useGetAllApplicants
