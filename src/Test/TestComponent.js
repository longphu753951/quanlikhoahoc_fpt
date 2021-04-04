import React,{Component} from "react";
import {View} from "react-native";
import TimePickerButton from "../components/TimePickerButton";

export default class Test extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <TimePickerButton
                    placeHolder={"Chọn ngày"}
                />
            </View>
        )
    }
}