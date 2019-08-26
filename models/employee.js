var mongoose=require("mongoose");

var employeeSchema=new mongoose.Schema({
    name:String,
    image:String,
    PhoneNumber:Number,
    Location:String,
    position:String,
    age:Number,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
});
 
 module.exports =mongoose.model("employee",employeeSchema);