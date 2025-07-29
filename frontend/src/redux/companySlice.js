import { createSlice } from "@reduxjs/toolkit";
const companySlice=createSlice({
    name:"company",
    initialState:{
        singleCompany:null,
        companies:[],
        searchCompanybyName:""
    },
    reducers:{
        setSingleCompany:(state,action)=>{
            state.singleCompany=action.payload;
        },
        setCompanies:(state,action)=>{
            state.companies=action.payload;
        },
        setSearchCompanybyName:(state,action)=>{
            state.searchCompanybyName=action.payload;
        }

    }
});
export const {setSingleCompany,setCompanies,setSearchCompanybyName } = companySlice.actions;
export default companySlice.reducer;