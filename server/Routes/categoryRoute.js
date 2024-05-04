const express = require('express');
const route = express.Router();
const CategoryDB = require('../Models/categorySchema');
const auth = require("../middlewares/auth");
const categoryAuth = require("../middlewares/categoryAuth");

route.get('/',auth,async(req,res)=>{
    try{
        let data = await CategoryDB.find({});
        let ans = data.map((val,i)=>{
            return {
                category:val["category"],id:val['_id']
        }
        });
        res.status(200).json({data:ans});
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
})

route.post('/create',auth,categoryAuth,async(req,res)=>{
    try{
        let {category} = req.body;
        if(!category){
            return res.status(403).json({message:"Enter Category"});
        }
        let isPresent = await CategoryDB.findOne({category});
        if(isPresent){
            return res.status(403).json("Category Already Created");
        }
        category=category.trim();
        const data = new CategoryDB({category});
        await data.save();
        // console.log(data);
        res.status(201).json({data:{category:data.category,id:data['_id']}});

    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
});

route.patch('/update',auth,categoryAuth,async(req,res)=>{
    try{
        let id = req.body.id;
        let category = req.body.category;

        let data = await CategoryDB.findById(id);
        if(!data){
            return res.status(400).json({message:'Record Not Found'});
        }
        await CategoryDB.findByIdAndUpdate(id,{category});
        res.status(200).json({message:"Updated"});

    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
})

module.exports = route;