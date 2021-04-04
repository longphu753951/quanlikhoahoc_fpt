import React,{Component} from "react";
import {connect} from "react-redux";
import {getClassByCourseAction } from "../actions/index";
import QlkhScreen from "../../components/qlbh/qlbhScreen";

const mapStateToProps = state =>{
    return{
        class: state.getClassReducer,
        course: state.sendCourseReducer,
        deleteClass: state.deleteClassReducer,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getClassByCourseAction: (id)=>{
            dispatch(getClassByCourseAction(id));
        }
    }
}

class ClassContainer extends Component{
    render(){
        return(
            <QlkhScreen style={{flex: 1}} {...this.props}></QlkhScreen>
        )
    }
}

export default ClassContainer = connect(mapStateToProps,mapDispatchToProps)(ClassContainer);