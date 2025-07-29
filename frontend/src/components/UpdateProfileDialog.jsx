import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINTS } from "@/utils/constants";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullName: user?.fullName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    resumeFile: user?.profile?.resume,
    profilePhotoFile: null,
  });
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.resumeFile) {
      formData.append("resume", input.resumeFile);
    }
    if (input.profilePhotoFile) {
      formData.append("profilePhoto", input.profilePhotoFile);
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_ENDPOINTS}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
          timeout: 120000, // 2 minutes timeout
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      if (error.code === 'ECONNABORTED') {
        toast.error("Request timeout. Please try again with a smaller file.");
      } else {
        toast.error(error?.response?.data?.message || "Failed to update profile");
      }
    } finally {
      setLoading(false);
    }
  };
  const changeResumeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, resumeFile: file });
  };
  const changeProfilePhotoHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, profilePhotoFile: file });
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="name">
                  Name
                </Label>
                <Input
                  id="name"
                  name="fullName"
                  onChange={changeEventHandler}
                  value={input.fullName}
                  className={"col-span-3"}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  onChange={changeEventHandler}
                  value={input.email}
                  className={"col-span-3"}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="phoneNumber">
                  Phone
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  onChange={changeEventHandler}
                  value={input.phoneNumber}
                  className={"col-span-3"}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="bio">
                  Bio
                </Label>
                <Input
                  id="bio"
                  value={input.bio}
                  name="bio"
                  onChange={changeEventHandler}
                  className={"col-span-3"}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="skills">
                  Skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  value={(input.skills || []).join(", ")}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      skills: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                  className={"col-span-3"}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="profilePhoto">
                  Profile
                </Label>
                <Input
                  id="profilePhoto"
                  type="file"
                  name="profilePhoto"
                  onChange={changeProfilePhotoHandler}
                  accept="image/*"
                  className={"col-span-3"}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="resume">
                  Resume
                </Label>
                <Input
                  id="resume"
                  type="file"
                  name="resume"
                  onChange={changeResumeFileHandler}
                  accept="application/pdf"
                  className={"col-span-3"}
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
