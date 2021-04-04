import { arrayIsEmpty, objectIsNull } from '@dungdang/react-native-basic/src/Functions';
import React, {Component} from 'react';
import {StyleSheet,FlatList,View,ActivityIndicator,Text } from 'react-native';
import Sizes from "../../res/values/Sizes";
import FlatListItem from '../../redux/containers/FLBHContainer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Snackbar from 'react-native-snackbar';

export default class QlkhScreen extends Component{
    constructor(props){
        super(props);
        this.state=({
            id:null,
            loading:false,
            nullClass:false,
        })
    }

    async componentDidMount(){
       
       const { navigation } = this.props;
       await this.setState({
           id: navigation.getParam('id'),
       });
    }

    componentDidUpdate(prevProps){
        if(prevProps.class != this.props.class){
            this.setState({
                loading: false,
            })
            if(!objectIsNull(this.props.class)){
                if(!arrayIsEmpty(this.props.class.data)){
                    
                    this.setState({
                        data: this.props.class.data,
                        loading: true,
                        nullClass:false,
                    })
                }
                else{
                    this.setState({
                        nullClass:true,
                    })
                }
            }
        }

        if(this.props.deleteClass != prevProps.deleteClass){
            
            Snackbar.show({
                text: 'Xóa thành công',
                duration: Snackbar.LENGTH_SHORT,
              });
        }
    }

    render(){
        return(
            <View style={styles.container}>
                {this.state.loading == true? (
                <FlatList
                ListHeaderComponent={()=><Text style={styles.title}>{this.props.course.courseName}</Text>}
                style={styles.flatList} data={this.state.data}
                    renderItem={({item})=>{
                        return (<FlatListItem item={item}/>)
                }}
                keyExtractor ={item=>item.classId}/>):this.state.nullClass == true?(
                <View style={{flex: 1,justifyContent: "center"}}>
                    <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                        <FontAwesome5 name={'frown'} solid={true} color='#aaaaaa' size={Sizes.h100} style={styles.icon}/>
                        <Text style={{fontSize:Sizes.h34,color:"#aaaaaa",fontWeight:"bold"}}>Không tìm thấy khóa học nào</Text>
                    </View>
                </View>
                ):(
                    
                        <View style={{flex: 1,justifyContent: "center"}}>
                            <ActivityIndicator size="large" color="orange" />
                        </View>
                    
                )}
            </View>
        )
    }
}

const styles = new StyleSheet.create({
    container:{
        flex: 1,
    },
    title:{
        fontSize:Sizes.h40,
        paddingHorizontal:"2%",
        fontWeight:"bold",
        color:"#0090D7",
        paddingBottom: "2%",
        paddingTop:"3%",
    },
    flatList:{
        flexDirection:"column",
        flex:1,
        marginBottom:5,
    }
})