import React,{Component} from 'react';
import {View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions} from 'react-native';
     import { Container, Header, Content, Thumbnail,Form,Item,Label,Input,Card,CardItem,Right,Left,Body,Center} from 'native-base';
     import Icon from 'react-native-vector-icons/MaterialIcons';
const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;

export default class User extends Component{

    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return(
        <View style={{flex:1}}>
            
            <Card style={{borderRadius:10,height:20,flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
            <View style={{flex:.25}}>
            <Thumbnail large
                     style={{borderColor:'white',borderWidth:2}}
                     source={{uri: 'https://i.pinimg.com/736x/d8/cd/96/d8cd965dc305ea0642bf78db9dcea2a3--flower-girl-crown-flower-girls.jpg'}}/>
                     
           
            </View>
            <View style={{flex:.6,flexDirection:'column'}}>
                <View style={{flex:.25,flexDirection:'column'}}>
                    <Text style={{fontSize:18}}>Box package</Text>
                </View>
                <View style={{flex:.25,flexDirection:'row'}}>
                    <View style={{flex:.1,flexDirection:'column'}}>
                    <Icon name="straighten" size={20} color='grey' style={{backgroundColor:'transparent'}} /> 
                    </View>
                    <View style={{flex:.9,flexDirection:'column'}}>
                    <Text style={{fontSize:15,color:'grey'}}> 45CM X 25CM</Text>
                    </View>
                </View>
                <View style={{flex:.25,flexDirection:'row'}}>
                    <View style={{flex:.1,flexDirection:'column'}}>
                    <Icon name="scanner" size={20} color='grey' style={{backgroundColor:'transparent'}} /> 
                    </View>
                    <View style={{flex:.9,flexDirection:'column'}}>
                    <Text style={{fontSize:15,color:'grey'}}> 2.5KG</Text>
                    </View>
                </View>
               
               </View>
                <View style={{flex:.2,justifyContent:'center',alignItems:'center'}}>
                   <Text style={{fontSize:23,color:'red'}}> $57</Text>
                </View>
            </Card>

            <Card style={{borderRadius:10,height:20,flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
            <View style={{flex:.25}}>
            <Thumbnail large
                     style={{borderColor:'white',borderWidth:2}}
                     source={{uri: 'https://i.pinimg.com/736x/d8/cd/96/d8cd965dc305ea0642bf78db9dcea2a3--flower-girl-crown-flower-girls.jpg'}}/>
            </View>
            <View style={{flex:.6,flexDirection:'column'}}>
                <View style={{flex:.25,flexDirection:'column'}}>
                    <Text style={{fontSize:18}}>Box package</Text>
                </View>
                <View style={{flex:.25,flexDirection:'row'}}>
                    <View style={{flex:.1,flexDirection:'column'}}>
                    <Icon name="straighten" size={20} color='grey' style={{backgroundColor:'transparent'}} /> 
                    </View>
                    <View style={{flex:.9,flexDirection:'column'}}>
                    <Text style={{fontSize:15,color:'grey'}}> 45CM X 25CM</Text>
                    </View>
                </View>
                <View style={{flex:.25,flexDirection:'row'}}>
                    <View style={{flex:.1,flexDirection:'column'}}>
                    <Icon name="scanner" size={20} color='grey' style={{backgroundColor:'transparent'}} /> 
                    </View>
                    <View style={{flex:.9,flexDirection:'column'}}>
                    <Text style={{fontSize:15,color:'grey'}}> 2.5KG</Text>
                    </View>
                </View>
               
               </View>
                <View style={{flex:.2,justifyContent:'center',alignItems:'center'}}>
                   <Text style={{fontSize:23,color:'red'}}> $145</Text>
                </View>
            </Card>
            <View style={{flex:.7}}>
                </View>
        </View>
        )
    }
}