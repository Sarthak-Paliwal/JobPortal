import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINTS } from "@/utils/constants";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINTS}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <div className="bg-white shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div onClick={()=>navigate("/")} className="cursor-pointer">
          <h1 className="text-xl md:text-2xl font-bold">
            Job <span className="text-[#EC8305]">Portal</span>
          </h1>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex font-medium items-center gap-5">
            {user && user?.role === "recruiter" ? (
              <>
                <Link to="/admin/companies" className="hover:text-[#EC8305] transition-colors">
                  <li>Companies</li>
                </Link>
                <Link to="/admin/jobs" className="hover:text-[#EC8305] transition-colors">
                  <li>Jobs</li>
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="hover:text-[#EC8305] transition-colors">
                  <li>Home</li>
                </Link>
                <Link to="/jobs" className="hover:text-[#EC8305] transition-colors">
                  <li>Jobs</li>
                </Link>
                <Link to="/browse" className="hover:text-[#EC8305] transition-colors">
                  <li>Browse</li>
                </Link>
              </>
            )}
          </ul>
          
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#471396] hover:bg-[#090040]" size="sm">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <div className="flex space-y-2 gap-4">
                    <Avatar>
                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto ||
                          "https://github.com/shadcn.png"
                        }
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user && user?.role === "student" ? (
                          <>{user?.profile?.bio}</>
                        ) : null}
                      </p>
                    </div>
                  </div>
                  <div className="flex my-2 flex-col text-gray-600">
                    {user && user?.role === "student" ? (
                      <div className="flex w-fit cursor-pointer gap-2 items-center">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    ) : null}
                    <div className="flex w-fit cursor-pointer gap-2 items-center">
                      <LogOut />
                      <Button variant="link" onClick={logoutHandler}>
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="h-8 w-8"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          {user && (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ml-3">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <div className="flex space-y-2 gap-4">
                    <Avatar>
                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto ||
                          "https://github.com/shadcn.png"
                        }
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user && user?.role === "student" ? (
                          <>{user?.profile?.bio}</>
                        ) : null}
                      </p>
                    </div>
                  </div>
                  <div className="flex my-2 flex-col text-gray-600">
                    {user && user?.role === "student" ? (
                      <div className="flex w-fit cursor-pointer gap-2 items-center">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    ) : null}
                    <div className="flex w-fit cursor-pointer gap-2 items-center">
                      <LogOut />
                      <Button variant="link" onClick={logoutHandler}>
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4">
          <ul className="flex flex-col space-y-4 font-medium">
            {user && user?.role === "recruiter" ? (
              <>
                <Link to="/admin/companies" className="hover:text-[#EC8305] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  <li>Companies</li>
                </Link>
                <Link to="/admin/jobs" className="hover:text-[#EC8305] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  <li>Jobs</li>
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="hover:text-[#EC8305] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  <li>Home</li>
                </Link>
                <Link to="/jobs" className="hover:text-[#EC8305] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  <li>Jobs</li>
                </Link>
                <Link to="/browse" className="hover:text-[#EC8305] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  <li>Browse</li>
                </Link>
              </>
            )}
          </ul>
          
          {!user ? (
            <div className="flex flex-col gap-2 mt-4">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="bg-[#471396] hover:bg-[#090040] w-full">
                  Signup
                </Button>
              </Link>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Navbar;
