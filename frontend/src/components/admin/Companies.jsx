import React, { useEffect ,useState} from "react";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanybyName } from "@/redux/companySlice";


const Companies = () => {
  const dispatch=useDispatch();
  useGetAllCompanies();
  const navigate=useNavigate();
  const [searchCompany,setSearchCompany]=useState("");
useEffect(()=>{
  dispatch(setSearchCompanybyName(searchCompany));
},[searchCompany])
  return (
    <div>
      <Navbar />
      
      <div className="max-w-6xl mx-auto my-6 md:my-10 px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between mb-6">
        <Input className="w-full sm:w-80" placeholder="Filter by name" onChange={(e)=>setSearchCompany(e.target.value)}/>
        <Button onClick={()=>navigate("/admin/companies/create")} className="w-full sm:w-auto">New Company</Button>
        </div>
        <CompaniesTable/>
      </div>
    </div>
  );
};

export default Companies;
