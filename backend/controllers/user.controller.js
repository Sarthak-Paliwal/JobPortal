import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is Missing",
        success: false,
      });
    }
    const file = req.file;
    let fileUri;
    let cloudResponse;
    if (file) {
      fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });
    return res.status(201).json({
      message: "Account created Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is Missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect Email or Password",
        success: false,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Incorrect Email or Password",
        success: false,
      });
    }
    //check role is correct or not
    if (role != user.role) {
      return res.status(400).json({
        message: "Account does not exist with current role",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "Lax",
      })
      .json({
        message: `Welcome back ${user.fullName}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged Out Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const resumeFile = req.files?.resume?.[0];
    const profilePhotoFile = req.files?.profilePhoto?.[0];
    
    // Validate file sizes (5MB limit for images, 10MB for PDFs)
    if (profilePhotoFile && profilePhotoFile.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        message: "Profile photo size should be less than 5MB",
        success: false,
      });
    }
    
    if (resumeFile && resumeFile.size > 10 * 1024 * 1024) {
      return res.status(400).json({
        message: "Resume size should be less than 10MB",
        success: false,
      });
    }
    
    //cloudinary for resume file
    let resumeFileUri;
    let resumeCloudResponse;
    if (resumeFile) {
      try {
        resumeFileUri = getDataUri(resumeFile);
        resumeCloudResponse = await cloudinary.uploader.upload(resumeFileUri.content, {
          timeout: 60000, // 60 seconds timeout
          resource_type: "auto"
        });
      } catch (uploadError) {
        
        return res.status(500).json({
          message: "Failed to upload resume",
          success: false,
        });
      }
    }
    
    //cloudinary for profile photo file
    let profilePhotoFileUri;
    let profilePhotoCloudResponse;
    if (profilePhotoFile) {
      try {
        profilePhotoFileUri = getDataUri(profilePhotoFile);
        profilePhotoCloudResponse = await cloudinary.uploader.upload(profilePhotoFileUri.content, {
          timeout: 60000, // 60 seconds timeout
          resource_type: "auto",
          transformation: [
            { width: 400, height: 400, crop: "fill" }
          ]
        });
      } catch (uploadError) {
        return res.status(500).json({
          message: "Failed to upload profile photo",
          success: false,
        });
      }
    }
    
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User does not Exist",
        success: false,
      });
    }
    //updating data
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;
    
    // Handle resume upload
    if (resumeCloudResponse) {
      user.profile.resume = resumeCloudResponse.secure_url;
      user.profile.resumeOriginalName = resumeFile.originalname;
    }
    
    // Handle profile photo upload
    if (profilePhotoCloudResponse) {
      user.profile.profilePhoto = profilePhotoCloudResponse.secure_url;
    }

    await user.save();
    user = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile Updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
