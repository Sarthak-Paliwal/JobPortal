import express from 'express';
import { register,login, updateProfile, logout } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { singleUpload, multipleUpload } from '../middlewares/multer.js';
import multer from 'multer';
const router=express.Router();

// Error handling middleware for multer
const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'File size too large. Please upload a smaller file.',
        success: false
      });
    }
  }
  if (error.message) {
    return res.status(400).json({
      message: error.message,
      success: false
    });
  }
  next(error);
};

router.route("/register").post(singleUpload, handleMulterError, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(multipleUpload, handleMulterError, isAuthenticated, updateProfile);

export default router;