import {
    DELETE_CLASS,
    DELETE_CLASS_ERROR,
    DELETE_CLASS_SUCCESS} from "../../actions/actionTypes";
import {put,call,takeEvery,takeLatest} from "redux-saga/effects";
import {delete_class} from "../api/delete_class";

export function* watchDeteleClassSaga(){
    yield takeEvery(DELETE_CLASS, delete_class_saga);
}

function* delete_class_saga(actions){
    var response = delete_class(actions.data);
    const error = response.message;
    if(response != undefined){
        if(response.resultCode !== 1){
            yield put(
                    {
                        type:DELETE_CLASS_SUCCESS,
                        response:response
                    }
                )
            
        }
        else
        {
            yield put(
                {
                    type:DELETE_CLASS_ERROR,
                    error:error,
                }
                )
        }
    }
    else
        {
            yield put(
                {
                    type:DELETE_CLASS_ERROR,
                    error:error,
                }
                )
        }
}