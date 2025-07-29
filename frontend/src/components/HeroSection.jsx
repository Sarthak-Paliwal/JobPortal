import React from 'react'
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchText } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [search,setSearch]=useState("");
    const handleSearch=()=>{
        dispatch(setSearchText(search));
        navigate("/browse");    
    }
return (
    <div className='text-center'> 
        <div className='flex flex-col gap-5 my-10'>
            <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#EC8305] font-medium'>
                The premier site for finding your next job
            </span>
            <h1 className='text-5xl font-bold'>
                Search, Apply & <br /> Get Your <span className='text-[#471396]'>Dream Jobs</span>
            </h1>
            <p className='text-sm'>
                Discover thousands of opportunities from top companies and take the next step in your career with ease.
            </p>
            <div className='flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                <input 
                placeholder='Find Your Dream Jobs'
                className='outline-none border-none w-full '
                onChange={(e)=>setSearch(e.target.value)}
                value={search}
                />
                <Button onClick={handleSearch} className="rounded-r-full bg-[#090040]">
                    <Search className='h-5 w-5  '/>
                </Button>
            </div>
        </div>
    </div>
)
}

export default HeroSection;
