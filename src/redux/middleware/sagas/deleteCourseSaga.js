import {
    DELETE_COURSE,
    DELETE_COURSE_ERROR,
    DELETE_COURSE_SUCCESS} from "../../actions/actionTypes";
import {put,call,takeEvery,takeLatest} from "redux-saga/effects";
import {delete_course} from "../api/delete_course";

export function* watchDeteleCourseSaga(){
    yield takeEvery(DELETE_COURSE, delete_course_saga);
}

function* delete_course_saga(actions){
    var response = delete_course(actions.data);
    const error = response.message;
    if(response != undefined){
        if(response.resultCode !== 1){
            yield put(
                    {
                        type:DELETE_COURSE_SUCCESS,
                        response:response
                    }
                )
            
        }
        else
        {
            yield put(
                {
                    type:DELETE_COURSE_ERROR,
                    error:error,
                }
                )
        }
    }
    else
        {
            yield put(
                {
                    type:DELETE_COURSE_ERROR,
                    error:error,
                }
                )
        }
}