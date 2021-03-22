const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    bio:{
        type:String
    },
    profession:{
        type:String
    },
    location:{
        type:String
    },
    company:{
        type:String
    },
    social:{
        facebook:{
            type:String
        },
        twitter:{
            type:String
        },
        linkedin:{
            type:String
        },
        instagram:{
            type:String
        }
    }
},{timestapms:true});

module.exports = mongoose.model('profile',profileSchema);