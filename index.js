import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { User } from "./model/employee.js";

const port=3000;
const app = express();

app.use(express.json());
app.use(cors());

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

const db="mongodb://localhost:27017/venku";
mongoose.connect(db,{
    // useNewUrlParser:true,
    // useUnifiedTopology:true,

    }).then(()=>{
        console.log("DB Connected");
})





// post  employee details

app.post('/add-employee',async(req,res)=>{
    try{
        const {name,age,email,position}=req.body;
        const user= await User.create({name,email,position,age});
        res.status(200).json({message:"Employee Added Successfully",user});
    }catch(error){
        console.error(error.message);
        res.status(500).json({message:"Internal Server Error",error});
    }
});

 // update employee details
app.post("/update-employee",async(req,res)=>{
    try{
        const {name,age,email,position}=req.body;
        const exist=await User.findOne({email:email})
        if (exist){
            const user=await User.updateOne({name,email,position,age})
            res.status(200).json({message:"Employee Updated Successfully",user});
        }
        else{
            return res.status(404).json({message:"Employee Not Found"});
        }
        }catch(error){
            console.error(error.message);
            res.status(500).json({message:"Internal Server Error",error});
            }

});
//delete employee details
app.delete('/delete-employee',async(req,res)=>{
    try{
        const {email}=req.body;
        const exist=await User.findOne({email:email})
        if (exist){
            const user=await User.deleteOne({email:email})
            res.status(200).json({message:"Employee Deleted Successsfully",user});
        }else{
            return res.status(404).json({message:"Employee Not Found"});
        }
        }catch(error){
            console.error(error.message);
            res.status(500).json({message:"Internal Server Error",error});
            }

});

// get employee details
app.get('/get-employee',async(req,res)=>{
    try{
        const {email}=req.body;
        const user=await User.findOne({email:email})
        if(user){
            res.status(200).json({message:"Employee Found",user});
        } else{
            return res.status(404).json({message:"Employee Not Found"});
        }
        } catch(error){
            console.error(error.message);
            res.status(500).json({message:"Internal Server Error",error});
        }
})