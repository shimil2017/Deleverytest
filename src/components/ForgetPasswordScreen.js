import React, { Component } from 'react'
import { View,Text,TextInput,ScrollView,TouchableOpacity,Image,KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { Button,FormInput } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/EvilIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { forget,loadingStarted} from '../actions/ForgetAction';

const mapStateToProps = ({ ForgetReducer }) => {
  return {
    forgetResponse: ForgetReducer.forgetResponse,
    isLoading: ForgetReducer.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ forget,loadingStarted }, dispatch)
}

class Forget extends Component{
  constructor(props){
    super(props)
    this.state={
      email: '',
    }
  }
  submit(){
    if(this.state.email==='')
      alert("Please enter email")
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email))
      alert("Invalid email")
    else{
      this.props.loadingStarted();
      this.props.forget(this.state.email);
    }
  }
  render(){
    return(
      // <KeyboardAwareScrollView ref='scroll' style={{backgroundColor:'red'}}>
        <Image
        source={require('./images/login1_bg.png')}
        style={{flex:1,width:undefined,height:undefined}}>
        <View style={{flex:1}}>
          <View style={{flex:0.5,justifyContent:'center',paddingTop:30,paddingLeft:90,paddingRight:90}}>
            <Image
            style={{flex:.7,width:undefined,height:undefined,backgroundColor:'#3399ff'}}
            source={require('./images/Microsoft-Logo-icon-png-Transparent-Background-768x768.png')}>
            </Image>
          </View>
          <View style={{flex:0.5,paddingLeft:30,paddingRight:30,justifyContent:'space-around',}}>
              <View style={{flex:0.2,borderBottomColor:'#d9d9d9',borderBottomWidth:.5,flexDirection:'row'}}>
                <View style={{flex:.1,justifyContent:'center',alignItems:'flex-end'}}>
                  <Icon name="envelope" size={30} color='#d9d9d9' style={{backgroundColor:'transparent'}} />
                </View>
                <View style={{flex:.9,justifyContent:'center'}}>
                  <FormInput
                  onChangeText={(text) => this.setState({email:text})}
                  placeholder='E-mail'
                  placeholderTextColor='#d9d9d9'
                  style={{color:'#d9d9d9'}}
                  containerStyle={{borderBottomColor:'transparent'}}
                  underlineColorAndroid='transparent'
                  keyboardType='email-address'
                  />
                </View>
              </View>
              <View style={{flex:0.7,justifyContent:'flex-start'}}>
                <Button
                raised
                buttonStyle={{backgroundColor: '#00cccc', borderRadius:5}}
                textStyle={{textAlign: 'center',fontWeight:'500'}}
                title={`Submit`}
                onPress={()=>this.submit()}
                />
              </View>
              <ActivityIndicator
                size='large'
                color='#3f51b5' animating={this.props.isLoading}
                style={{ position:'absolute', alignItems: 'center', alignSelf: 'center' ,marginTop: window.height/2-100, left: window.width/2-35 }}
              />
          </View>
          </View>
        </Image>
      // </KeyboardAwareScrollView>
    )
  }
}
export default connect(mapStateToProps,mapDispatchToProps )(Forget);
