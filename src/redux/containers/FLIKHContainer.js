import React,{Component} from "react";
import {connect} from "react-redux";
import FlatListItemKH from "../../components/qlkh/FlatListItemKH";
import {getCourseAction, deleteCourseAction,getClassByCourseAction,sendCourseAction} from "../actions/index";

const mapStateToProps = state =>{
    return{
       course: state.courseReducer,
       deleteCourse: state.deleteCourseReducer,
       sendCourse: state.sendCourseReducer,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getCourseAction:()=>{
            dispatch(getCourseAction())
        },
        deleteCourseAction:(id)=>{
            dispatch(deleteCourseAction(id))
        },
        getClassByCourseAction:(id)=>{
            dispatch(getClassByCourseAction(id))
        },
        sendCourseAction:(id,courseName,startedDate,endedDate)=>{
            dispatch(sendCourseAction(id,courseName,startedDate,endedDate))
        },
    }
}

class FLIKHContainer extends Component{
    render(){
        return(
            <FlatListItemKH {...this.props}></FlatListItemKH>
        )
    }
}

export default FLIKHContainer = connect(mapStateToProps, mapDispatchToProps)(FLIKHContainer);