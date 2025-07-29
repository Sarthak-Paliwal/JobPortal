import { createSlice } from "@reduxjs/toolkit";
const jobSlice=createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        singleJob:null,
        adminJobs:[],
        searchJobByName:"",
        appliedJobs:[],
        searchText:""       
    },
    reducers:{
        setAllJobs:(state,action)=>{
            state.allJobs=action.payload;
        },
        setSingleJob:(state,action)=>{
            state.singleJob=action.payload;
        },
        setAdminJobs:(state,action)=>{
            state.adminJobs=action.payload;
        },
        setSearchJobByName:(state,action)=>{
            state.searchJobByName=action.payload;
        },
        setAppliedJobs:(state,action)=>{
            state.appliedJobs=action.payload;
        },
        setSearchText:(state,action)=>{
            state.searchText=action.payload;
        }
    }
});
export const { setAllJobs,setSingleJob,setAdminJobs,setSearchJobByName,setAppliedJobs,setSearchText } = jobSlice.actions;
export default jobSlice.reducer;