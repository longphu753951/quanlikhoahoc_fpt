import React,{Component} from "react";
import {connect} from "react-redux";
import FlatListItemBH from "../../components/qlbh/FlatListItemBH";
import {getClassByCourseAction, deleteClassAction} from "../actions/index";

const mapStateToProps = state =>{
    return{
       course: state.sendCourseReducer,
       deleteClass: state.deleteClassReducer,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        deleteClassAction:(id)=>{
            dispatch(deleteClassAction(id))
        },
        getClassByCourseAction:(id)=>{
            dispatch(getClassByCourseAction(id))
        }
    }
}

class FLBHContainer extends Component{
    render(){
        return(
            <FlatListItemBH {...this.props}></FlatListItemBH>
        )
    }
}

export default FLBHContainer = connect(mapStateToProps, mapDispatchToProps)(FLBHContainer);