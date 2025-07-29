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
    <div className="my-6 md:my-10 overflow-x-auto">
      <Table>
        <TableCaption>A List of Your Recent Registered Companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[80px]">Logo</TableHead>
            <TableHead className="min-w-[150px]">Name</TableHead>
            <TableHead className="min-w-[100px]">Date</TableHead>
            <TableHead className="text-right min-w-[80px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No Registered Company Found!
              </TableCell>
            </TableRow>
          ) : (
            filterCompany?.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={company?.logo} />
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{company?.name}</TableCell>
                <TableCell className="text-sm text-gray-500">{company?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreVertical className="h-4 w-4" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className="flex items-center w-fit cursor-pointer gap-3 hover:bg-gray-100 p-2 rounded">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
