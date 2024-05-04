const express = require("express");
const auth = require("../middlewares/auth");
const checkRole = require("../middlewares/checkRole");
const Bill = require("../Models/billSchema");
const route = express.Router();


route.get("/",auth,checkRole,async(req,res)=>{
    try{
        let data = await Bill.find();
        let ans = data.map((val)=>{
            let temp=val.productDetails.map((op)=>{
                return{
                    price:op.price,
                    product:op.product,
                    quantity:op.quantity,
                    total:op.total
                }
            })
            return{
                customerName:val.customerName,
                contact:val.contact,
                totalAmount:val.totalAmount,
                productDetails:temp,
                billId:val['_id']
            }
        })

        // console.log(data);
        res.status(200).json({data:ans});
    }
    catch(error){
        console.log(error);
        res.sendStatus(400);
    }
})
route.post("/create",auth,checkRole,async(req,res)=>{
    try{
        let {customerName,contact,productDetails,total} = req.body;
        // console.log(productDetails);
        let ans = productDetails.map((val)=>{
            return {
                product:val.product,
                total:val.total,
                price:val.price,
                quantity:val.quantity
            }
        })
        // console.log(ans);
        let data = new Bill({customerName,contact,totalAmount:total,productDetails:ans})
        await data.save();
        res.sendStatus(201);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    } 
})

route.delete('/delete/:id',auth,checkRole,async(req,res)=>{
    try{
        // console.log("ping");
        let id = req.params.id;
        let result = await Bill.findByIdAndDelete(id);

        if(result){
            return res.status(200).json({message:"Deleted Successfully"});
        }
        res.status(404).json({message:"Internal Error"});
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
})
module.exports=route;