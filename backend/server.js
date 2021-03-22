const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");


//db connection
require("./config/config");

//use middleware
app.use(express.json());

//routes
app.use("/api/user",require("./routes/userRoutes"));
app.use("/api/post",require("./routes/postRoutes"));
//app.use("/api/people",require("./routes/peopleRoutes"));


if(process.env.NODE_ENV === 'PRODUCTION'){
    app.use(express.static(path.join(__dirname,'../frontend/build')));

    app.get('*', (req,res)=>{
        res.sendFile(path.join(__dirname,'../', 'frontend', 'build', 'index.html'));
    });
}

//start server
const PORT =  process.env.PORT || 5000;

app.listen(PORT,()=>{console.log(`server is running on ${PORT} in ${process.env.NODE_ENV}`)});