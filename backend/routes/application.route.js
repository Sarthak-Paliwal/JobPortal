import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { applyJobs, getApplication, getAppliedJobs, updateStatus } from '../controllers/application.controller.js';
const router=express.Router();
router.route("/apply/:id").get(isAuthenticated,applyJobs);
router.route("/get").get(isAuthenticated,getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated,getApplication);
router.route("/status/:id/update").post(isAuthenticated,updateStatus);

export default router;