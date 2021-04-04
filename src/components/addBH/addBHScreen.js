import React,{Component} from 'react';
import {ScrollView,SafeAreaView,Text,TextInput,TouchableOpacity, View, StyleSheet, Alert,KeyboardAvoidingView} from 'react-native';
import Picker from "../picker";
import TimePickerButton from "../TimePickerButton";
import DateTimePickerButton from "../DateTimePickerButton";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Title from "../title";
import { arrayIsEmpty, objectIsNull } from '@dungdang/react-native-basic/src/Functions';
import Sizes from '../../res/values/Sizes';

export default class addKHScreen extends Component{
    constructor(props){
        super(props);
        this.state =({
            building:[],
            room: null,
            selectedRoom:'',
            selectedRoomName:'',
            selectedBuilding:'',
            selectedBuildingName:'',
            date:'',
            tenLopHoc:'',
            giangVien:'',
            timeFrom:'',
            timeTo:'',
            selectedRoomError:true,
            selectedBuildingError:true,
            tenLopHocError:true,
            giangVienError:true,
            timeFromError:true,
            timeToError:true,
            dateError:true,
            timeFromToError:true,
            hopLe:true,
        });
        this.resetTime = React.createRef();
    }

    componentDidMount(){
        this.props.getBuildingRoomAction();
    }


    kiemTraPhongHoc(){
        if(this.state.selectedRoom==''){
            this.setState({selectedRoomError:false})
            return false;
        }
        else{
            this.setState({selectedRoomError:true});
            return true;
        }
    }

    kiemTraTenLop(){
        if(this.state.tenLopHoc.trim()==''){
            this.setState({tenLopHocError:false})
            return false;
        }
        else{
            this.setState({tenLopHocError:true})
            return true;
        }
    }

    kiemTraGiangVien(){
        if(this.state.giangVien.trim()==''){
            this.setState({giangVienError:false})
            return false;
        }
        else{
            this.setState({giangVienError:true})
            return true;
        }
    }
    
    kiemTraTimeFrom(){
        if(this.state.timeFrom==''){
            this.setState({timeFromError:false})
            return false;
        }
        else{
            this.setState({timeFromError:true})
            return true;
        }
    }

    kiemTraTimeTo(){
        if(this.state.timeTo==''){
           
            this.setState({timeToError:false})
            return false;
        }
        else{
            
            this.setState({timeToError:true})
            return true;
        }
    }

    kiemDate(){
        if(this.state.date==''){
           
            this.setState({dateError:false})
            return false;
        }
        else{
            
            this.setState({dateError:true})
            return true;
        }
    }
    
    checkFromToTime(from,to){
        var from = new Date(from);
        var to = new Date(to);
        if(from > to){
            this.setState({timeFromError:false});
            this.setState({timeToError:false});
            return false;
        }
        return true;
    }

    kiemTraToaNha(){
        if(this.state.selectedRoom==''){
            this.setState({selectedBuildingError:false})
            return false;
        }
        else{
            this.setState({selectedBuildingError:true})
            return true;
        }
    }

    taoKhoaHoc(){
        var className = this.state.tenLopHoc.trim();
        var trainer = this.state.giangVien.trim();
        var date = this.state.date;
        var startedTime = this.state.timeFrom;
        var endedTime = this.state.timeTo;
        var buildingId = this.state.selectedBuilding;
        var roomId = this.state.selectedRoom;
        
        if(!this.kiemTraTimeFrom() | !this.kiemTraTimeTo() | !this.kiemTraGiangVien() | !this.kiemTraPhongHoc() | !this.kiemTraTenLop() | !this.kiemTraToaNha() |!this.kiemDate()| (this.state.timeFromToError===false)){
            return;
        }
        this.props.postClassAction(this.props.course.id,className,trainer,date,startedTime,endedTime,buildingId,roomId);
    }

