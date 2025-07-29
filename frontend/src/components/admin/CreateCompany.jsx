import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_ENDPOINTS } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";

const CreateCompany = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [companyName, setCompanyName] = useState();
  
  const registerCompany = async () => {
    try {
      const res = await axios.post(`${COMPANY_API_ENDPOINTS}/register`, {name:companyName},{
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials:true
      });
      if(res?.data?.success){
        dispatch(setSingleCompany(res?.data?.company));
        toast.success(res.data.message);
        const companyId=res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <motion.div className="max-w-2xl mx-auto px-4"
      initial={{opacity:0,x:100}}
      animate={{opacity:1,x:0}}
      exit={{opacity:0,x:-100}}
      transition={{duration:0.5}}
      >
        <div className="my-6 md:my-10">
          <h1 className="font-bold text-xl md:text-2xl">Your Company Name</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Name your company, you can change it later
          </p>
        </div>
        <Label>Company Name</Label>
        <Input type={"text"} className={"my-2"} placeholder="Company Name" onChange={(e)=>setCompanyName(e.target.value)}/>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 md:gap-5 my-6 md:my-10">
          <Button
            onClick={() => navigate("/admin/companies")}
            variant={"outline"}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button onClick={registerCompany} className="w-full sm:w-auto">Continue</Button>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateCompany;
