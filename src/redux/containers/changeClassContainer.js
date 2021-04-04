import React,{Component} from "react";
import ChangeBHScreen from "../../components/changeBH/changeBHScreen";
import {connect} from "react-redux";
import {getBuildingRoomAction,getClassByCourseAction,postChangeClassAction} from "../actions/index";

const mapStateToProps = (state)=>{
    return{
        course: state.sendCourseReducer,
        building: state.buildingReducer,
        changeClass: state.changeClassReducer
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        getBuildingRoomAction:()=> dispatch(getBuildingRoomAction()),
        getClassByCourseAction: (id)=>{
            dispatch(getClassByCourseAction(id));
        },
        postChangeClassAction:(classId,className,trainer,date,startedTime,endedTime,buildingId,roomId)=>{
            dispatch(postChangeClassAction(classId,className,trainer,date,startedTime,endedTime,buildingId,roomId));
        }
    }
}

class ChangeClassContainer extends Component{
    render(){
        return(
            <ChangeBHScreen {...this.props}></ChangeBHScreen>
        )
    }
}

export default ChangeClassContainer = connect(mapStateToProps,mapDispatchToProps)(ChangeClassContainer);