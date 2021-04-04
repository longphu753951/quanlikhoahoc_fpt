import { POST_LOGIN,POST_LOGIN_SUCCESS,POST_LOGIN_ERROR } from "../../actions/actionTypes";
import { call,takeEvery,put,takeLatest } from "redux-saga/effects";
import { postLogin } from "../api/login";

export function* watchLogin(){
    yield takeEvery(POST_LOGIN,signInFlow);
}

function* signInFlow(action) {
    
    const {userName, password} = action.data;
    const response = yield postLogin(userName, password);
    

    if(response != undefined){
        if(response.resultCode ===1){
            yield put({
                type: POST_LOGIN_SUCCESS,
                response: response
            });
        }
        else{
            yield put({
                type: POST_LOGIN_ERROR,
                response: response
            });
        }
    }else{
        yield put({
            type: POST_LOGIN_ERROR,
            response: response
        });
    }
}