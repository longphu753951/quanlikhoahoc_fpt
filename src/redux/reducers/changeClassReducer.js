import {POST_EDIT_BH_SUCCESS,POST_EDIT_BH_ERROR} from "../actions/actionTypes";

const intialState={
    loading: false,
}

export default changeCourseReducer = (state = intialState, action)=>{
    switch(action.type){
        case POST_EDIT_BH_SUCCESS:
            return action.response
        case POST_EDIT_BH_ERROR:
            return action.error;  
        default:
            return state;  
    }
}