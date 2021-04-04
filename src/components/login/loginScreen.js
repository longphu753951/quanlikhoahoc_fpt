import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet,SafeAreaView,Image,TextInput,View,Text,ScrollView,TouchableOpacity,Alert,KeyboardAvoidingView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Size from '../../res/values/Sizes';
import { StackActions, NavigationActions } from 'react-navigation';
import Sizes from '../../res/values/Sizes';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

export default class loginScreen extends Component{
    constructor(props){
        super(props);
        this.state=({
            hidePassword: true,
            userName: '',
            password:'',
            reminder: false,
            logined: false,
            userError: true,
            passwordError:true,
        });
        this.ShowHidePassword = this.ShowHidePassword.bind(this);
        this.ReminderLogin = this.ReminderLogin.bind(this);
        this.storeToken = this.storeToken.bind(this);
        this.ReminderLogin = this.ReminderLogin.bind(this);
        this.rememberUserName = this.rememberUserName.bind(this);
        this.getUserName = this.getUserName.bind(this);
        this.getUserName = this.getUserName.bind(this);
        this.rememberUserOnLoGin = this.rememberUserOnLoGin.bind(this);
    }

    ShowHidePassword(){
        this.setState(prevState=>({hidePassword:!prevState.hidePassword}))
    }

   

    async ReminderLogin(){
        await this.setState(prevState=>({reminder:!prevState.reminder}))
        if (this.state.reminder === true) {
            this.rememberUserName();
        }else{
            this.forgetUser();
        }
    }

    async rememberUserName(){
        try{
            console.log('store');
            await AsyncStorage.setItem('UserName',this.state.userName);
        } catch(error){
            console.log("không lưu được")
        }
    }

    async rememberUserOnLoGin(){
        if(this.state.reminder === true){
            const userName = await AsyncStorage.getItem('UserName');
            if(this.state.userName != userName){
                try{
                   this.rememberUserName();
                }catch(error){
                    console.log(error);
                }
            }
        }
    }

    async getUserName(){
        try{
            const userName = await AsyncStorage.getItem('UserName');
            if(userName !==null){
                console.log("userName");
                return userName;
            }
        }catch(error){
            console.log("không lấy được dữ liệu");
        }
    }

    forgetUser = async()=>{
        try{
            await AsyncStorage.removeItem('UserName');
        }catch(error){
            console.log(error);
        }
    }

    async storeToken(value) {
        try {
          await AsyncStorage.setItem('@storage_Token', value)
        } catch (e) {
          // saving error
        }
    }

    async componentDidMount(){
        
        const userName = await this.getUserName();
        this.setState({
            userName: userName || "",
            reminder : userName ? true: false,
        })
    }

    checkPassword(){
        if(this.state.password==''){
            console.log(this.state.password);
            this.setState({
                passwordError: false,      
            });
            return false;
        }
        this.setState({
            passwordError: true,      
        });
        return true;
    }

    checkUser(){
        if(this.state.userName==''){
            this.setState({
                userError: false,      
            });
            return false;
        }
        this.setState({
            userError: true,      
        });
        return true;
    }

    async dangNhap(){
        if(!this.checkUser()|!this.checkPassword()){
            
               if(!this.state.userError&&!this.state.passwordError){
                    Alert.alert("Lỗi","Vui lòng điền đầy đủ cả tài khoản và mật khẩu")
               }
               else if(!this.state.userError){
                Alert.alert("Lỗi","Vui lòng điền đầy đủ tài khoản");
               }
               else{
                Alert.alert("Lỗi","Vui lòng điền đầy đủ mật khẩu")
               }
            return;
        }
        await this.props.loginAction(this.state.userName, this.state.password);
        this.setState({logined: !this.state.logined});
    }

    componentDidUpdate(prevProps){
        if(prevProps.loginReducer !== this.props.loginReducer){         //Kiểm tra props trước có cùng kiểu dữ liệu và cùng giá trị hay không ?
            if(this.props.loginReducer.resultCode === -1){
                this.setState({logined: false})
                Alert.alert("Lỗi",this.props.loginReducer.message);
            }
            else if(this.props.loginReducer.resultCode === 1){
                let token = this.props.loginReducer.data.token;
                this.storeToken(token);
                this.rememberUserOnLoGin();
                this.props.navigation.dispatch(resetAction); 
                this.setState({logined: false});
            }
            else{
                Alert.alert("Lỗi","Kết nối mạng không thành công, vui lòng thử lại");
            }
        }
        
    }

