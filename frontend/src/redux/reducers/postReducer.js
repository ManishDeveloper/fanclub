import {ALL_POST_REQUEST,ALL_POST_SUCCESS,ALL_POST_FAIL,ADD_POST_REQUEST,ADD_POST_SUCCESS,ADD_POST_FAIL,UPDATE_POST_REQUEST,UPDATE_POST_SUCCESS,UPDATE_POST_FAIL,POST_LIKE,POST_UNLIKE,ADD_COMMENT,DELETE_POST} from "../types";

const initialState = {
    postList:[],
    postLoading:true,
    addPostLoading:false,
    updatePostLoading:false,
    singlePost:[]
}

const postReducer = (state=initialState,action) => {
    let {type,payload} = action;

    switch(type){
        case ALL_POST_REQUEST:
            return {
                ...state,
                postLoading:true
            }
        case UPDATE_POST_REQUEST:
            return {
                ...state,
                updatePostLoading:true
            }
        case ADD_POST_REQUEST:
            return {
                ...state,
                addPostLoading:true
            }
        case ADD_POST_SUCCESS:
            return {
                ...state,
                addPostLoading:false,
                postList:[payload, ...state.postList]
            }
        case ALL_POST_SUCCESS:
            return {
                ...state,
                postLoading:false,
                postList:payload
            }
        case POST_LIKE:
        case POST_UNLIKE:
        case ADD_COMMENT:
        case UPDATE_POST_SUCCESS:
            return {
                ...state,
                updatePostLoading:false,
                postList:state.postList.map((post)=>{
                    if(post._id === payload._id){
                        return payload;
                    }
                    else {
                        return post;
                    }
                })
            }
        case DELETE_POST:
            return {
                ...state,
                postList:state.postList.filter(post=>post._id !== payload)
            }
        case UPDATE_POST_FAIL:
            return {
                ...state,
                updatePostLoading:false
            }
        case ADD_POST_FAIL:
            return {
                ...state,
                addPostLoading:false
            }
        case ALL_POST_FAIL:
            return {
                ...state,
                postLoading:false,
                postList:[]
            }
        default:
            return state
    }
}

export default postReducer;