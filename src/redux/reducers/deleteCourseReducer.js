import {DELETE_COURSE_ERROR,DELETE_COURSE_SUCCESS} from "../actions/actionTypes";

initialState ={
    loading:false,
}

export default deleteCourseReducer = (state= initialState,action)=>{
    switch(action.type){
        case DELETE_COURSE_SUCCESS:
            return action.response;
        case DELETE_COURSE_ERROR:
            return action.response;
        default:
            return state;
    }
}