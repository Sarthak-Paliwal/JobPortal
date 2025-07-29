import multer from "multer";

const storage = multer.memoryStorage();

// File size limits
const limits = {
  fileSize: 10 * 1024 * 1024, // 10MB limit
};

// File filter to validate file types
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'profilePhoto') {
    // Allow only images for profile photos
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Profile photo must be an image'), false);
    }
  } else if (file.fieldname === 'resume') {
    // Allow PDFs for resumes
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Resume must be a PDF file'), false);
    }
  } else {
    cb(null, true);
  }
};

export const singleUpload = multer({ 
  storage,
  limits,
  fileFilter
}).single("file");

export const multipleUpload = multer({ 
  storage,
  limits,
  fileFilter
}).fields([
  { name: 'resume', maxCount: 1 },
  { name: 'profilePhoto', maxCount: 1 }
]);