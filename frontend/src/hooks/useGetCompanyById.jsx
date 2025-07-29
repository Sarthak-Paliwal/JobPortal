import { setSingleCompany } from '@/redux/companySlice';
import { setAllJobs } from '@/redux/jobSlice';
import { COMPANY_API_ENDPOINTS, JOB_API_ENDPOINTS} from '@/utils/constants'
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (companyId) => {
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchSingleCompany=async() =>{
            try {
                const res=await axios.get(`${COMPANY_API_ENDPOINTS}/get/${companyId}`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchSingleCompany();
    },[companyId,dispatch])
}

export default useGetCompanyById
