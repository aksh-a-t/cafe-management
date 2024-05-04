// @ts-nocheck
const Table = require("./Models/TableSchema");
const Orders = require("./Models/orderSchema");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
const otpGenerator = require('otp-generator');
const Bill = require("./Models/billSchema");

dotEnv.config({ path: "./env/.env" });

const initialise = (io)=>{
    io.use((socket,next)=>{
        try{
            if (socket.handshake.auth && socket.handshake.auth.token) {
              let token = socket.handshake.auth.token;
              jwt.verify(token, process.env.SECRET_ACCESS_KEY, function (err, decoded) {
                if (err) return next(new Error("Authentication error"));
                if(socket.handshake.auth.table){
                    socket["customerId"] = decoded["id"];
                    socket["table"] = socket.handshake.auth.table;
                    next();

                }
                else{
                    // console.log(23);
                    // console.log(decoded);
                    if(decoded.features.includes(84)){
                        next();
                    }else{
                        next(new Error("Unauthorized"));
                    }
                    // socket["internalUserId"] 
                }
              });
            } else {
              next(new Error("Authentication error"));
            }    
          }catch(error){
            console.log(error);
          }      
    })
    .on("connection",(socket)=>{
        try{
            socket.on("newJoin",async()=>{
                // console.log(socket.id);
                let data = await Table.findOne({tableName:socket.table}).populate('orderDetails.orderId')
                let orders = data.orderDetails.map((orderN)=>{
                    return orderN.map((details)=>{
                        return {
                            productId:details.orderId.productId,
                            product:details.orderId.product,
                            price:details.orderId.price,
                            category:details.orderId.category,
                            quantity:details.orderId.quantity
                        }
                    })
                })
                // console.log(orderDetails);
                // console.log(data.orderDetails[0]);
                let myInfo;
                let usersList = data.users.map((val)=>{
                    if(val._id==socket.customerId){
                        myInfo=val;
                        return{
                            name:val.Name+"(you)",
                            id:val._id
                        }
                    }else{
                        return{
                            name:val.Name,
                            id:val.id
                        }
                    }
                })
                socket.join(socket.table);
                // console.log(socket.adapter);
                // console.log(myInfo);
                // console.log(65);
                socket.to(socket.table).emit("newCustomerInfo",{name:myInfo.Name,id:myInfo._id});
                socket.emit("allTableInfo",{usersList,orders});
            })
            socket.on("confirmOrder",async(payload)=>{
                let chefTableData = payload.order.map((val)=>{
                    return{
                        ...val,
                        table:socket.table
                    }
                })
               await Orders.insertMany(chefTableData);
               let recentData = await Orders.find({table:socket.table}).sort({createdAt:-1}).limit(chefTableData.length);
               console.log(recentData);
               let filteredData = recentData.map((val)=>{
                return {
                    orderId:val._id
                }
               })
               await Table.findOneAndUpdate({tableName:socket.table},{
                $push:{
                    orderDetails:filteredData
                }
               })
                socket.to(socket.table).emit("confirmedItems",payload.order);
                socket.to("CHEF").emit("fetch_order",recentData);
            })

            
            socket.on("joinChef",async()=>{
                let orders = await Orders.find({isFullfilled:false}).sort({createdAt:1});
                socket.join("CHEF");
                socket.emit("previousOrders",orders);
            })

            socket.on("orderComplete",async(orderId)=>{
                await Orders.findByIdAndUpdate(orderId,{isFullfilled:true})
                socket.to("CHEF").emit("chefCompletedOrder",orderId);
            })

            socket.on("paymentDone",async()=>{
                io.to(socket.table).emit("gameOver");
                io.socketsLeave(socket.table);
                let orders = await Orders.find({table:socket.table});
                let result = [];
                orders.map((order)=>{
                    let index = result.findIndex((val)=>val.productId.equals(order.productId))
                    if(index === -1){
                        result.push({
                            product:order.product,
                            productId:order.productId,
                            price:order.price,
                            quantity:order.quantity,
                            category:order.category
                        });
                    }else{
                        result[index].quantity += order.quantity;
                    }
                })
                await Bill.create({tableName:socket.table,productDetails:result});
                let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets:false });
                await Table.findOneAndUpdate({tableName:socket.table},{users:[],orderDetails:[],otp})
                await Orders.deleteMany({table:socket.table});
            })

            socket.on("getTableInfo",async()=>{
                let tablesInfo = await Table.find({},{_id:1,tableName:1,otp:1});
                console.log(tablesInfo);
            })

            socket.on("leave",({room,userId})=>{
                console.log(room+" "+userId);
            })
            socket.on("disconnecting",()=>{
              socket.to(socket.table).emit("customerLeft",socket.customerId);
              console.log("Disconnecting");
            })
            socket.on("disconnect",()=>{
                console.log("Disconnect");
            })

        }catch(e){
            console.log(e);
        }

    })
}


module.exports = initialise;