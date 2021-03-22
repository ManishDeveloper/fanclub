const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const auth = require("../middleware/auth");
require("dotenv").config();

//@routes   POST /api/user/auth
//@desc     Get Auth User
//@access   Public
router.get('/auth',auth, async (req,res)=>{

    try {

        let user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({error:"No User Found!"});
        }

        return res.status(200).json(user);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Server Error");
    }
});


//@routes   POST /api/user/auth
//@desc     Get All Users
//@access   Public
router.get('/all',auth, async (req,res)=>{

    try {

        let user = await User.find({}).select("-password");

        if(!user){
            return res.status(404).json({error:"No User Found!"});
        }

        let removeAuthUser = await user.filter(users=>users._id.toString() !== req.user.id);

        return res.status(200).json(removeAuthUser);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Server Error");
    }
})

//@routes   POST /api/user/following/add
//@desc     Add People to follow
//@access   Public
router.post('/following/add/:userId', auth, async (req,res)=>{
    try {

        let followingUser = await User.findById(req.user.id);

        let followerUser = await User.findById(req.params.userId);

        await followerUser.followers.unshift({user:req.user.id});

        await followingUser.following.unshift({user:req.params.userId});

        await followerUser.save();

        await followingUser.save();

        return res.status(200).json(followingUser);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Server Error");
    }
});


//@routes   POST /api/user/following/remove
//@desc     Update Profile Fields
//@access   Public
router.post('/profile/update',auth, async (req,res)=>{

    let {bio,profession,location,company,facebook,twitter,linkedin,instagram} = req.body;

    try {
        let profileFields = {user:req.user.id}

        if(bio) profileFields.bio = bio;
        if(profession) profileFields.profession = profession;
        if(location) profileFields.location = location;
        if(company) profileFields.company = company;

        let socialFields = {}

        if(facebook) socialFields.facebook = facebook;
        if(twitter) socialFields.twitter = twitter;
        if(linkedin) socialFields.linkedin = linkedin;
        if(instagram) socialFields.instagram = instagram;

        profileFields.social = socialFields;

        let updateFields = await Profile.findOneAndUpdate({user:req.user.id},{$set: profileFields}, {new:true, upsert:true, setDefaultsOnInsert: true});

        return res.status(201).json(updateFields);

    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Server Error");
    }
})


//@routes   POST /api/user/following/remove
//@desc     Update Profile Fields
//@access   Public
router.get("/profile/get", auth, async (req,res)=>{

    try {
        let userBio = await Profile.findOne({user: req.user.id});

        if(!userBio){
            return res.status(200).json({});
        }

        return res.status(200).json(userBio);

    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Server Error"); 
    }
})

//@routes   POST /api/user/following/remove
//@desc     unfollow people
//@access   Public
router.post('/following/remove/:userId', auth, async (req,res)=>{
    try {

        let followingUser = await User.findById(req.user.id);

        let followerUser = await User.findById(req.params.userId);

        followerUser.followers = await followerUser.followers.filter(user=> user.user.toString() !== req.user.id);

        followingUser.following = await followingUser.following.filter(user=> user.user.toString() !== req.params.userId);

        await followerUser.save();

        await followingUser.save();

        return res.status(200).json(followingUser);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Server Error");
    }
})


//@routes   POST /api/user/register
//@desc     Register User
//@access   Public
router.post("/register", [
    check("name","Name is Required").notEmpty(),
    check("email","Email is Required").notEmpty(),
    check("email","Email is not Valid").isEmail(),
    check("password","Password is Required").notEmpty(),
    check("password","Password should be 5 Characters").isLength({min:5}),
],async (req,res)=>{
    let errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()[0].msg});
    }

    try {
        let {name,email,password} = req.body;

        let userExist = await User.findOne({email});

        if(userExist){
            return res.status(400).json({error:"User is Already Exist!"});
        }

        let salt = await bcrypt.genSalt(10);

        let hasPassword = await bcrypt.hash(password,salt);

        let newUser = new User({name,email,password:hasPassword});

        await newUser.save();

        let payload = {
            user:{
                id:newUser.id
            }
        }

        await jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:360000},(err,token)=>{
            if(err) throw err;
            return res.status(200).json({token});
        });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Server Error");
    }
})


//@routes   POST /api/user/login
//@desc     Login User
//@access   Public
router.post("/login", [
    check("email","Email is Required").notEmpty(),
    check("email","Email is not Valid").isEmail(),
    check("password","Password is Required").notEmpty()
],async (req,res)=>{
    let errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()[0].msg});
    }

    try {
        let {email,password} = req.body;

        let userExist = await User.findOne({email});

        if(!userExist){
            return res.status(400).json({error:"User is not Exist!"});
        }

        let checkPassword = await bcrypt.compare(password,userExist.password);

        if(!checkPassword){
            return res.status(400).json({error:"Wrong Password!"});
        }

        let payload = {
            user:{
                id:userExist._id
            }
        }

        await jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:360000},(err,token)=>{
            if(err) throw err;
            return res.status(200).json({token});
        });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Server Error");
    }
})


module.exports = router;