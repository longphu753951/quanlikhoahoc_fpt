import {POST_CLASS, POST_CLASS_ERROR, POST_CLASS_SUCCESS} from "../../actions/actionTypes";
import {call,takeEvery,takeLatest,put} from "redux-saga/effects";
import postAddClass from "../api/post_add_class";

export function* watchPostAddClassSaga(){
    yield takeEvery(POST_CLASS,postAddClassSaga);
}

function* postAddClassSaga(action){
    const {courseId, className, trainer, date, startedTime, endedTime, buildingId, roomId} = action.data;
    const response = yield postAddClass(courseId,className,trainer,date,startedTime, endedTime, buildingId, roomId);

    if(response != undefined){
        if(response.resultCode ===1){
            yield put({
                type: POST_CLASS_SUCCESS,
                response: response,
            })
        }
        else{
            yield put({
                type: POST_CLASS_ERROR,
                response: response,
            })
        }
    }
    else{
        yield put({
            type: POST_CLASS_ERROR,
            response: response,
        })
    }
}