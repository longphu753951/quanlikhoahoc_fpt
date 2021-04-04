import React, {Component} from 'react';
import AddBHScreen from "../../components/addBH/addBHScreen";
import {connect} from "react-redux";
import {getBuildingRoomAction,postClassAction,getClassByCourseAction} from "../actions/index";

const mapStateToProps = (state)=>{
    return{
        building: state.buildingReducer,
        class: state.addClassReducer,
        course: state.sendCourseReducer,
    }
}

const mapDispatchToProps = (dispatch)=>({
    getBuildingRoomAction:()=>dispatch(getBuildingRoomAction()),
    postClassAction:(courseId, className, trainer, date, startedTime, endedTime, buildingId, roomId)=>dispatch(postClassAction(courseId, className, trainer, date, startedTime, endedTime, buildingId, roomId)),
    getClassByCourseAction: (id)=>{
        dispatch(getClassByCourseAction(id));
    }
})

class AddClassReducer extends Component{
    render(){
        return(
            <AddBHScreen {...this.props}></AddBHScreen>
        )
    }
}

export default AddClassReducer = connect(mapStateToProps,mapDispatchToProps)(AddClassReducer);