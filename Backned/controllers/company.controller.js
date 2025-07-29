import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export const registerCompany = async (req, res) => {
  try {
    
    
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Company name   is Missing",
        success: false,
      });
    } 
    let company = await Company.findOne({ name });
    if (company) {
      return res.status(400).json({
        message: "you cant register same company again",
        success: false,
      });
    }
    company = await Company.create({
      name,
      userId:req.id
    });
    return res.status(201).json({
      message: "Company registered Successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const company = await Company.find({ userId });
    if (!company) {
      return res.status(404).json({
        message: "Company is not registered",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success:true
    })
  } catch (error) {
    console.log(error);
  }
};
export const getCompanyById = async (req, res) => {
  try {
    const companyID = req.params.id;
    const company = await Company.findById( companyID );
    if (!company) {
      return res.status(404).json({
        message: "Company is not registered",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    let fileUri;
    let cloudResponse;
    if (file) {
      fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }
    const logo=cloudResponse?.secure_url;
    const updateData = { name, description, website, location,logo };
    let company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if(!company){
        return res.status(400).json({
            message:"Company not found",
            success:false
        })
    }
    return res.status(200).json({
        message:"Company Updated Successfully",
        company,
        success:true
    });
  } catch (error) {
    console.log(error);
  }
};
