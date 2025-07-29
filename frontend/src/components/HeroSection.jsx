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
    <div className='text-center px-4'> 
        <div className='flex flex-col gap-3 md:gap-5 my-6 md:my-10'>
            <span className='mx-auto px-3 md:px-4 py-2 rounded-full bg-gray-100 text-[#EC8305] font-medium text-sm md:text-base'>
                The premier site for finding your next job
            </span>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold leading-tight'>
                Search, Apply & <br /> Get Your <span className='text-[#471396]'>Dream Jobs</span>
            </h1>
            <p className='text-sm md:text-base text-gray-600 max-w-2xl mx-auto'>
                Discover thousands of opportunities from top companies and take the next step in your career with ease.
            </p>
            <div className='flex w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-2 md:gap-4'>
                <input 
                placeholder='Find Your Dream Jobs'
                className='outline-none border-none w-full text-sm md:text-base py-2 md:py-3'
                onChange={(e)=>setSearch(e.target.value)}
                value={search}
                />
                <Button onClick={handleSearch} className="rounded-r-full bg-[#090040] px-3 md:px-4 py-2 md:py-3">
                    <Search className='h-4 w-4 md:h-5 md:w-5'/>
                </Button>
            </div>
        </div>
    </div>
)
}

export default HeroSection;
