import {ALL_USER_REQUEST,ALL_USER_SUCCESS,ALL_USER_FAIL} from "../types";


const initialState = {
    allUserLoading:true,
    peopleList:[]
}

const peopleReducer = (state=initialState,action) => {
    let {type,payload} = action;

    switch(type){
        case ALL_USER_REQUEST:
            return {
                ...state,
                allUserLoading:true
            }
        case ALL_USER_SUCCESS:
            return {
                ...state,
                allUserLoading:false,
                peopleList:payload
            }
        case ALL_USER_FAIL:
            return {
                ...state,
                allUserLoading:false,
                peopleList:[]

            }
        default:
            return state;
    }
}

export default peopleReducer;