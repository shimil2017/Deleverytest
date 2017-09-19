import React, { Component } from 'react'
import { View,Text,TextInput,ScrollView,TouchableOpacity,Image,KeyboardAvoidingVie, ActivityIndicator, ImageBackground } from 'react-native';
import { Button,FormInput, SocialIcon } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/EvilIcons'
import { Actions } from 'react-native-router-flux'
import { addPackage, loadingStarted,loginFB } from '../actions/LoginAction';
import PropTypes from 'prop-types';
var { FBLogin, FBLoginManager } = require('react-native-facebook-login');

const mapStateToProps = ({ LoginReducer }) => {
  return {
    email: LoginReducer.email,
    password: LoginReducer.password,
    login: LoginReducer.login,
    loginResponse: LoginReducer.loginResponse,
    loading: LoginReducer.loading
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ login,loadingStarted,loginFB }, dispatch)

}
class Loginpage extends Component{
  constructor(props){
    super(props)
    this.state={
      email: '',
      pass: '',
      user: null
    }
  }
  submit(){
    if(this.state.email === '')
      alert("Please enter email")
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email))
      alert("Invalid email")
    else if(this.state.pass === '')
      alert("Please enter password")
    else
      {
        //Actions.drawer();
        this.props.loadingStarted();
        this.props.login(this.state.email, this.state.pass,"1");
      }
  }
  fbLogin(username,password,facebook_id,fname,lname)
  {

   var data={
     'username':username,
     'password':'',
     'email':username,
     'first_name':fname,
     'last_name':lname,
     'loginType':2,
     'facebook_id':facebook_id,

  }
  }
onLoginWithFB(){
 let _this = this;
//this.props.ShowLoader();
   FBLoginManager.loginWithPermissions(["email","public_profile"], function(error, data){
     if (!error) {
       var UserFbId = data['credentials']['userId'];
       var Fbtoken = data['credentials']['token'];
       _this.GraphApiCall(UserFbId,Fbtoken);

     } else {
       console.log("Error: ", error);
      }
    })
}
GraphApiCall(UserFbId,Fbtoken){
   let _this = this;
      var api = `https://graph.facebook.com/v2.3/${UserFbId}?fields=name,first_name,last_name,email,picture&access_token=${Fbtoken}`;

       fetch(api)

       .then((response) => response.json())
        .then((responseData) => {
            console.log('fbInfo'+JSON.stringify(responseData));
            let jsonV = JSON.stringify(responseData);
            console.log('fbInfo'+responseData.first_name);
            _this.props.loadingStarted();
            _this.props.loginFB(responseData.first_name,responseData.last_name,responseData.email,responseData.id);
          // _this.fbLogin(responseData.email,'password',responseData.id,responseData.first_name,responseData.last_name);
       }).catch((error) => {
           console.log("error is coming",error);
         });

  }

  render(){
            var _this = this;
    return(

        <ImageBackground
        source={require('./images/login1_bg.png')}
        style={{flex:1,width:undefined,height:undefined}}>
          <View style={{flex:0.5,justifyContent:'center',paddingTop:30,paddingLeft:90,paddingRight:90}}>
            <Image
            style={{flex:.7,width:undefined,height:undefined,backgroundColor:'#3399ff'}}
            source={require('./images/Microsoft-Logo-icon-png-Transparent-Background-768x768.png')}>
            </Image>
          </View>
          <View style={{flex:0.15,paddingLeft:30,paddingRight:30,justifyContent:'space-around',}}>
              <View style={{flex:0.45,borderBottomColor:'#d9d9d9',borderBottomWidth:.5,flexDirection:'row'}}>
                <View style={{flex:.1,justifyContent:'center',alignItems:'flex-end'}}>
                  <Icon name="envelope" size={30} color='#d9d9d9' style={{backgroundColor:'transparent'}} />
                </View>
                <View style={{flex:.9,justifyContent:'center'}}>
                  <FormInput
                  onChangeText={(text) => this.setState({email:text})}
                  placeholder='E-mail'
                  keyboardType='email-address'
                  autoCapitalize='none'
                  placeholderTextColor='#d9d9d9'
                  style={{color:'#d9d9d9'}}
                  containerStyle={{borderBottomColor:'transparent'}}
                  underlineColorAndroid='transparent'
                  />
                </View>
              </View>
              <View style={{flex:0.45,borderBottomColor:'#d9d9d9',borderBottomWidth:.5,flexDirection:'row'}}>
                <View style={{flex:.1,justifyContent:'center',alignItems:'flex-end'}}>
                  <Icon name="lock" size={30} color='#d9d9d9' style={{backgroundColor:'transparent'}} />
                </View>
                <View style={{flex:.9,justifyContent:'center'}}>
                  <FormInput
                  onChangeText={(text) => this.setState({pass:text})}
                  placeholder='Password'
                  placeholderTextColor='#d9d9d9'
                  style={{color:'#d9d9d9'}}
                  secureTextEntry={true}
                  containerStyle={{borderBottomColor:'transparent'}}
                  underlineColorAndroid='transparent'
                  />
                </View>
              </View>
          </View>
          <View style={{flex:0.35,paddingTop:20,paddingLeft:10,paddingRight:10}}>
              <View style={{flex:0.4,justifyContent:'center'}}>
                <Button
                raised
                buttonStyle={{backgroundColor: '#00cccc', borderRadius:5}}
                textStyle={{textAlign: 'center',fontWeight:'500'}}
                title={`Sign in`}
                onPress={()=>this.submit()}
                />
              </View>
              <View style={{flex:0.3,justifyContent:'flex-start'}}>
                <SocialIcon
                  title='Sign In With Facebook'
                  button
                  type='facebook'
                  onPress={() => this.onLoginWithFB()}
                />
              </View>
              <View style={{marginTop:10,alignItems:'center'}}>
                <TouchableOpacity onPress={()=> Actions.forgetpassword()}>
                  <Text style={{fontSize:18,color:'#d9d9d9',backgroundColor:'transparent'}}>Forgot your password? </Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop:10, alignItems:'center'}}>
                <TouchableOpacity onPress={()=> Actions.register()}>
                  <Text style={{fontSize:18,color:'#d9d9d9',backgroundColor:'transparent'}}>Don't have an account? </Text>
                </TouchableOpacity>
              </View>
              <ActivityIndicator
                size='large'
                color='#3f51b5' animating={this.props.loading}
                style={{ position:'absolute', alignItems: 'center', alignSelf: 'center' ,marginTop: window.height/2-100, left: window.width/2-35 }}
              />
          </View>
        </ImageBackground>
    )
  }
}
export default connect(mapStateToProps,mapDispatchToProps )(Loginpage);
