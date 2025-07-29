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
import { setLoading, setUser } from "@/redux/authSlice";
import store from "@/redux/store";
import { Loader2 } from "lucide-react";
import { motion} from "framer-motion";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role:""
  });
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {loading} =useSelector(store=>store.auth);
  const changeEventHandler = async (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const onSubmit=async (e)=>{
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINTS}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if(res.data.success){
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }

    } catch (error) {
      console.log(error);
    } finally{
      dispatch(setLoading(false));
    }
    
  }
  return (
    <div>
      <Navbar />
      <div className="flex items-center mx-auto justify-center max-w-7xl">
        <motion.form
          onSubmit={onSubmit}
          className="w-[85%] lg:w-1/2 shadow-lg rounded-md p-4 my-10"
          initial={{opacity:0,x:100}}
          animate={{opacity:1,x:0}}
          exit={{opacity:0,x:-100}}
          transition={{duration:0.5}}
        >
          <h1 className="text-xl mb-5 font-bold">Login</h1>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="sarthak@gmail.com"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="my-2"
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input type="password" placeholder="hello@123"  name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="my-2"
              />
          </div>
          <div className="flex items-center justify-between ">
            <RadioGroup
              defaultValue="student"
              className="flex items-center gap-4 my-5"
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
            loading ? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</Button>:
            <Button type="submit" className="w-full my-4">
            Login
          </Button>
          }
          
          <span className="text-sm">
            Don't have an account?{" "}
            <Link className="text-red-500 " to="/signup">
              Sign up
            </Link>
          </span>
        </motion.form>
      </div>
    </div>
  );
};

export default Login;
