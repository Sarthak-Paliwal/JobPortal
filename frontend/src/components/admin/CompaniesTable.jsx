import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Edit2, MoreVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
const companies  = useSelector((store) => store.company.companies) || [];
const searchCompanybyName=useSelector((store)=>store.company.searchCompanybyName);
const navigate=useNavigate();
const [filterCompany,setFilterCompany]=useState(companies);
useEffect(()=>{
  if(companies.length>0){
    const filteredCompany = companies.filter((company)=>{
      if(!searchCompanybyName){
        return true;
    }
  return company?.name?.toLowerCase().includes(searchCompanybyName.toLowerCase())
  })
  setFilterCompany(filteredCompany);
  } else {
    setFilterCompany([]);
  }
},[companies,searchCompanybyName]);
  return (
    <div className="my-10">
      <Table>
        <TableCaption>A List of Your Recent Registered Companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany.length <= 0 ? 
            <span>No Registered Company Found!</span>
           : (
    
            <>
            {
              filterCompany?.map((company)=>{
                return (

              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company?.logo} />
                  </Avatar>
                </TableCell>
                <TableCell>{company?.name}</TableCell>
                <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreVertical />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className="flex items-center w-fit cursor-pointer gap-3">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
                )
              })
            }
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
