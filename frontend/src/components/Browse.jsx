import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchText } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'

const Browse = () => {
  const allJobs = useSelector((state) => state.job.allJobs);
  const dispatch=useDispatch();
  useGetAllJobs();
useEffect(()=>{
  return ()=>{
    dispatch(setSearchText(""));
  }
},[])
  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto my-10 '>
        <h1 className='font-medium text-lg my-10'>Search Results {allJobs.length}</h1>
        <div className='grid grid-cols-3 gap-5 items-stretch'>
          {allJobs.length===0 && <h1 className='text-center text-lg font-medium'>No jobs found</h1>}

        {
            allJobs.map((item)=>{
                return (
                    <Job key={item._id} job={item}/>
            )
            })
        }
        </div>
      </div>
    </div>
  )
}

export default Browse
