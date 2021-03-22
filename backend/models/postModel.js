const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    text:{
        type:String
    },
    image:{
        type:String
    },
    likes:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'user' 
            }
        }
    ],
    comments:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'user' 
            },
            comment:{
                type:String,
                required:true
            },
            date:{
                type:Date,
                default:Date.now
            }
        }
    ]

},{timestamps:true});


module.exports = mongoose.model('post',postSchema);