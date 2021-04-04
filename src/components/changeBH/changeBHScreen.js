import React,{Component} from 'react';
import {ScrollView,SafeAreaView,Text,TextInput,TouchableOpacity, View, StyleSheet, Alert,KeyboardAvoidingView} from 'react-native';
import Picker from "../picker";
import TimePickerButton from "../TimePickerButton";
import DateTimePickerButton from "../DateTimePickerButton";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Title from "../title";
import moment from 'moment';
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
            courseId:'',
            classId:'',
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
        });
        this.resetTime = React.createRef();
        this.thayDoiLopHoc = this.thayDoiLopHoc.bind(this);
    }

    componentDidMount(){
        this.props.getBuildingRoomAction();
        const { navigation } = this.props;
        var a= navigation.getParam('data');

        this.setState({
            courseId:a.courseId,
            classId:a.classId,
            tenLopHoc:a.className,
            giangVien: a.trainer,
            timeTo:a.endedTime,
            date:a.date,
            timeFrom:a.startedTime,
            selectedRoomName:a.roomName,
            selectedRoom:a.roomId,
            selectedBuilding: a.buildingId,
            selectedBuildingName:a.buildingName,
        });
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



    thayDoiLopHoc(){
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
        this.props.postChangeClassAction(this.state.classId,className,trainer,date,startedTime,endedTime,buildingId,roomId);
    }

    async componentDidUpdate(prevProps){
        if(prevProps.building != this.props.building){
            
            if(!objectIsNull(this.props.building)){
                if(!arrayIsEmpty(this.props.building.data)){
                    var convertArray = this.props.building.data.map(function(obj){
                        return {key:obj._id,label:obj.buildingName, value:obj.buildingName};
                    });
                    await this.setState({building:convertArray});
                    for(let i=0;i <this.state.building.length;i++){
                        if(this.state.selectedBuilding=== this.state.building[i].key){
                            let convertArray = this.props.building.data[i].room.map(function(obj){
                                return {key:obj._id,label:obj.roomName, value:obj.roomName};
                            });
                            this.setState({
                                room: convertArray,
                            })
                            break;
                        }
                    }
                }
               
            }
        }

        if(prevProps.changeClass != this.props.changeClass){
            if(this.props.changeClass.result.resultCode === -1){
                Alert.alert("Lỗi",this.props.changeClass.result.message);
            }
            if(this.props.changeClass.result.resultCode === 1){
                this.props.getClassByCourseAction(this.state.courseId);
                Alert.alert("Thông báo",this.props.changeClass.result.message, 
               [{
                    text: "OK",
                    onPress: ()=>{
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
                        
                         onChangeText={(tenLopHoc)=>{
                             this.setState({
                                 tenLopHoc:tenLopHoc
                             })
                         }}
                         onBlur={()=>{
                             if(this.state.tenLopHoc.trim() != ''){
                                this.setState({tenLopHocError:true})
                             }
                         }}>
                         <Text>{this.state.tenLopHoc}</Text>
                     </TextInput>
                    </View>
                    <View  style={styles.items}>
                        <Title title="Giảng viên" error={this.state.giangVienError}/>
                        <TextInput 
                         style={[styles.textInput,{borderColor:(!this.state.giangVienError?"#ff0000":"#000")}]} 
                         placeholder="Nhập tên giảng viên"
                         
                         onChangeText={(giangVien)=>{
                             this.setState({
                                giangVien:giangVien
                             })
                         }}
                         onBlur={()=>{
                            if(this.state.giangVien.trim() != ''){
                               this.setState({giangVienError:true})
                            }
                        }}>
                        <Text>{this.state.giangVien}</Text>
                    </TextInput>
                    </View>
                    <View style={styles.items}>
                        <Title title="Ngày học" error={this.state.dateError}/>
                        <DateTimePickerButton
                             borderColor={!this.state.timeFromError?"#ff0000":"#000"}
                             placeHolder={moment(this.state.date).format('DD/MM/YYYY')}
                             defaultItem= {this.state.date}
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
                             placeHolder={this.state.timeFrom==''?"Chọn giờ kết thúc":this.state.timeFrom}
                             defaultItem= {this.state.timeFrom}
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
                             placeHolder={this.state.timeTo==''?"Chọn giờ kết thúc":this.state.timeTo}
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
                        <Title title="Tòa nhà"/>
                                <Picker
                                    defaultItem={{key:this.state.selectedBuilding,label:this.state.selectedBuildingName, value:this.state.selectedBuildingName}}
                                    data={this.state.building}
                                    title={"Danh sách tòa nhà"}
                                    style={{borderColor:(!this.state.selectedBuildingError?"#ff0000":"#000")}}
                                    placeholder={this.state.selectedBuildingName}
                                    position="flex-end"
                                    onChangeItem={(item,index)=>{
                                        
                                        this.setState({
                                            selectedBuilding:item.key,
                                            selectedBuildingName:item.value,
                                        });
                                        this.setState(prevState=>{
                                            if(prevState.selectedBuilding != this.state.selectedBuilding){
                                                let convertArray = this.props.building.data[index].room.map(function(obj){
                                                    return {key:obj._id,label:obj.roomName, value:obj.roomName};
                                                });
                                                return{
                                                    selectedRoom:'',
                                                    selectedRoomName:'',
                                                    room: convertArray,
                                                }
                                            }
                                        })
                                    }}
                                />
                        </View>
                        <View style={[{flex:2,paddingTop:10}]}>
                        <Title title="Phòng"/>
                                <Picker
                                    data={this.state.room}
                                    title={"Danh sách phòng"}
                                    style={{borderColor:(!this.state.selectedRoomError?"#ff0000":"#000")}}
                                    placeholder={this.state.selectedRoomName==''?"Chọn phòng":this.state.selectedRoomName}
                                    position="flex-end"
                                    defaultItem={{key:this.state.selectedRoom,label:this.state.selectedRoomName, value:this.state.selectedRoomName}}
                                    onChangeItem={(item)=>{
                                        this.setState({
                                            selectedRoom:item.key,
                                            selectedRoomName:item.value,
                                            selectedRoomError: true,});
                                    }}
                                />
                        </View>
                        <View style={{flex:2, alignItems:"flex-end",marginTop:10 }}>
                            <TouchableOpacity style={styles.button} onPress={()=>this.thayDoiLopHoc()} >
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