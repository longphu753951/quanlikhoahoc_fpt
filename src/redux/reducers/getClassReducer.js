import {GET_CLASS_ERROR,GET_CLASS_SUCCESS} from "../actions/actionTypes";

const intialState={
    loading: false,
}

const getClassReducer = (state= intialState, action)=>{
    switch(action.type){
        case GET_CLASS_SUCCESS:
            return{
                ...action.response,
                isFetching: true,
            }
        case GET_CLASS_ERROR:
            return action.response ? action.response.isSuccess : -1;
        default:
            return state;
    }
}

export default getClassReducer;