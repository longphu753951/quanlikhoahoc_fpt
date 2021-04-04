import React,{Component} from 'react';
import {ScrollView,SafeAreaView,Text,TextInput,TouchableOpacity, View, StyleSheet, Alert,KeyboardAvoidingView} from 'react-native';
import Picker from "../picker";
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
            tenKhoaHoc:'',
            giangVien:'',
            dateFrom:'',
            dateTo:'',
            selectedRoomError:true,
            selectedBuildingError:true,
            tenKhoaHocError:true,
            giangVienError:true,
            dateFromError:true,
            dateToError:true,
            hopLe:true,
        });
        this.taoKhoaHoc = this.taoKhoaHoc.bind(this);
        this.resetDate = React.createRef();
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

    kiemTraTenKhoa(){
        if(this.state.tenKhoaHoc.trim()==''){
            this.setState({tenKhoaHocError:false})
            return false;
        }
        else{
            this.setState({tenKhoaHocError:true})
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
    
    kiemTraDateFrom(){
        if(this.state.dateFrom==''){
            this.setState({dateFromError:false})
            return false;
        }
        else{
            this.setState({dateFromError:true})
            return true;
        }
    }

    kiemTraDateTo(){
        if(this.state.dateTo==''){
           
            this.setState({dateToError:false})
            return false;
        }
        else{
            
            this.setState({dateToError:true})
            return true;
        }
    }
    
    checkFromToDate(from,to){
        var from = new Date(from);
        var to = new Date(to);
        if(from > to){
            this.setState({dateFromError:false});
            this.setState({dateToError:false});
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
        var courseName = this.state.tenKhoaHoc.trim();
        var trainer = this.state.giangVien.trim();
        var startedDate = this.state.dateFrom;
        var endedDate = this.state.dateTo;
        var buildingId = this.state.selectedBuilding;
        var roomId = this.state.selectedRoom;
        if(!this.kiemTraDateFrom() | !this.kiemTraDateTo() | !this.kiemTraGiangVien() | !this.kiemTraPhongHoc() | !this.kiemTraTenKhoa() | !this.kiemTraToaNha() ){
            return;
        }
        
        this.props.postCourseAction(courseName,trainer,startedDate,endedDate,buildingId,roomId);
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
        if(prevProps.course != this.props.course){
            if(this.props.course.resultCode === -1){
                Alert.alert("Lỗi",this.props.course.message);
            }
            if(this.props.course.resultCode === 1){
                Alert.alert("Thông báo",this.props.course.message, 
                [{
                     text: "OK",
                     onPress: ()=>{
                         this.props.navigation.navigate("QLKH");
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
                        <Title title="Tên khóa" error={this.state.tenKhoaHocError}/>
                        <TextInput
                         style={[styles.textInput,{borderColor:(!this.state.tenKhoaHocError?"#ff0000":"#000")}]} 
                         placeholder="Nhập tên khóa học"
                         value={this.state.tenKhoaHoc}
                         onChangeText={(tenKhoaHoc)=>{
                             this.setState({
                                 tenKhoaHoc:tenKhoaHoc
                             })
                         }}
                         onBlur={()=>{
                             if(this.state.tenKhoaHoc.trim() != ''){
                                this.setState({tenKhoaHocError:true})
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
                    <View  style={[styles.items,{flexDirection:"row",alignItems:"center"}]}>
                        <View style={{flex:3}}>
                            <Title Style={{marginHorizontal:"2%"}} title="Từ ngày" error={this.state.dateFromError}/>
                            <DateTimePickerButton
                             borderColor={!this.state.dateFromError?"#ff0000":"#000"}
                             placeHolder="Chọn ngày bắt đầu"
                             onChange={value=>{
                                 this.setState({dateFrom: value.split("/").reverse().join("-").toString()+"T00:00:00.000Z",dateFromError: true});
                                 {
                                    
                                    let from = new Date(this.state.dateFrom);
                                    let to = new Date(this.state.dateTo);
                                    if(from > to){
                                        this.setState({dateTo:''});
                                        this.resetDate.current.resetDate();
                                    }
                                 }}}/>
                        </View>
                        
                        <View style={{flex:3}}>
                            <Title Style={{marginHorizontal:"2%"}} title="Đến ngày" error={this.state.dateToError}/>
                            <DateTimePickerButton
                             ref={this.resetDate}
                             disable = {this.state.dateFrom == ''? true:false}
                             minimumDate={new Date(this.state.dateFrom)}
                             borderColor={!this.state.dateToError?"#ff0000":"#000"}
                             placeHolder="Chọn ngày kết thúc"
                             onChange={value=>(this.setState({dateTo: value.split("/").reverse().join("-").toString()+"T00:00:00.000Z",dateToError: true}))}/>
                        </View>
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
                            <TouchableOpacity style={styles.button} onPress={this.taoKhoaHoc} >
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