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
      <div className='max-w-7xl mx-auto my-6 md:my-10 px-4'>
        <h1 className='font-medium text-lg md:text-xl my-6 md:my-10'>Search Results ({allJobs.length})</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 items-stretch'>
          {allJobs.length === 0 && (
            <div className="col-span-full text-center py-8">
              <h1 className='text-lg font-medium text-gray-500'>No jobs found</h1>
            </div>
          )}

          {allJobs.map((item) => (
            <Job key={item._id} job={item}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Browse
