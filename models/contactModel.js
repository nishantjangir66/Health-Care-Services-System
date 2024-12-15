const mongoose =require("mongoose");
const contactSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:Number,
        required:true
    },
    message:{
        type:String,
        required:true
    }
});
module.exports = mongoose.model("Contact",contactSchema);