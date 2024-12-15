const mongoose =require("mongoose");
const appointmentSchema = mongoose.Schema({
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
    address:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    timeSlot:{
        type:String,
        required:true
    },
    service:{
        type:String,
        required:true
    },
    doctor:{
        type:String,
        required:true
    },
    status: {
        type: String,
        default: 'pending'
      },
      payment:{
        type:String,
        required:true
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Health"
      }
    
});
module.exports = mongoose.model("Appointment",appointmentSchema);