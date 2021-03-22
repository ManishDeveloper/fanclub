const mongoose = require("mongoose");
require("dotenv").config();


mongoose.connect(process.env.MONGO_URI,{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then((conn)=>console.log(`Db connected on ${conn.connection.host}`))
.catch(err=>console.log(err));