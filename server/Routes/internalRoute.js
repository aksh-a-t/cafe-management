// @ts-nocheck
const express = require('express');
const route = express.Router();
const bcrypt = require("bcryptjs");
const InternalUser = require('../Models/InternalUserSchema'); 
const auth = require('../middlewares/auth');
const jwt = require('jsonwebtoken');

route.post('/user/create',async(req,res)=>{//add middlerware to have support tool permision
    try{
        let {email,password,features} = req.body;
        if(!email||!features||!password){
            return res.status(400).json({message:'Enter Valid Details'});
        }
        let maildb = await InternalUser.findOne({email});

        if(maildb){
            return res.status(401).json({message:"Email exists"});
        }

        let salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        
        const data = new InternalUser({email,password,features});
        await data.save();
        res.status(201).json({message:"Account Created"});
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
});

route.post('/user/login',async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email||!password){
            return res.status(400).json("Enter Valid Credentials");
        }
        const user = await InternalUser.findOne({email});
        if(!user){
            return res.status(401).json({message:"Invalid Credentials"});
        }
        if(user.status==="Disable"){
            return res.status(401).json({message:"Account Disabled"});
        }
        let verify = await bcrypt.compare(password , user.password);
        if(!verify){
            return res.status(401).json({message:"Invalid Credentials"});
        }
        // @ts-ignore
        const token = jwt.sign({_id:user._id,features:[...user.features]},process.env.SECRET_ACCESS_KEY,{expiresIn:'6h'});
        return res.status(200).json({message:"successful",token});
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
})

route.get("/user/features",auth,async(req,res)=>{
    try{
        res.status(200).json({features:res.locals.userInfo.features});
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
})

route.get("/users/all",auth,async(req,res)=>{
    try{
        let users = await InternalUser.find();
        let data = users.map((val)=>{
            return {
                id:val._id,
                email:val.email,
                createdAt:val.createdAt,
                status:val.status
            }
        })
        res.status(200).json({data});
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
})

route.get("/user/:userId",auth,async(req,res)=>{
    try{
        let {userId} = req.params;
        let userData = await InternalUser.findById(userId);
        let data = {
                email:userData.email,
                status:userData.status,
                features:userData.features
            }
        res.status(200).json({data});

    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
})
route.patch("/user/:userId/update",auth,async(req,res)=>{
    try{
        let {userId} = req.params;
        let {status,features} = req.body;
        let data={status,features}
        if(req.body.password){
            data={...data,password:req.body.password}
        }
        await InternalUser.findByIdAndUpdate(userId,{...data});
        res.status(200).json({message:"Updated"});
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
})

route.delete("/user/:userId/delete",auth,async(req,res)=>{
    try{
        let {userId} = req.params;
        await InternalUser.findByIdAndDelete(userId);
        res.send(200).json({message:"Deleted"});
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})
module.exports = route