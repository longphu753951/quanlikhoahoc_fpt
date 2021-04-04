import React,{ Component } from "react";
import AddKHScreen from "../../components/addKH/addKHScreen";
import {connect} from "react-redux";
import {getBuildingRoomAction,postCourseAction} from "../actions/index";

const mapStateToProps = (state) =>{
    
    return{
        building: state.buildingReducer,
        course: state.addCourseReducer,
    }
}

const mapDispatchToProps = (dispatch) =>({
    getBuildingRoomAction:()=> dispatch(getBuildingRoomAction()),
    postCourseAction:(courseName,trainer,startedDate,endedDate,buildingId,roomId)=> dispatch(postCourseAction(courseName,trainer,startedDate,endedDate,buildingId,roomId)),
});


class AddCourseContainer extends Component{
    render(){
        return(
            <AddKHScreen {...this.props}></AddKHScreen>
        )
    }
}

export default AddCourseContainer = connect(mapStateToProps,mapDispatchToProps)(AddCourseContainer);