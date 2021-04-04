import React,{Component} from "react";
import QlkhScreen from "../../components/qlkh/qlkhScreen";
import { connect } from "react-redux";
import {getCourseAction} from "../actions/index";

const mapStateToProps = state =>{
    return{
        course: state.courseReducer,
        deleteCourse: state.deleteCourseReducer,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        getCourseAction:()=>{
            dispatch(getCourseAction());
    }}
}

class GetCourseContainer extends Component{
    render(){
        return(
            <QlkhScreen style={{flex: 1}} {...this.props}></QlkhScreen>
        )
    }
}

export default GetCourseContainer = connect(mapStateToProps,mapDispatchToProps)(GetCourseContainer);