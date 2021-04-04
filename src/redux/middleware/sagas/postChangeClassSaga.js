import {POST_EDIT_BH,POST_EDIT_BH_SUCCESS,POST_EDIT_BH_ERROR} from "../../actions/actionTypes";
import {call,takeLatest,takeEvery,put} from "redux-saga/effects";
import post_change_class from "../api/post_change_class";

export function* watchChangeClassSaga(){
    yield takeEvery(POST_EDIT_BH,postChangeClassSaga);
}

function* postChangeClassSaga(action){
   
    const {classId,className,trainer,date,startedTime,endedTime,buildingId,roomId} = action.data;
    const response = yield post_change_class(classId,className,trainer,date,startedTime,endedTime,buildingId,roomId);
    if(response != undefined){
        if(response.resultCode ===1){
            yield put({
                type: POST_EDIT_BH_SUCCESS,
                response:response});
        }
        else{
            yield put ({
                type:POST_EDIT_BH_ERROR,
                error: response,
            });
        }
    }else{
        yield put ({
            type:POST_EDIT_BH_ERROR,
            error: response,
        });
    }
}