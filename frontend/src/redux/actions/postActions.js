import {ALL_POST_REQUEST,ALL_POST_SUCCESS,ALL_POST_FAIL,ADD_POST_REQUEST,ADD_POST_SUCCESS,ADD_POST_FAIL,UPDATE_POST_REQUEST,UPDATE_POST_SUCCESS,UPDATE_POST_FAIL,POST_LIKE,POST_UNLIKE, ADD_COMMENT, DELETE_POST} from "../types";
import axios from "axios";
import {toast} from "react-toastify";


//Get All Posts
export const getPosts = () => async dispatch => {
    try {
        await dispatch({type:ALL_POST_REQUEST});

        let res = await axios.get("/api/post/get");
        
        await dispatch({
            type:ALL_POST_SUCCESS,
            payload:res.data.reverse()
        });
        
    } catch (error) {
        console.log(error);
        await dispatch({type:ALL_POST_FAIL});
    }
}

//Get All Posts
export const addPost = (text) => async dispatch => {
    try {
        await dispatch({type:ADD_POST_REQUEST});

        let res = await axios.post("/api/post/add",{text});
        
        await dispatch({
            type:ADD_POST_SUCCESS,
            payload:res.data
        });
        await toast.success("Post Added Successfully!");

    } catch (error) {
        console.log(error);
        await toast.success(error.response.data.error);
        await dispatch({type:ADD_POST_FAIL});

    }
}

//update Post
export const updatePost = (postId, text) => async dispatch => {

    try {
        await dispatch({type:UPDATE_POST_REQUEST});

        let res = await axios.patch(`/api/post/update/${postId}`,{text});
        
        await dispatch({
            type:UPDATE_POST_SUCCESS,
            payload:res.data
        });
        await toast.success("Post Updated Successfully!");

    } catch (error) {
        console.log(error);
        await toast.error(error.response.data.error);
        await dispatch({type:UPDATE_POST_FAIL});

    }
}

//Delete Post
export const deletePost = (postId) => async dispatch => {
    try {

        await axios.delete(`/api/post/delete/${postId}`);

        await dispatch({
            type:DELETE_POST,
            payload:postId
        });

        await toast.success('Delete Post Successfully!');
        
    } catch (error) {
        console.log(error);
        await toast.error('Something Wrong!');
    }
}

//add comments
export const addComment = (postId,text) => async dispatch => {
    try {
        
    let res = await axios.post(`/api/post/comment/add/${postId}`,{comment:text});

    await dispatch({
        type:ADD_COMMENT,
        payload:res.data
    });

    await toast.success('Comment Added!');

    } catch (error) {
        console.log(error);
        toast.error(error.response.data.error);
    }
}

//post like
export const postLike = (postId) => async dispatch => {
    try {
        let res = await axios.post(`/api/post/like/${postId}`);

        await dispatch({
            type:POST_LIKE,
            payload:res.data
        });
    } catch (error) {
        console.log(error);
    }
}

//post like
export const postUnike = (postId) => async dispatch => {
    try {
        let res = await axios.post(`/api/post/unlike/${postId}`);

        await dispatch({
            type:POST_UNLIKE,
            payload:res.data
        });
    } catch (error) {
        console.log(error);
    }
}