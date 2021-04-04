import {
    POST_LOGIN,
    GET_COURSE,
    GET_BUILDING_ROOM,
    POST_KH,GET_CLASS,
    DELETE_COURSE,
    POST_EDIT_KH,
    SEND_COURSE,
    POST_CLASS,
    DELETE_CLASS,
    POST_EDIT_BH
} from "./actionTypes";


//Đăng nhập
export const loginAction = (userName, password)=>{
    return{
        type: POST_LOGIN,
        data: {userName, password},
    }
}

//Action lấy danh sách khóa học
export const getCourseAction = ()=>{
    return{
        type: GET_COURSE,
    }
}

//Action lấy danh sách tòa nhà + phòng
export const getBuildingRoomAction = ()=>{
    return {
        type: GET_BUILDING_ROOM,
    }
}

//Action gửi khóa học mới
export const postCourseAction = (courseName,trainer,startedDate,endedDate,buildingId,roomId)=>{
    return{
        type: POST_KH,
        data: {courseName,trainer,startedDate,endedDate,buildingId,roomId},
    }
}

//Action lấy lớp học theo khóa học
export const getClassByCourseAction = (courseId)=>{
    return{
        type: GET_CLASS,
        data: courseId
    }
}

//Action xóa khóa học
export const deleteCourseAction = (courseId)=>{
    return{
        type: DELETE_COURSE,
        data: courseId,
    }
}

//Action thay đổi khóa học
export const postChangeCourseAction = (id,courseName,trainer,startedDate,endedDate,buildingId,roomId)=>{
    
    return{
        type: POST_EDIT_KH,
        data: {id,courseName,trainer,startedDate,endedDate,buildingId,roomId},
    }
}

//Action gửi thông tin khóa học lên redux
export const sendCourseAction = (id,courseName,startedDate,endedDate)=>{
    return{
        type: SEND_COURSE,
        data:{id,courseName,startedDate,endedDate},
    }
}
//Action thêm lớp học
export const postClassAction = (courseId, className, trainer, date, startedTime, endedTime, buildingId, roomId)=>{
    return{
        type: POST_CLASS,
        data:{courseId, className, trainer, date, startedTime, endedTime, buildingId, roomId},
    }
}

//Action xóa lớp học
export const deleteClassAction = (classId)=>{
    return{
        type: DELETE_CLASS,
        data: classId,
    }
}

//Action thay đổi lớp học
export const postChangeClassAction = (classId,className,trainer,date,startedTime,endedTime,buildingId,roomId)=>{
    
    return{
        type: POST_EDIT_BH,
        data: {classId,className,trainer,date,startedTime,endedTime,buildingId,roomId},
    }
}