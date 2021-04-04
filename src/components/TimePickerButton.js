import React, {Component} from 'react';
import {View, Text, TouchableOpacity,StyleSheet,Modal,Platform,TouchableWithoutFeedback } from 'react-native';
import DataTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import Sizes from '../res/values/Sizes';

export default class DateTimePickerButton extends Component {
    constructor(props){
        super(props);
        this.state=({
            time: new Date(),
            show: false,
            selectedTime:'',
        });
    }

    async componentDidUpdate(prevProps){
        if(this.props.defaultItem != prevProps.defaultItem){
            await this.setState({
                time: new Date("24 Apr 1999 " + this.props.defaultItem),
            })
        }
    }

    resetTime=()=>{
        this.setState({
            selectedTime:'',
            time: new Date(),
        })
    }

    handleOnChange = (event, selectedTime)=>{
        if(event.type=="set"){
            const inputTime = moment(selectedTime).format('HH:mm');
            console.log(selectedTime);
            this.setState({
                time:selectedTime,
                selectedTime:inputTime,
                show:false});
                this.props.onChange(inputTime);
        }
        else if(event.type=="dismissed"){
            this.setState({
                show:false});
        }
    }

    render(){
        return(
           <View style={[styles.container,{borderColor:this.props.borderColor,backgroundColor:this.props.disable?"#afafaf":"transparent"},this.props.style]}>
                <TouchableOpacity disabled={this.props.disable} style={{paddingHorizontal:15,paddingVertical:10}} onPress={()=>this.setState({show:true})}>
                    <Text style={{fontSize:Sizes.h28,color:this.props.disable?"white":"black"}}>{(this.state.selectedTime==''?this.props.placeHolder:this.state.selectedTime)}</Text>
                </TouchableOpacity>
                {this.state.show && (
                    /*Platform.OS == 'ios'?*/
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.show}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                          }}>
                            <TouchableWithoutFeedback onPress={()=>{
                                this.setState({
                                    show:false,
                                })
                            }}  style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text>Test123</Text>
                                </View>
                            </TouchableWithoutFeedback>
                    </Modal> 
                    /*: <DataTimePicker
                    testID="timePicker"
                    value={this.state.time}
                    is24Hour={true}
                    minimumDate={this.props.minimumTime}
                    mode='time'
                    display="clock"
                    onChange={this.handleOnChange}
                    />*/
                )}
           </View>
            
        )
    }
}

const styles = new StyleSheet.create({
    container:{
        borderWidth:1,
        backgroundColor:"transparent",
        borderRadius: Sizes.s15,
        justifyContent: 'center',
        alignItems: 'stretch',
        marginHorizontal:"2%"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        opacity:0.7,
        alignItems: "center",
        marginTop: 22,
        backgroundColor:"#000",
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
    }
})