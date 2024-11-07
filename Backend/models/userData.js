const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    userType:{
        type:String,
        required:true,
        enum:["admin","user","organizer"]
    },
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true

    },
    mail:{
        type:String,
        // required:true
    },
    phone:{
        type:Number,
        // required:true
    }

});
const users=mongoose.model('User',userSchema);
module.exports=users
