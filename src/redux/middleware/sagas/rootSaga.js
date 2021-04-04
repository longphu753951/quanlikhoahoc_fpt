import { all } from "redux-saga/effects";
import { watchLogin } from "./loginSagas";
import {watchCourse} from "./getCourseSagas";
import {watchGetBuildingRoom} from "./getBuildingSagas";
import {watchPostCourse} from "./postCourseSagas";
import {watchGetClassSaga} from "./getClassSagas";
import {watchDeteleCourseSaga} from "./deleteCourseSaga";
import {watchChangeCourseSaga} from "./postChangeCourseSagas";
import {watchPostAddClassSaga} from "./postClassSaga";
import {watchDeteleClassSaga} from "./deleteClassSaga"
import {watchChangeClassSaga} from "./postChangeClassSaga";

export default function* rootSaga() {
    yield all([
        watchLogin(),
        watchCourse(),
        watchGetBuildingRoom(),
        watchPostCourse(),
        watchGetClassSaga(),
        watchDeteleCourseSaga(),
        watchChangeCourseSaga(),
        watchPostAddClassSaga(),
        watchDeteleClassSaga(),
        watchChangeClassSaga(),
    ])
    
}