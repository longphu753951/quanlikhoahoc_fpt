import React,{Component} from 'react';
import {TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import loginContainer from './src/redux/containers/loginContainer';
import courseContainer from './src/redux/containers/courseContainer';
import addCourseContainer from './src/redux/containers/addCourseContainer';
import homeScreen from './src/components/home/HomeScreen';
import changeCourseContainer from "./src/redux/containers/changeCourseContainer";
import classContainer from "./src/redux/containers/classContainer";
import addClassContainer from "./src/redux/containers/addClassContainer";
import changeClassContainer from "./src/redux/containers/changeClassContainer";
import NavigationService from "./NavigationService";
const AppNavigator = createStackNavigator(
  {
    LogIn:{
      screen: loginContainer,
      navigationOptions:()=>({
        headerShown:false,
      }),
    },
     
    Home:{
      screen: homeScreen,
      navigationOptions:()=>({
        headerShown:false,
      }),
    },
    QLKH:{
      screen:courseContainer,
      navigationOptions:({navigation})=>({
        title:"Quản lý khóa học",
        headerTitleAlign:"center",
        headerTintColor:"#2F4155",
        headerLeft:() =>(
        <TouchableOpacity onPress={()=>{
          navigation.pop();
          navigation.navigate('Home')}}>
            <FontAwesome5 name={'chevron-left'} style={{padding:20, fontSize:20, color:"#c1c8d1"}}/>
        </TouchableOpacity>),
        headerRight:() =>(
        <TouchableOpacity onPress={()=>{
          navigation.pop();
          navigation.navigate('ADDKH')}}>
          <FontAwesome5 name={'plus'} style={{padding:20, fontSize:20, color:"#c1c8d1"}}/>
        </TouchableOpacity>),
      }),
    },
    QLBH:{
      screen:classContainer,
      navigationOptions:({navigation})=>({
        title:"Quản lý buổi học",
        headerTitleAlign:"center",
        headerTintColor:"#2F4155",
        headerLeft:() =>(
        <TouchableOpacity onPress={()=>{
          navigation.pop();
          navigation.navigate('QLKH')}}>
            <FontAwesome5 name={'chevron-left'} style={{padding:20, fontSize:20, color:"#c1c8d1"}}/>
        </TouchableOpacity>),
        headerRight:() =>(
        <TouchableOpacity onPress={()=>{
            
            navigation.navigate('ADDBH')}}>
          <FontAwesome5 name={'plus'} style={{padding:20, fontSize:20, color:"#c1c8d1"}}/>
        </TouchableOpacity>),
      }),
    },
    ADDKH:{
      screen: addCourseContainer,
      navigationOptions:({navigation})=>({
        title:"Tạo mới khóa học",
        headerTitleAlign:"center",
        headerTintColor:"#2F4155",
        headerLeft:() =>(<TouchableOpacity onPress={()=>{
          navigation.pop();
          navigation.navigate('QLKH')}}>
          <FontAwesome5 name={'chevron-left'} style={{padding:20, fontSize:20, color:"#c1c8d1"}}/></TouchableOpacity>),
      })
    },
    ADDBH:{
      screen: addClassContainer,
      navigationOptions:({navigation})=>({
        title:"Tạo mới Buổi học",
        headerTitleAlign:"center",
        headerTintColor:"#2F4155",
        headerLeft:() =>(<TouchableOpacity onPress={()=>{
          navigation.pop();
          navigation.navigate('QLBH')}}>
          <FontAwesome5 name={'chevron-left'} style={{padding:20, fontSize:20, color:"#c1c8d1"}}/></TouchableOpacity>),
      })
    },
    CHANGEKH:
    {
      screen: changeCourseContainer,
      navigationOptions:({navigation})=>({
        title:"Thay đổi khóa học",
        headerTitleAlign:"center",
        headerTintColor:"#2F4155",
        headerBackImage:() =>(<FontAwesome5 onPress={()=>{
          navigation.navigate('QLKH')}}
          name={'chevro-left'} style={{padding:10, fontSize:20, color:"#c1c8d1"}}/>),
      })
    },
    CHANGEBH:{
      screen: changeClassContainer,
      navigationOptions:({navigation})=>({
        title:"Thay đổi buổi học",
        headerTitleAlign:"center",
        headerTintColor:"#2F4155",
        headerBackImage:() =>(<FontAwesome5 onPress={()=>{
          navigation.navigate('QLBH')}}
          name={'chevron-left'} style={{padding:10, fontSize:20, color:"#c1c8d1"}}/>),
      })
    }
  },
  {
    initialRouteName: 'LogIn',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer ref={navigatorRef=>{
      NavigationService.setTopLevelNavigator(navigatorRef);
    }}/>;
  }
}