import {POST_CLASS_ERROR, POST_CLASS_SUCCESS} from "../actions/actionTypes";

const intialState = {
    loading: false,
}

const addClassReducer = (state = intialState, action)=>{
    switch(action.type){
        case POST_CLASS_SUCCESS:
            return action.response;
        case POST_CLASS_ERROR:
            return action.response;
        default:
            return state;
    }
}

export default addClassReducer;