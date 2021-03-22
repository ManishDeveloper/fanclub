import {combineReducers} from 'redux';
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import peopleReducer from "./peopleReducer";

const rootReducer = combineReducers({
    user:userReducer,
    post:postReducer,
    people:peopleReducer
});

export default rootReducer;