    componentDidUpdate(prevProps){
        if(prevProps.building != this.props.building){
            if(!objectIsNull(this.props.building)){
                if(!arrayIsEmpty(this.props.building.data)){
                    var convertArray = this.props.building.data.map(function(obj){
                        return {key:obj._id,label:obj.buildingName, value:obj.buildingName};
                    });
                    this.setState({building:convertArray});
                }
            }
        }
        if(prevProps.class != this.props.class){
            if(this.props.class.resultCode === -1){
                Alert.alert("Lỗi",this.props.class.message);
            }
            if(this.props.class.resultCode === 1){
                Alert.alert("Thông báo",this.props.class.message, 
                [{
                     text: "OK",
                     onPress: ()=>{
                         this.props.getClassByCourseAction(this.props.course.id)
                         this.props.navigation.navigate("QLBH");
                     }
                 }]);
            }
        }
    }
    
    render(){
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.items}>  
                        <Title title="Tên lớp" error={this.state.tenLopHocError}/>
                        <TextInput
                         style={[styles.textInput,{borderColor:(!this.state.tenLopHocError?"#ff0000":"#000")}]} 
                         placeholder="Nhập tên lớp học"
                         value={this.state.tenLopHoc}
                         onChangeText={(tenLopHoc)=>{
                             this.setState({
                                 tenLopHoc:tenLopHoc
                             })
                         }}
                         onBlur={()=>{
                             if(this.state.tenLopHoc.trim() != ''){
                                this.setState({tenLopHocError:true})
                             }
                         }}/>
                    </View>
                    <View  style={styles.items}>
                        <Title title="Giảng viên" error={this.state.giangVienError}/>
                        <TextInput 
                         style={[styles.textInput,{borderColor:(!this.state.giangVienError?"#ff0000":"#000")}]} 
                         placeholder="Nhập tên giảng viên"
                         value={this.state.giangVien}
                         onChangeText={(giangVien)=>{
                             this.setState({
                                giangVien:giangVien
                             })
                         }}
                         onBlur={()=>{
                            if(this.state.giangVien.trim() != ''){
                               this.setState({giangVienError:true})
                            }
                        }}
                         />
                    </View>
                    <View style={styles.items}>
                        <Title title="Ngày học" error={this.state.dateError}/>
                        <DateTimePickerButton
                             borderColor={!this.state.dateError?"#ff0000":"#000"}
                             placeHolder="Chọn ngày"
                             minimumDate={new Date(this.props.course.startedDate)}
                             maximumDate= {new Date(this.props.course.endedDate)}
                             style={{ marginHorizontal:"0%"}}
                             onChange={value=>{
                                 this.setState({date: value.split("/").reverse().join("-").toString()+"T00:00:00.000Z",dateError: true});
                                 }}/>
                    </View>
                    <View  style={[styles.items,{flexDirection:"row",alignItems:"center"}]}>
                        <View style={{flex:3}}>
                            <Title Style={{marginHorizontal:"2%"}} title="Từ " error={this.state.timeFromError}/>
                            <TimePickerButton
                             borderColor={!this.state.timeFromError?"#ff0000":"#000"}
                             placeHolder="Chọn giờ bắt đầu"
                             onChange={value=>{
                                 this.setState({timeFrom: value,timeFromError: true});
                                 {
                                    let from = Date.parse('01/01/2007 ' + this.state.timeFrom);
                                    let to = Date.parse('01/01/2007 ' + this.state.timeTo);
                                    if(from > to){
                                        this.setState({timeTo:'',timeFromToError:true});
                                        this.resetTime.current.resetTime();
                                    }
                                 }}}/>
                        </View>
                        