    render(){
        return(
        <ScrollView
            contentContainerStyle={{justifyContent:"flex-end",alignItems:"center",flexGrow: 1}}
            style={{ backgroundColor: 'white'}}>
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={require('../../res/images/ic_logo.png')} style={styles.logoFIS}/>
                    <Text style={styles.txtTitle}>
                        FIS INSIGHT PORTAL
                    </Text>
                    <Image source={require('../../res/images/stripe.png')} style={styles.stripe} />
                    <Text style={styles.loginTitle}>ĐĂNG NHẬP HỆ THỐNG</Text>
                </View>
                <View style={styles.inputContainer}>
                        <View style={styles.textInputContainer}>
                            <TextInput
                           
                            value={this.state.userName}
                            placeholder="Nhập username"
                            onChangeText={(userName)=>{
                                if(userName.length <5){
                                    this.setState({userError:false})
                                }
                                else{
                                    this.setState({userError:true})
                                }
                                this.setState({userName:userName});
                            }}
                            style={[styles.textInput,{borderColor:(this.state.userError?"#4f4f4f":"#ff2014")}]}/>
                            <FontAwesome5 style={styles.icon} name={'user'} solid color="#C1C8D1" size={Size.s50}/>
                        </View>
                        <View style={styles.textInputContainer} >
                            <TextInput
                            value={this.state.password}
                            keyboardType="default"
                            placeholder="Nhập password"
                            onChangeText={(password)=>{
                                if(password.length <5){
                                    this.setState({passwordError:false})
                                }
                                else{
                                    this.setState({passwordError:true})
                                }
                                this.setState({password:password});
                            }}
                            secureTextEntry={this.state.hidePassword} 
                            style={[styles.textInput,{borderColor:(this.state.passwordError?"#4f4f4f":"#ff2014")}]}/>
                            <FontAwesome5 style={styles.icon} name={'lock'} solid color="#C1C8D1" size={Size.s50}/>
                            <View>
                                <FontAwesome5 onPress={()=>{this.ShowHidePassword()}} style={styles.showHidePassword} name={this.state.hidePassword == true?"eye-slash":"eye"} solid color="#C1C8D1" size={Size.s50}/>
                            </View>
                    </View>
                        <View style={{flexDirection:"row",paddingLeft:"1%",paddingVertical:"4%",alignItems:"flex-end"}}>
                            <TouchableOpacity onPress={()=>{this.ReminderLogin()}} style={{paddingRight:"3%"}}>
                                <FontAwesome5 name={this.state.reminder ? "check-circle":"circle"}  color="orange" size={Size.h44}/>
                            </TouchableOpacity>
                            <Text style={styles.reminderTest}>Ghi nhớ đăng nhập</Text>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={async ()=>{
                            this.dangNhap();
                        }}>
                            <Text style={{color:"#fff",fontSize:Size.h34,paddingVertical:10}}>Đăng nhập</Text>
                        </TouchableOpacity>
                </View>
               
                <View style={{paddingTop:20,paddingBottom:"10%",Width:'20%',justifyContent:"flex-start",flex:2}}>
                    <Image style={{resizeMode: 'contain',width: '100%',height: undefined,aspectRatio: 2}} source={require("../../res/images/swipe.png")}/>
                </View>
                
            </KeyboardAvoidingView>
            <View style={styles.footer}>
                    <Text style={{color:"#adb3bc", fontSize:Size.h28,paddingTop:"5%"}}>Copyright &#169; 2019, FPT Information System</Text>
            </View>
        </ScrollView>
        )
    }
}

const styles = new StyleSheet.create({
    footer:{
        flexDirection:"row",
        justifyContent:"center",
        position:"relative"
    },
    reminder:{
        flexDirection:"row",
    },
    container:{
        flex:1,
        justifyContent:"flex-end",
        width:"80%",
        flexDirection:"column"
    },
    logoContainer:{
        alignItems: "center",
        flexDirection:"column",
        justifyContent:"flex-end",
        flex:2,
    },
    logoFIS:{
      resizeMode:"contain",
      height: undefined,
      aspectRatio: 6.5,
      margin: 10,
      paddingTop:40,
    },  
    stripe:{
        resizeMode:"contain",
        height: undefined,
        aspectRatio: 60,
        marginBottom: 10,
    }
    ,
    txtTitle:{
        fontSize:Size.s50,
        fontWeight:"bold",
        color:"#586d86",
    },
    loginTitle:{
        fontSize:Size.h42,
        fontWeight:"bold",
        color:"#ff9335",
        paddingTop:"10%"
    },
    inputContainer:{
        flexDirection:"column",
        justifyContent:"flex-start",
        paddingTop:"2%",
        flex:0.2,
    },
    textInputContainer:{
        flexDirection:"row",
        paddingTop: 10,
        alignSelf:"center",
    },
    textInput:{
        backgroundColor: "#E8E9EC",
        color:"#3d3f42",
        flexWrap:"wrap",
        fontSize: Size.h36,
        textAlign:"center",
        flex: 1,
        borderRadius:4,
        borderWidth:1.3,
    },
    icon:{
        padding: 10,
        marginTop:15,
        position:"absolute",
        backgroundColor:"transparent"
    },
    showHidePassword:{
        paddingRight: 5,
        paddingLeft:"40%",
        right:4,
        height:"60%",
        marginTop:15,
        paddingLeft: 10,
        position:"absolute",
        backgroundColor:"#E8E9EC",
        alignSelf:"flex-end",
    },
    reminderTest:{
        fontSize:Size.h36,
        color:"#ff9335",
        fontStyle:"italic",
    },
    button:{
        alignItems:"center",
        backgroundColor:"#ff9335",
        borderRadius:9,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});