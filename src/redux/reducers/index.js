import {combineReducers} from "redux";
import loginReducer from "./loginReducer";
import courseReducer from "./courseReducer";
import buildingReducer from "./buildingReducer";
import addCourseReducer from "./addCourseReducer";
import getClassReducer from "./getClassReducer";
import deleteCourseReducer from "./deleteCourseReducer";
import changeCourseReducer from "./changeCourseReducer";
import sendCourseReducer from "./sendCourseReducer";
import addClassReducer from "./addClassReducer";
import deleteClassReducer from "./deleteClassReducer";
import changeClassReducer from "./changeClassReducer";

const allReducers = combineReducers({
    loginReducer,
    courseReducer,
    buildingReducer,
    addCourseReducer,
    getClassReducer,
    deleteCourseReducer,
    changeCourseReducer,
    sendCourseReducer,
    addClassReducer,
    deleteClassReducer,
    changeClassReducer,
});

export default allReducers;