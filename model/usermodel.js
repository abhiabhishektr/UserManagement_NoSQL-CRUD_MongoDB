const mongoose=require("mongoose");

const userSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    is_admin:{
        type:Number,
        required:true
    }
}, { versionKey: false });


module.exports = mongoose.model('user',userSchema)