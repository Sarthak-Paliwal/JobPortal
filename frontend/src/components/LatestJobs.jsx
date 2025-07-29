import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'


const LatestJobs = () => {
  const allJobs=useSelector((state)=>state.job.allJobs);
  
  return (
    <div className='max-w-7xl mx-auto my-10 md:my-20 px-4'>
      <h1 className='text-2xl md:text-4xl font-bold text-center md:text-left'><span className='text-[#471396]'> New & Featured  </span>Job Opportunities</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
      {
        allJobs.length <= 0?<span>Jobs not Found</span>:allJobs.slice(0,6).map((job)=><LatestJobCards key={job._id} job={job}/>)
      }
      </div>
      {/* //multiple job cards display */}
     
    </div>
  )
   
}

export default LatestJobs
