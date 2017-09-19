import React, { Component } from 'react'
import { View,Text,TextInput,ScrollView,TouchableOpacity,Image } from 'react-native';
import { Button,FormInput } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
export default class Home extends Component{
  render(){
    return(
      <View style={{flex:1,backgroundColor:'white',flexDirection:'row',justifyContent:'center'}}>
        <View style={{flex:.8}}>
          <View style={{flex:.5,borderBottomWidth:.5,justifyContent:'center'}}>
            <View style={{flex:.5,justifyContent:'flex-end',paddingLeft:40,paddingRight:40}}>
              <Button
              raised
              buttonStyle={{backgroundColor: '#ff3333'}}
              textStyle={{textAlign: 'center',fontWeight:'500'}}
              title={`Post a Parcel`}
              onPress={()=> Actions.PostPackageScreen()}
              />
            </View>
          </View>
          <View style={{flex:.5,justifyContent:'center'}}>
            <View style={{flex:.5,justifyContent:'flex-start',paddingLeft:40,paddingRight:40}}>
              <Button
              raised
              buttonStyle={{backgroundColor: '#ff3333'}}
              textStyle={{textAlign: 'center',fontWeight:'500'}}
              title={`Pick-up & Travel`}
              onPress={()=>alert("Parcel")}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}
