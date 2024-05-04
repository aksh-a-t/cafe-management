// @ts-nocheck
const express = require('express');
const app = express();
const cors = require('cors');
const PORT=5000//||process.env.PORT;
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const tableCheck = require('./middlewares/checkTable');
const { createServer } = require("http");
const { Server } = require("socket.io");
const initialise = require("./socketServer");
const httpServer = createServer(app);
const io = new Server(httpServer, { 
  cors: {
    origin: "*"
  },

});

initialise(io);
dotenv.config({path:'./env/.env'});

app.use(express.json());
app.use(cors());
app.use('/api/table',require('./Routes/tableRoute'));
app.use('/api/category',require("./Routes/categoryRoute"));
app.use('/api/product',require('./Routes/productRoute'));
// app.use('/api/bill',require('./Routes/billRoute'));
app.use('/api/internal',require('./Routes/internalRoute'));

app.get("/host",(req,res)=>{
  res.writeHead(301,{Location:"http://www.google.com"});
  return res.end();
})

app.get("/api/data",async(req,res)=>{
  res.status(200).json({name:"akshat"});
  // try{
  //   let token = req.headers['authorization']?.split(" ")[1];
  //   // @ts-ignore
  //   let verify = jwt.verify(token,process.env.SECRET_ACCESS_KEY);
  //   if(verify)
  //   res.sendStatus(200);
  //   res.sendStatus(401);
  // }
  // catch(error){
  //   res.sendStatus(401);
  // }

})
connection().catch(err => console.log(err));

async function connection() {
  // @ts-ignore
  await mongoose.connect(process.env.MONGO_DB_URL);
  console.log("DataBase Connected..");
}

httpServer.listen(PORT,()=>{
    console.log('Server Running...');
})