import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, AsyncStorage, StatusBar, WebView } from 'react-native';
import { Button,FormInput } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

export default class Home extends Component{

  constructor(props){
    super(props)
    StatusBar.setBarStyle('light-content', true);
    console.log("Home----constructor");
  }

  componentWillMount() {
    console.log("Home----componentWillMount");
  }
  onClickPostpackage(){
    try {
      const value = AsyncStorage.getItem('user_id',(err, result) => {
            if (result !== null && result!== undefined && result !== '') {
              Actions.PostPackageScreen();
            }else {
              Actions.login();
            }
        });
    } catch (error) {

    }
  }
  onclickTraveling(){
    try {
      const value = AsyncStorage.getItem('user_id',(err, result) => {
            if (result !== null && result!== undefined && result !== '') {
              Actions.TravelPlanScreen();
            }else {
              Actions.login();
            }
        });
    } catch (error) {

    }
  }
  render(){
    return(
      <View style={{flex:1,backgroundColor:'white',flexDirection:'column',justifyContent:'center'}}>
        <View style={{flex:.7,backgroundColor:'#6945D1',alignItems:'center',justifyContent:'center'}}>
          <Image source={require('./images/delivery.png')}  style={{marginTop:30}}/>
          <Text style={{fontWeight:'bold', fontSize:22, marginTop:10, color:'white'}}>What are you doing today?</Text>
          <Text style={{fontSize:15, marginTop:5, color:'white',alignSelf:'center',textAlign:'center',justifyContent:'center'}}>Share your travel plan and packges for delivery with our community to save your money.</Text>
      </View>
        <View style={{flex:.3}}>
          <View style={{flex:.5,borderBottomWidth:.5,justifyContent:'center',marginLeft:40,marginRight:40}}>

            <Button
              rounded
              buttonStyle={{backgroundColor: '#6945D1'}}
              textStyle={{textAlign: 'center',fontWeight:'500'}}
              title={`Sending`}
              onPress={()=> this.onClickPostpackage()}
              />

          </View>
          <View style={{flex:.5,justifyContent:'center',marginLeft:40,marginRight:40}}>

            <Button
              rounded
              buttonStyle={{backgroundColor: '#232323'}}
              textStyle={{textAlign: 'center',fontWeight:'500'}}
              title={`Travelling`}
              onPress={()=> this.onclickTraveling()}
              />
          </View>
        </View>
      </View>
    )
  }
}
