const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');
const Table = require('../Models/TableSchema');
const tableCheck = require('../middlewares/checkTable');
const otpGenerator = require('otp-generator');

route.get('/:table/check',tableCheck,async(req,res)=>{
    res.sendStatus(200);
})
route.post('/:table/customer/add',async(req,res)=>{
    try{
        const {name,contact,otp} = req.body;
        const {table} = req.params;
        if(!name||!contact||!otp){
            return res.status(400).json("Enter All Details");
        }

        let tableInfo = await Table.findOne({tableName:table});

        if(!tableInfo){
            return res.sendStatus(404);
        }
        if(otp != tableInfo.otp){
            return res.status(401).json({message:"Invalid OTP"});
        }
        let isDuplicate = tableInfo.users.filter((val)=>val.Name==name&&val.Contact==contact);
        // console.log(isDuplicate);
        if(isDuplicate.length>0){
            return res.status(401).json({message:"Name and Contact already present"});
        }
        let updatedTableInfo = await Table.findOneAndUpdate({tableName:table},{
            $push:{
                users:{
                    Name:name,
                    Contact:contact
                }
            }
        },{returnDocument:'after'})
        let newUser = updatedTableInfo.users.find((val)=>val.Name==name&&val.Contact==contact);
        // console.log("KO");
        // console.log(newUser);
        // @ts-ignore
        const token = jwt.sign({id:newUser._id},process.env.SECRET_ACCESS_KEY,{expiresIn:'6h'});
        res.status(200).json({token,userData:{name:newUser.Name,id:newUser._id}});

    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
})

route.post('/create',async(req,res)=>{
    try{
        let {table} = req.body;
        let isDuplicate = await Table.findOne({tableName:table});
        if(isDuplicate){
            return res.status(401).json({message:"Table Name already in use. "})
        }

        let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets:false });
        await Table.create({tableName:table,otp});
        
        res.status(200).json({message:"Table Created"});

    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
})
route.get('/token',auth,(req,res)=>{
    res.sendStatus(200);
})

module.exports = route;