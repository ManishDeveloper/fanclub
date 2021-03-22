import { AUTH_USER_REQUEST,AUTH_USER_SUCCESS,AUTH_USER_FAIL,LOGIN_USER_REQUEST,LOGIN_USER_SUCCESS,LOGIN_USER_FAIL,LOGOUT_USER,REGISTER_USER_REQUEST,REGISTER_USER_SUCCESS,REGISTER_USER_FAIL,FOLLOW_REQUEST,FOLLOW_SUCCESS, FOLLOW_FAIL, UNFOLLOW_REQUEST,UNFOLLOW_SUCCESS, UNFOLLOW_FAIL,USER_BIO_REQUEST,USER_BIO_SUCCESS,USER_BIO_FAIL,UPDATE_BIO_REQUEST,UPDATE_BIO_SUCCESS,UPDATE_BIO_FAIL} from "../types";

const initialState = {
    loading:true,
    loginLoading:true,
    registerLoading:true,
    followLoading:false,
    userBioLoading:true,
    bioUpdateLoading:true,
    user:null,
    userBio:{},
    token:localStorage.token,
    isAuthenticated:false
}

const userReducer = (state=initialState,action) => {
    let {type,payload} = action;

    switch(type){
        case AUTH_USER_REQUEST:
            return {
                ...state,
                loading:true
            }
        case LOGIN_USER_REQUEST:
            return {
                ...state,
                loginLoading:true
            }
        case USER_BIO_REQUEST:
            return {
                ...state,
                userBioLoading:true
            }
        case UPDATE_BIO_REQUEST:
            return {
                ...state,
                bioUpdateLoading:true
            }
        case USER_BIO_SUCCESS:
        case UPDATE_BIO_SUCCESS:
            return {
                ...state,
                userBioLoading:false,
                bioUpdateLoading:false,
                userBio:payload
            }
        case USER_BIO_FAIL:
        case UPDATE_BIO_FAIL:
            return {
                ...state,
                userBioLoading:false,
                bioUpdateLoading:false,
                userBio:{}
            }
        case FOLLOW_REQUEST:
        case UNFOLLOW_REQUEST:
            return {
                ...state,
                followLoading:true
            }
        case FOLLOW_SUCCESS:
        case UNFOLLOW_SUCCESS:
            return {
                ...state,
                followLoading:false,
                user:payload
            }
        case FOLLOW_FAIL:
        case UNFOLLOW_FAIL:
            return {
                ...state,
                followLoading:false
            }
        case REGISTER_USER_REQUEST:
            return {
                ...state,
                registerLoading:true
            }
        case LOGIN_USER_SUCCESS:
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                loginLoading:false,
                registerLoading:false,
                token:payload
            }
        case AUTH_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                loginLoading:false,
                isAuthenticated:true,
                user:payload
            }
        case AUTH_USER_FAIL:
        case LOGIN_USER_FAIL:
        case REGISTER_USER_FAIL:
        case LOGOUT_USER:
            localStorage.removeItem("token");
            return {
                ...state,
                loading:false,
                loginLoading:false,
                registerLoading:false,
                isAuthenticated:false,
                user:null,
                token:null
            }
        default:
            return state;
    }
}


export default userReducer;