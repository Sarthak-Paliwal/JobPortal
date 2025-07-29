import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_ENDPOINTS } from "@/utils/constants.js";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {loading}=useSelector(store=>store.auth);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
   
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
       dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINTS}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if(res.data.success){
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }finally{
      dispatch(setLoading(false));
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center mx-auto justify-center max-w-7xl">
        <motion.form
          onSubmit={submitHandler}
          className="w-[85%] lg:w-1/2 shadow-lg rounded-md p-4 my-10"
          initial={{opacity:0,x:100}}
          animate={{opacity:1,x:0}}
          exit={{opacity:0,x:-100}}
          transition={{duration:0.5}}
        >
          <h1 className="text-xl mb-5 font-bold">Sign Up</h1>
          <div>
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Sarthak Paliwal"
              value={input.fullName}
              name="fullName"
              onChange={changeEventHandler}
              className="my-2"
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="sarthak@gmail.com"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              className="my-2"
            />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input
              type="text"
              placeholder="Sarthak Paliwal"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              className="my-2"
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="hello@123"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              className="my-2"
            />
          </div>
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                className="cursor-pointer my-2"
                onChange={changeFileHandler}
              />
            </div>
            <RadioGroup
              defaultValue="student"
              className="flex items-center my-2"
            >
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer "
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading ?<Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/></Button>: <Button type="submit" className="w-full my-4">
            Signup
          </Button>
          }
         
          <span className="text-sm">
            Already have an account?{" "}
            <Link className="text-red-500 " to="/login">
              Login
            </Link>
          </span>
        </motion.form>
      </div>
    </div>
  );
};

export default Signup;
