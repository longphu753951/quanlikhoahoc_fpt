import React, {Component} from "react";
import {StyleSheet,SafeAreaView,View,Text,TouchableOpacity} from "react-native";

export default class HomeScreen extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={{flex:1,alignItems:"center",justifyContent:"center", backgroundColor:"#fff"}}>
                <TouchableOpacity style={styles.button} onPress={()=>
                {
                    this.props.navigation.pop();
                    this.props.navigation.navigate('QLKH');
                }}>
                            <Text style={{color:"#fff",fontSize:20,paddingVertical:15}}>Quản Lý Khóa Học</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} 
                onPress={()=>{
                    this.props.navigation.pop();
                    this.props.navigation.navigate('LogIn');}}>
                            <Text style={{color:"#fff",fontSize:20,paddingVertical:15}}>Đăng Xuất</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = new StyleSheet.create({
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
        width:"50%",
        marginBottom:20,
    }
})