                        <View style={{flex:3}}>
                            <Title Style={{marginHorizontal:"2%"}} title="Đến " error={this.state.timeToError}/>
                            <TimePickerButton
                             ref={this.resetTime}
                             disable = {this.state.dateFrom == ''? true:false}
                             minimumDate={new Date(this.state.timeFrom)}
                             borderColor={!this.state.timeToError?"#ff0000":"#000"}
                             placeHolder="Chọn giờ kết thúc"
                             onChange={value=>{this.setState({timeTo: value,timeToError: true});
                             {
                                let from = Date.parse('01/01/2007 ' + this.state.timeFrom);
                                let to = Date.parse('01/01/2007 ' + this.state.timeTo);
                                if(from > to){
                                    this.setState({timeFromToError:false});
                                }
                                else{
                                    this.setState({timeFromToError:true});
                                }
                             }}}/>
                        </View>
                    </View>
                    <View style={{paddingHorizontal:"2%"}}>
                        <Text style={{paddingLeft:"2%",fontSize:Sizes.h32,fontWeight:"bold",color:"red",fontStyle:"italic"}}>{this.state.timeFromToError===false?"Giờ bắt đầu không được đứng sau giờ kết thúc":null}</Text>
                    </View>
                    <View style={{flex:2,padding:5}}>
                        <View style={{flex:2}} >
                                <Title title="Tòa nhà" error={this.state.selectedBuildingError}/>
                                <Picker
                                    title={"Danh sách tòa nhà"}
                                    data={this.state.building}
                                    textColor={(this.state.selectedBuildingName==''?"#9f9f9f":"#000")}
                                    style={{borderColor:(!this.state.selectedBuildingError?"#ff0000":"#000")}}
                                    label={this.state.building.buildingName}
                                    placeholder={(this.state.selectedBuildingName==''?"Chọn tòa nhà":this.state.selectedBuildingName)}
                                    onChangeItem={(item,index)=>{
                                        
                                        this.setState({
                                            selectedBuilding:item.key,
                                            selectedBuildingName:item.value,
                                            selectedBuildingError: true,
                                        });
                                        
                                        this.setState(prevState=>{
                                            let convertArray = this.props.building.data[index].room.map(function(obj){
                                                return {key:obj._id,label:obj.roomName, value:obj.roomName};
                                            });
                                            if(prevState.selectedBuilding != this.state.selectedBuilding){
                                                return{
                                                    selectedRoom:'',
                                                    selectedRoomName:'',
                                                    room: convertArray,
                                                }
                                            }
                                        })
                                    }}
                                    position="flex-end"
                                />
                        </View>
                        <View style={[{flex:2,paddingTop:10}]}>
                                <Title title="Phòng" error={this.state.selectedRoomError}/>
                                <Picker
                                    title={"Danh sách phòng"}
                                    data={this.state.room}
                                    noData = {this.state.room===null?true:false}
                                    textColor={(this.state.room==null?"#fff":(this.state.selectedRoomName==''?"#9f9f9f":"#000"))}
                                    style={{borderColor:(!this.state.selectedRoomError?"#ff0000":"#000"),color:"#000",backgroundColor:(this.state.room==null?"#afafaf":"#fff")}}
                                    placeholder={(this.state.selectedRoomName==''?"Chọn phòng":this.state.selectedRoomName)}
                                    onChangeItem={(item)=>{
                                        this.setState({
                                            selectedRoom:item.key,
                                            selectedRoomName:item.value,
                                            selectedRoomError: true,});
                                    }}
                                    position="flex-end"
                                />
                        </View>
                        <View style={{flex:2, alignItems:"flex-end",marginTop:10 }}>
                            <TouchableOpacity style={styles.button} onPress={()=>this.taoKhoaHoc()} >
                                <FontAwesome5 name="save" color="#fff" size={15} style={{padding:10}}/>
                                <Text style={{color:"#fff",fontSize:15,paddingRight:10}}>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = new StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column",
        backgroundColor:"#fff",
    },
    scrollView:{
        padding:20
    },
    textInput:{
        borderWidth:1.1,
        paddingRight:25,
        paddingLeft:10,
        paddingVertical:5,
        backgroundColor:"#fff",
        borderRadius: Sizes.s15,
        fontSize:Sizes.h28,
    },
    items:{
        padding:7,
    },
    button:{
        alignItems:"center",
        flexDirection:"row",
        backgroundColor:"#ff9335",
        borderRadius:9,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        paddingHorizontal:20,
        paddingVertical:5,
        elevation: 5,
    }
})