import { arrayIsEmpty, objectIsNull } from '@dungdang/react-native-basic/src/Functions';
import React, {Component} from 'react';
import {StyleSheet,SafeAreaView,FlatList,View,ActivityIndicator } from 'react-native';
import FlatListItem from '../../redux/containers/FLIKHContainer';
import Snackbar from 'react-native-snackbar';


export default class QlkhScreen extends Component{
    constructor(props){
        super(props);
        this.state=({
            loading:false,
            nullCourse:false,
        })
    }

    async componentDidMount(){
        this.props.getCourseAction();
       
    }

    componentDidUpdate(prevProps){
        if(prevProps.course != this.props.course){
            this.setState({
                loading: false,
            })
            if(!objectIsNull(this.props.course)){
                if(!arrayIsEmpty(this.props.course.data)){
                    this.setState({
                        data: this.props.course.data,
                        loading: true,
                        nullCourse:false,
                    })
                }
                else{
                    this.setState({
                        nullCourse:true,
                    })
                }
            }
        }

        if(this.props.deleteCourse != prevProps.deleteCourse){
            this.props.getCourseAction();
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
                style={styles.flatList} data={this.state.data}
                    renderItem={({item})=>{
                        return (<FlatListItem item={item}/>)
                }}
                keyExtractor ={item=>item.course_id}/>):this.state.nullCourse==true?(
                    <View style={{flex: 1,justifyContent: "center"}}>
                        <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                            <FontAwesome5 name={'frown'} solid={true} color='#aaaaaa' size={Sizes.h100} style={styles.icon}/>
                            <Text style={{fontSize:Sizes.h34,color:"#aaaaaa",fontWeight:"bold"}}>Không tìm thấy khóa học nào</Text>
                        </View>
                    </View>
                ):(
                    (
                        <View style={{flex: 1,justifyContent: "center"}}>
                            <ActivityIndicator size="large" color="orange" />
                        </View>
                    )
                )}
                
            </View>
        )
    }
}

const styles = new StyleSheet.create({
    container:{
        flex: 1,
        
    },
    flatList:{
        flexDirection:"column",
        flex:1,
        marginBottom:5,
    }
})