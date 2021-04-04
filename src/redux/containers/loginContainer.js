import React,{Component} from "react";
import LoginScreen from "../../components/login/loginScreen";
import {loginAction} from "../actions/index";

import {connect} from "react-redux";

const mapStateToProps = state =>{
    return{
        loginReducer: state.loginReducer
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        loginAction:(user, password)=>{
            dispatch(loginAction(user, password));
        }
    }
}

class LoginContainer extends Component{
    render(){
        return(
            <LoginScreen {...this.props}></LoginScreen>
        )
    }
}

export default LoginContainer =  connect(mapStateToProps,mapDispatchToProps)(LoginContainer);