const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    followers:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'user'
            }
        }
    ],
    following:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'user'
            }
        }
    ]
},{timestamps:true});


module.exports = mongoose.model('user',userSchema);