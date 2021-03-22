const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports =  async (req, res, next) => {

    try {
        let token = req.header("x-auth-token");

        if(!token){
            return res.status(400).json({erro:'No Token! Authentication Failed!'});
        }

        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(err){
            return res.status(400).json({erro:'Token is not Valid! Authentication Failed!'})
            }
            else {
                req.user = decoded.user;
                next();
            }
        })

    } catch (error) {
        console.log("Something wrong with auth middleware..");
        return res.status(500).send('Server Error');
    }
}