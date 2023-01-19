import authReducer from "./auth.js";
import currentUserReducer from "./currentUser.js";
import questionsReducer from "./Question.js";
import userReducer from './users.js'
import postReducer from './Posts.js';
import latestUserReducer from "./latestUserReducer.js";
import { combineReducers } from "redux";

export default combineReducers({
    authReducer,
    currentUserReducer,
    questionsReducer,
    userReducer,
    postReducer,
    latestUserReducer
})