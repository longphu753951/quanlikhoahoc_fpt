import {SEND_COURSE} from "../actions/actionTypes";

const intialState = {
    id:'',
    courseName:'',
    startedDate:'',
    endedDate:'',
}

const sendCourseReducer = (selectedCourse=intialState,action)=>{
    switch(action.type){
        case SEND_COURSE:
            intialState.id= action.data.id;
            intialState.courseName= action.data.courseName;
            intialState.startedDate= action.data.startedDate;
            intialState.endedDate= action.data.endedDate;
            return selectedCourse
        default:
            return selectedCourse;
    }
}

export default sendCourseReducer;