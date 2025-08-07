import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './utils/db.js'
import userRoute from './routes/user.route.js';
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js'
import applicationRoute from './routes/application.route.js'
import path from "path"
const app=express();
import dotenv from 'dotenv';
dotenv.config({});
//middleware
const _dirname=path.resolve();
app.use(express.json());//parsing to json
app.use(express.urlencoded({extended:true }));
app.use(cookieParser());
const corsOptions={
    origin:"http://localhost:5173",
    credentials:true,
}
app.use(cors(corsOptions));
const Port=process.env.PORT || 3000;
//api's
app.use("/user",userRoute);
app.use("/company",companyRoute);
app.use("/jobs",jobRoute);
app.use("/application",applicationRoute);
app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});
app.listen(Port,()=>{
    connectDB();
    console.log("Server running");

})