const express = require("express");
const route = express.Router();
const auth = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');
const Product = require("../Models/productSchema");
const Category = require("../Models/categorySchema");
const verifyCustomer = require("../middlewares/verifyCustomer");

route.get("/customer",auth,async(req,res)=>{
    try{
        let data = await Product.find({status:{$eq:true}}).populate('categoryRef');
        let ans={};
        data.map((val)=>{
            let temp={
                product:val.product,
                price:val.price,
                discription:val.discription,
                productId:val['_id'],
                // categoryId:val.categoryRef['_id']
                // category:val.categoryRef['category']
            }
            // let arr=[];
            if(ans[val.categoryRef['category']]){
                ans[val.categoryRef['category']].push(temp);
            }else{
                ans[val.categoryRef['category']]=[];
                ans[val.categoryRef['category']].push(temp); 
            }
        })
        // console.log(ans);
        res.status(200).json({data:ans});

    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
})
route.get("/internal",auth,async(req,res)=>{
    try{
        let data = await Product.find() .sort({ createdAt: -1 }).populate('categoryRef');
        let ans = data.map((val)=>{
            return {
                product:val.product,
                price:val.price,
                discription:val.discription,
                status:val.status,
                productId:val['_id'],
                categoryId:val.categoryRef['_id'],
                category:val.categoryRef["category"]
            }
        });
        // console.log(ans);
        res.status(200).json({data:ans});
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
})
route.post("/create",auth,checkRole,async(req,res)=>{
    try{
        let {product,price,discription,categoryId,category} = req.body;
        if(!product||!price||!discription||!categoryId){
            return res.status(400).json({message:"Enter Valid Details"});
        }
        let isPresent = await Product.findOne({product})
        // console.log(isPresent);
        if(isPresent){
            return res.status(403).json({message:"Product of Same Name Exists"});
        }
        let data = new Product({product,price,discription,categoryRef:categoryId});
        await data.save();
        // console.log(data);
        res.status(201).json({data:{productId:data['_id'],product:data.product,price:data.price,discription:data.discription,status:data.status,categoryId:data.categoryRef,category:category}});

    }catch(error){
        console.log(error);
        res.sendStatus(400);
    }
})

route.patch("/update",auth,checkRole,async(req,res)=>{
    try{
        let {product,price,discription,categoryId,id} = req.body;
        let data = await Product.findByIdAndUpdate(id,{product,price,discription,categoryRef:categoryId});
        if(data){
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    }catch(error){
        console.log(error);
        res.sendStatus(400);
    }
})

route.delete("/delete/:id",auth,checkRole,async(req,res)=>{
    try{
        let id = req.params.id;
        let data = await Product.findByIdAndDelete(id);
        if(data){
            res.status(200).json({message:"Deleted Successfully"});
        }else{
            res.sendStatus(404);
        }
    }catch(error){
        console.log(error);
        res.sendStatus(400);
    }
});

route.patch('/update/status',auth,checkRole,async(req,res)=>{
    try{
        let {status,id} = req.body;
        let data = await Product.findByIdAndUpdate(id,{status});
        if(data){
            res.status(200).json({message:"Status Updated"});
        }else{
            res.sendStatus(404);
        }

    }catch(error){
        console.log(error);
        res.sendStatus(400);
    }
})
module.exports = route;