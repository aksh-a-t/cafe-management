const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
    tableName: {type:String,required:true},
    otp:{type:Number,required:true},
    users:[{
        Name:{type:String},
        Contact:{type:String}
    }],
    orderDetails:[[{
        _id:false,
        orderId:{type:mongoose.Schema.Types.ObjectId,ref:"Order"},
    }
    ]]
},{timestamps:true})

// productId:{type:mongoose.Schema.Types.ObjectId,ref:"Product"},
const Table = mongoose.model('Table',TableSchema);
module.exports=Table;