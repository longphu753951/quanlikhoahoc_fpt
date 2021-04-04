import {
    GET_COURSE,
    GET_COURSE_SUCCESS,
    GET_COURSE_ERROR} from "../../actions/actionTypes";
import {call,takeEvery,put} from "redux-saga/effects";
import {get_course} from "../api/get_course";

export function* watchCourse(){
    yield takeEvery(GET_COURSE,get_course_saga);
}

function* get_course_saga(action){
    
    var response = yield get_course();
    const error = response.message;
    if(response !=undefined){
        if(response.resultCode === 1){
            yield put({type:GET_COURSE_SUCCESS,response: response});
        }
        else if(response.resultCode === -1){
            yield put({type:GET_COURSE_ERROR,error:error});
        }
    }
    else {
        yield put({type:GET_COURSE_ERROR,error:error});
    }
}