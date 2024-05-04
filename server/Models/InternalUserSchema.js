const mongoose =require('mongoose');

const InternalUserSchema = new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    features:{type:[],required:true},
    status:{type:String,default:"Active"}
},
{timestamps:true}
);

const InternalUser = mongoose.model("Internaluser",InternalUserSchema);
module.exports=InternalUser;
