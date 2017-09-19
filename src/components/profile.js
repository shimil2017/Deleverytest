import React, { Component } from 'react'
import { View,Text,TextInput,ScrollView,TouchableOpacity,Image } from 'react-native';
import { Button,FormInput } from 'react-native-elements';

export default class Profile extends Component{
  render(){
    return(
      <View style={{flex:1,backgroundColor:'green'}}>
        <Text>Settings</Text>
      </View>
    )
  }
}
