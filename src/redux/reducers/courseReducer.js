import {GET_COURSE_ERROR,GET_COURSE_SUCCESS,POST_KH_ERROR,POST_KH_SUCCESS} from "../actions/actionTypes";

const intialState ={
    loading: false,
}

const courseReducer = (state= intialState, action)=>{
    switch(action.type){
        case GET_COURSE_SUCCESS:
            return{
                ...action.response,
                isFetching: true,
            };
        case GET_COURSE_ERROR:
            return action.response ? action.response.isSuccess : -1;
        default:
            return state;
    }
}

export default courseReducer;