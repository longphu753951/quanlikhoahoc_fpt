import React, {Component} from 'react';
import {View, StyleSheet,Text,TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Menu from './menu';
import moment from "moment";
import NavigationService from "../../../NavigationService";
import Size from '../../res/values/Sizes'
import Sizes from '../../res/values/Sizes';
export default class FlatListItem extends Component{
    constructor(props){
        super(props);
        this.state=({
            id:this.props.item.course_id,
        });
        this.changeCourse = this.changeCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    componentDidUpdate(prevProps){
        if(this.props.deleteCourse != prevProps.deleteCourse){
            this.props.getCourseAction();
        }
    }

    changeCourse=()=>{
        NavigationService.navigate('CHANGEKH',{data:this.props.item, id: this.state.id});
    }

    deleteCourse=()=>{
        this.props.deleteCourseAction(this.state.id);
        
    }

    render(){
        return(
            <TouchableOpacity
            onPress={()=>{
                this.props.getClassByCourseAction(this.state.id);
                this.props.sendCourseAction(this.state.id,this.props.item.courseName,this.props.item.startedDate,this.props.item.endedDate)
                NavigationService.navigate('QLBH',{id: this.state.id});}}
            key={this.state.id} style={styles.container}>
                <View style={{flexDirection:"row",paddingBottom:20}}>
                    <Text style={styles.title} numberOfLines={2}>{this.props.item.courseName}</Text>
                    <Menu
                        style={{flex:2}}
                        toChangeCourse={this.changeCourse}
                        toDeleteCourse={this.deleteCourse}
                     />
                </View>
                <View >
                    <View style={styles.info}>
                        <FontAwesome5 name={'user-tie'} color='#FFD237' size={Sizes.h40} style={[styles.icon]}/>
                        <Text style={[styles.infoText]}>Giảng viên: </Text>
                        <Text style={[styles.infoText2,{color:"#42C8FB"}]} numberOfLines={1} >{this.props.item.trainer}</Text>
                        
                    </View>
                    <View style={styles.info}>
                        <FontAwesome5 name={'address-card'} color='#412F4E' size={Sizes.h40} style={{padding:5, paddingRight:15}}/>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>Cán bộ quản lý: </Text>
                            <Text style={[styles.infoText2,{color:"#FF9226"}]}>{this.props.item.created_by}</Text>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <FontAwesome5 name={'calendar-check'} color='#42C8FB' size={Sizes.h40} style={styles.icon}/>
                            <Text style={[styles.infoText]}>Thời gian: </Text>
                            <Text numberOfLines={1} style={[styles.infoText2,{color:"#3A4C5E"}]}>{moment(this.props.item.startedDate).format("DD/MM/YYYY")} - {moment(this.props.item.endedDate).format("DD/MM/YYYY")}</Text>
                    </View>
                    <View style={styles.info}>
                        <FontAwesome5 name={'building'} color='#0090D7' size={Sizes.h40} style={styles.icon}/>
                        <View style={styles.info}>
                            <Text style={[styles.infoText]}>Tòa nhà: </Text>
                            <Text style={[styles.infoText2,{color:"#3A4C5E"}]}>{this.props.item.buildingName}</Text>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <FontAwesome5 name={'chalkboard-teacher'} color='#FF9226' size={Sizes.h40} style={{padding:5, paddingRight:15}}/>
                            <Text style={styles.infoText}>Phòng: </Text>
                            <Text style={[styles.infoText2,{color:"#3A4C5E"}]}>{this.props.item.roomName}</Text>
                       
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = new StyleSheet.create({
    container:{
        padding:15,
        marginBottom:"2%",
        marginTop:"2.5%",
        backgroundColor:"#fff",
        borderRadius:15,
        marginHorizontal:10,
        marginVertical:5,
        width:"95%",
        shadowColor:"#000000",
        shadowOffset:{
            width: 0,
	        height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        flexDirection:"column",
        justifyContent:"flex-start",
    },
    title:{
        flex: 20,
        color:"#3A4C5E",
        fontSize:Size.h48,
        fontWeight:"bold",
        paddingLeft:5,
    },
    info:{
        flexDirection:"row",
        flex:1,
    },
    infoText:{
        fontWeight:"600",
        fontSize: Size.h34,
        paddingTop:4,
        color:"#4E5867",
    },
    infoText2:{
        fontSize: Size.h32,
        paddingTop:4,
        color:"#198BB0",
        fontWeight:"bold",
        flexShrink: 1,
        flexGrow:1,
    },
    icon:{
        padding:5,
        paddingRight:20,
    }
});
