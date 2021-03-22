import { AUTH_USER_REQUEST,AUTH_USER_SUCCESS,AUTH_USER_FAIL,LOGIN_USER_REQUEST,LOGIN_USER_SUCCESS,LOGIN_USER_FAIL,LOGOUT_USER, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, ALL_USER_REQUEST, ALL_USER_SUCCESS, ALL_USER_FAIL, FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAIL, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAIL, USER_BIO_FAIL, USER_BIO_REQUEST, USER_BIO_SUCCESS, UPDATE_BIO_FAIL, UPDATE_BIO_REQUEST, UPDATE_BIO_SUCCESS} from "../types";
import setAuthToken from "../../utils/setAuthToken";
import axios from "axios";
import {toast} from "react-toastify";


//get auth user
export const getAllUser = () => async dispatch => {

    try {
        await dispatch({
            type:ALL_USER_REQUEST
        });

        let res = await axios.get("/api/user/all");

        await dispatch({
            type:ALL_USER_SUCCESS,
            payload:res.data
        });

    } catch (error) {
        console.log(error.message);
        await dispatch({
            type:ALL_USER_FAIL
        });
    }
}

//Get Auth User Bio
export const getUserBio = () => async dispatch => {

    try {
       await dispatch({type:USER_BIO_REQUEST});

        let res = await axios.get("/api/user/profile/get");

        await dispatch({
            type:USER_BIO_SUCCESS,
            payload:res.data
        });
        
    } catch (error) {
        console.log(error.message);
        await dispatch({
            type:USER_BIO_FAIL
        }); 
    }
}

//get auth user
export const authUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
        await dispatch({
            type:AUTH_USER_REQUEST
        });

        let res = await axios.get("/api/user/auth");

        await dispatch({
            type:AUTH_USER_SUCCESS,
            payload:res.data
        });

        await dispatch(getUserBio());

        await dispatch(getAllUser());

    } catch (error) {
        console.log(error.message);
        await dispatch({
            type:AUTH_USER_FAIL
        });
    }
}

//Update User Bio
export const updateBioDetails = (bioFields) => async dispatch => {
    try {
        await dispatch({type: UPDATE_BIO_REQUEST});

        let res = await axios.post("/api/user/profile/update",bioFields);

        await dispatch({
            type:UPDATE_BIO_SUCCESS,
            payload:res.data
        });

        await toast.success("User Profile Updated Successfully!");

    } catch (error) {
        console.log(error.message);
        await toast.error("Profile Update Failed!");
        await dispatch({
            type:UPDATE_BIO_FAIL
        })

    }
}

//Add follow user
export const addFollow = (userId) => async dispatch => {
    try {
        await dispatch({
            type:FOLLOW_REQUEST
        });

        let res = await axios.post(`/api/user/following/add/${userId}`);

        await dispatch({
            type:FOLLOW_SUCCESS,
            payload:res.data
        });

        
    } catch (error) {
        console.log(error.message);
        await dispatch({
            type:FOLLOW_FAIL
        })
    }
}


//Add follow user
export const removeFollow = (userId) => async dispatch => {
    try {
        await dispatch({
            type:UNFOLLOW_REQUEST
        });

        let res = await axios.post(`/api/user/following/remove/${userId}`);

        await dispatch({
            type:UNFOLLOW_SUCCESS,
            payload:res.data
        });

        
    } catch (error) {
        console.log(error.message);
        await dispatch({
            type:UNFOLLOW_FAIL
        })
    }
}

//Register user
export const userRegister = (name,email,password) => async dispatch => {

    try {
        await dispatch({
            type:REGISTER_USER_REQUEST
        });

        let res = await axios.post('/api/user/register',{name,email,password});

        await localStorage.setItem("token",res.data.token);

        await dispatch(authUser());

        await dispatch({
        type:REGISTER_USER_SUCCESS,
        payload:res.data.token
        });

        await toast.success("Register Successfully!");

    } catch (error) {
     console.log(error.message); 
     await toast.error(error.response.data.error);  
     await dispatch({
         type:REGISTER_USER_FAIL
     });
    }
}


//Login user
export const userLogin = (email,password) => async dispatch => {

    try {
        await dispatch({
            type:LOGIN_USER_REQUEST
        });

        let res = await axios.post('/api/user/login',{email,password});

        await localStorage.setItem("token",res.data.token);

        await dispatch(authUser());

        await dispatch({
        type:LOGIN_USER_SUCCESS,
        payload:res.data.token
        });

        await toast.success("Login Successfully!");


    } catch (error) {
     console.log(error.message);   
     await toast.error(error.response.data.error);
     await dispatch({
         type:LOGIN_USER_FAIL
     });
    }
}

export const logoutUser = () => async dispatch => {
    await dispatch({
        type:LOGOUT_USER
    });

    await toast.success("Logout Successfully!");
}