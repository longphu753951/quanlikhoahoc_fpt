import {DELETE_CLASS_ERROR,DELETE_CLASS_SUCCESS} from "../actions/actionTypes";

initialState ={
    loading:false,
}

export default deleteCourseReducer = (state= initialState,action)=>{
    switch(action.type){
        case DELETE_CLASS_SUCCESS:
            return action.response;
        case DELETE_CLASS_ERROR:
            return action.response;
        default:
            return state;
    }
}