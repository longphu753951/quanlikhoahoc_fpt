import React,{PureComponent} from 'react';
import {Text,View,TouchableOpacity,Alert} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Menu,{MenuItem} from "react-native-material-menu";
import Sizes from '../../res/values/Sizes';


export default class menu extends PureComponent{
    constructor(props){
        super(props);
    }
    _menu = null;
 
    setMenuRef = ref => {
        this._menu = ref;
    };
    
    changeMenu = () => {
        this.props.toChangeClass();
        this._menu.hide();
        
    };
    xoaOption = () => {
        Alert.alert("Thông báo",
        "Bạn có chắc là muốn xóa không ?",
        [
            {
                text: "Không",
                onPress:()=>{console.log("không xóa")},
                style:"cancel"
            },
            {
                text: "Có",
                onPress: ()=>{
                    this.props.toDeleteClass();
                    console.log("đã xóa")
                }
            }
        ])
        this._menu.hide();
    };
    
    showMenu = () => {
        this._menu.show();
    };

    render(){
        return(
            <TouchableOpacity style={[{alignItems: 'center', justifyContent: 'flex-start'},this.props.style]}>
                    <Menu
                    ref={this.setMenuRef}
                    button={<TouchableOpacity onPress={this.showMenu} style={{paddingTop:"22%",paddingHorizontal:"30%"}}>
                        <FontAwesome5  name={'ellipsis-v'} color="#858585" size={Sizes.h48} />
                    </TouchableOpacity>}
                    >
                        <MenuItem onPress={this.changeMenu}>Sửa</MenuItem>
                        <MenuItem onPress={this.xoaOption}>Xóa</MenuItem>
                    </Menu>
            </TouchableOpacity>
        )
    }
}