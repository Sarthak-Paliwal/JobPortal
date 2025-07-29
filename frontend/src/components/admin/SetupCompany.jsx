import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { COMPANY_API_ENDPOINTS } from "@/utils/constants";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
const SetupCompany = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  useGetCompanyById(params.id);
  const {singleCompany}=useSelector((store)=>store.company);
  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    // only append file if it exists
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.put(
        `${COMPANY_API_ENDPOINTS}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    setInput({
       name:singleCompany.name || "" ,
    description: singleCompany.description || "",
    website: singleCompany.website || "",
    location: singleCompany.location || "",
    })
  },[singleCompany]); 
  return (
    <div>
      <Navbar />
      <motion.div className="max-w-xl mx-auto my-6 md:my-10 shadow-lg p-4 md:p-6 rounded-md mx-4"
      initial={{opacity:0,x:100}}
      animate={{opacity:1,x:0}}
      exit={{opacity:0,x:-100}}
      transition={{duration:0.5}}
      >
        <form onSubmit={submitHandler}
        className="w-full"
        >
          <div className="mb-6">
            <h1 className="font-bold text-lg md:text-xl">Setup Your Company</h1>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                placeholder="Your company Name"
                className={"my-2"}
                onChange={changeHandler}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                placeholder="your company description"
                className={"my-2"}
                onChange={changeHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                placeholder="Your Company Location"
                value={input.location}
                className={"my-2"}
                onChange={changeHandler}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                placeholder="Company website Url"
                value={input.website}
                className={"my-2"}
                onChange={changeHandler}
              />
            </div>
            <div>
              <Label>Company Logo</Label>
              <Input
                type="file"
                name="file"
                accept="image/*"
                className={"my-2"}
                onChange={changeFileHandler}
              />
            </div>
          </div>
        {
            loading ? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</Button>:
            <Button type="submit" className="w-full my-4">
            Update
          </Button>
          }
        </form>
      </motion.div>
    </div>
  );
};

export default SetupCompany;
