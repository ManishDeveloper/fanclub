const express = require("express");
const router = express.Router();
const Post = require("../models/postModel");
const User = require("../models/userModel");
const auth = require("../middleware/auth");


//@route    POST /api/post/add
//@desc     Add New Post
//@access   Private
router.post('/add',auth,async (req,res)=>{
    try {
        let {text} = req.body;

        let newPost = new Post({user:req.user.id, text});

        await newPost.save();

        let returnPost =  await Post.findById(newPost._id).populate('user','name avatar');

        return res.status(201).json(returnPost);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'});
    }
});



//@route    POST /api/post/get
//@desc     Get All Post
//@access   Private
router.get('/get',auth,async (req,res)=>{
    try {

        let allPost = await Post.find({}).populate('user','name avatar').populate('comments.user', 'name avatar');

        return res.status(200).json(allPost);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'});
    }
});


//@route    POST /api/post/update
//@desc     Update Post
//@access   Private
router.patch("/update/:postId", async (req,res)=>{

    try {
        let {text} = req.body;

        let updateFields = {}

        if(text) updateFields.text = text;

    let updatePost = await Post.findByIdAndUpdate(req.params.postId,updateFields,{new:true}).populate('user','name avatar').populate('comments.user', 'name avatar');

    return res.status(200).json(updatePost);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'});
    }
});

//@route    POST /api/post/delete/:postId
//@desc     Post Delete
//@access   Private
router.delete("/delete/:postId",auth, async (req,res)=>{
    try {
        await Post.findByIdAndRemove(req.params.postId);

        return res.status(200).json({msg:'Delete Post'});

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'});
    }
})


//@route    POST /api/post/like/:postId
//@desc     Post like
//@access   Private
router.post('/comment/add/:postId',auth,async (req,res)=>{
    try {

        let post = await Post.findById(req.params.postId);


        await post.comments.unshift({user:req.user.id,comment:req.body.comment});

        await post.save();

        let updatePost = await Post.findById(req.params.postId).populate('user','name avatar').populate('comments.user', 'name avatar');

        return res.status(200).json(updatePost);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'});
    }
});

//@route    POST /api/post/like/:postId
//@desc     Post like
//@access   Private
router.post('/like/:postId',auth,async (req,res)=>{
    try {

        let post = await Post.findById(req.params.postId).populate('user','name avatar').populate('comments.user', 'name avatar');

        let alreadyLike = await post.likes.filter(like=>like.user.toString() === req.user.id);

        if(alreadyLike.length > 0){
            return res.status(500).json({error:'already like'});
        }

        await post.likes.unshift({user:req.user.id});

        await post.save();

        return res.status(200).json(post);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'});
    }
})



//@route    POST /api/post/like/:postId
//@desc     Get All Post
//@access   Private
router.post('/unlike/:postId',auth,async (req,res)=>{
    try {

        let post = await Post.findById(req.params.postId).populate('user','name avatar');;

        post.likes = await post.likes.filter(like=>like.user.toString() !== req.user.id);

        await post.save();

        return res.status(200).json(post);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'});
    }
})






module.exports = router;