const Table = require("../Models/TableSchema");
const tableCheck = async(req,res,next) =>{
    try{
        const {table} = req.params;
        let isValid = await Table.findOne({tableName:table});
        console.log(isValid);
        if(isValid){
            next();
        }else{
            res.sendStatus(404);
        }
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}
module.exports = tableCheck;