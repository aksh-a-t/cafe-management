const Table = require("../Models/TableSchema");
const verifyCustomer = async(req,res,next)=>{
    // console.log(res.locals.userInfo);
    let data = await Table.findOne({"users._id":res.locals.userInfo.id});
    if(!data){
        return res.sendStatus(401);
    }
    next();
}

module.exports = verifyCustomer;