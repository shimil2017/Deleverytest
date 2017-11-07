import React, { Component } from 'react'
import { View, TextInput, ScrollView, TouchableOpacity, Image, KeyboardAvoidingVie, StatusBar, Dimensions, ActivityIndicator, ImageBackground } from 'react-native';
import { FormInput, SocialIcon } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import { login, loadingStarted, loginFB } from '../actions/LoginAction';
import PropTypes from 'prop-types';
import { Container, Content, Form, Item, Input, Label, Button, Text, Spinner } from 'native-base';
var { FBLogin, FBLoginManager } = require('react-native-facebook-login');
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

const window = Dimensions.get('window');
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
var fcmToken = '';
class Loginpage extends Component{
  constructor(props){
    super(props)
    this.state={
      email: '',
      pass: '',
      user: null
    }
    StatusBar.setBarStyle('light-content', true);
  }
  componentDidMount() {
          // iOS: show permission prompt for the first call. later just check permission in user settings
          // Android: check permission in user settings
          FCM.requestPermissions().then(()=>console.log('granted')).catch(()=>console.log('notification permission rejected'));

          FCM.getFCMToken().then(token => {
              console.log("Token====",token);
              //alert(token);
              fcmToken = token;
              // store fcm token in your server

          });

          this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
              // optional, do some component related stuff
          });

          // initial notification contains the notification that launchs the app. If user launchs app by clicking banner, the banner notification info will be here rather than through FCM.on event
          // sometimes Android kills activity when app goes to background, and when resume it broadcasts notification before JS is run. You can use FCM.getInitialNotification() to capture those missed events.
          // initial notification will be triggered all the time even when open app by icon so send some action identifier when you send notification
          FCM.getInitialNotification().then(notif=>{
             console.log(notif)
          });
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
        var deviceType = (Platform.OS === 'ios')? 'ios': 'android';
        this.props.login(this.state.email, this.state.pass, "1", fcmToken, deviceType);
      }
  }
  fbLogin(username,password,facebook_id,fname,lname) {
   var data={
     'username':username,
     'password':'',
     'email':username,
     'first_name':fname,
     'last_name':lname,
     'loginType':2,
     'facebook_id':facebook_id,
     'device_type': fcmToken
  }
}
onLoginWithFB(){
 let _this = this;
//this.props.ShowLoader();
if (Platform.OS === 'android') {
  FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native);
}
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
      var api = `https://graph.facebook.com/v2.3/${UserFbId}?fields=name,first_name,last_name,email,gender,picture.height(1080)&access_token=${Fbtoken}`;

       fetch(api)

       .then((response) => response.json())
        .then((responseData) => {
            console.log('fbInfo'+JSON.stringify(responseData));
            let jsonV = JSON.stringify(responseData);
            console.log('fbInfo'+responseData.first_name);
            _this.props.loadingStarted();
            var deviceType = (Platform.OS === 'ios')? 'ios': 'android';
            _this.props.loginFB(responseData.first_name,responseData.last_name,responseData.email,responseData.id,responseData.picture.data.url,responseData.gender, deviceType ,fcmToken);
          // _this.fbLogin(responseData.email,'password',responseData.id,responseData.first_name,responseData.last_name);
       }).catch((error) => {
           console.log("error is coming",error);
         });

  }

  render(){
            var _this = this;
    return(

      <View style={{ flex: 1, height: window.height,backgroundColor:'white' }}>
        <Container >
          <Content >
            <View style={{ position: 'absolute', flexDirection: 'column', width: window.width, height: window.height/2 }}>
              <View style={{ backgroundColor: '#ffffff', flex: 1 }} />
            </View>
            <Form style={{  padding: 20, borderColor: "#eeeeee", borderWidth: 1, backgroundColor: '#ffffff' }}>
              <Image source={require('./images/logo_login.png')} style={{alignSelf:'center'}}/>
              <Item >
                <Icon name="email" size={25} color='black'/>

                <Input
                  placeholder="Email-id"
                  keyboardType='email-address'
                  placeholderTextColor = "#aaaaaa"
                  autoCapitalize = "none"
                  onChangeText={(text) => this.setState({ email: text })}
                />
              </Item>
              <Item >
                <Icon name="lock" size={25} color='black'/>

                <Input
                  placeholder="Password"
                  placeholderTextColor = "#aaaaaa"
                  autoCapitalize = "none"
                  secureTextEntry = {true}
                  onChangeText={(text) => this.setState({ pass: text })}
                />
              </Item>
              <TouchableOpacity
                style={{ alignItems:"flex-end" }}
                onPress={() => Actions.forgetpassword()}
              >
                <Text style = {{ color: 'black', fontSize: 16, marginTop: 20, justifyContent: "center" }}>
                  Forgot password ?
                </Text>
              </TouchableOpacity>
                <Button
                  style={{
                    backgroundColor: '#6945D1',
                    flex:1,
                    justifyContent: 'center',
                    alignItems:"center",
                    alignSelf:"center",
                    width:300,
                    marginTop:10
                  }}
                  primary
                  rounded
                  onPress={() => this.submit()}
                >
                  <Text >Submit</Text>
                </Button>
              <Text style={{marginTop:10,justifyContent: 'center',
              alignItems:"center",
              alignSelf:"center",}}>or</Text>

              <Button
                primary
                rounded
                style={{
                  backgroundColor: '#3b5998',
                  flex:1,
                  justifyContent: 'center',
                  alignItems:"center",
                  alignSelf:"center",
                  width:300,
                  marginTop:10
                }}
                onPress={() => this.onLoginWithFB()}
              >
                <Text > Login via Facebook </Text>
              </Button>

            </Form>
          </Content>
        </Container>
        <Spinner color='#3f51b5' animating={this.props.loading}
          style={{ alignSelf:'center',position:'absolute', marginTop: window.height/2-100, left: window.width/2-35 }}
        />
      <View
        style={
          {justifyContent: 'center',alignItems:"center",padding:10,marginBottom:20,flexDirection:'row'}}>
      <TouchableOpacity onPress={()=> Actions.register()}>
        <Text >Don't have an account? </Text>
      </TouchableOpacity>
        <TouchableOpacity onPress={()=> Actions.register({fcmToken: fcmToken})}>
          <Text style={{fontWeight:'bold'}}> Sign Up </Text>
        </TouchableOpacity>
      </View>

      </View>

    )
  }
}
export default connect(mapStateToProps,mapDispatchToProps )(Loginpage);

import { StyleSheet, PixelRatio, Platform } from 'react-native';

 export const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  inputStyle: {
    margin: 15,
    height: 40,
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#3f51b5',
    padding: 10,
    margin: 5,
    height: 40,
    flex:1,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems:"center",
    alignSelf:"flex-end"
  },
  registerButton: {
    backgroundColor: '#ef6c00',
    padding: 10,
    margin: 5,
    height: 40,
    flex:1,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems:"center",
    alignSelf:"flex-end"
  },
  container: {
    flex: 1,
    marginTop:60,
    marginBottom:50,
  },
  containerWithoutTabs: {
    flex: 1,
    marginTop:60,
  },
  tabBar: {
    borderTopColor: '#dddddd',
    borderTopWidth: 1 / PixelRatio.get(),
    backgroundColor: '#262626',
    opacity: 0.98
  },
  navigationBarStyle: {
    backgroundColor: 'red',
  },
  navigationBarTitleStyle: {
    color:'#ffffff',
  },
  image: {
    marginTop:200,
    height: 100,
    borderRadius: 50,
    width: 100
  },
  Avatarcontainer:{
    ...Platform.select({
      ios:{
        flex:1,
        height:75,
        width:85,
      },
      android:{
        flex:1,
        height:75,
        width:85,
      }
    })
  },
  icon: {
       color: '#000',
       fontSize: 26,
       borderColor: '#000033',
       borderWidth: 1,
       borderRadius: 20,
       width: 20,
       height: Platform.OS == 'ios' ? 30 : 40,
       justifyContent: 'center',
       alignItems: 'center',
       textAlign: 'center',
       paddingTop: Platform.OS == 'ios' ? 10 : 0
   },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
};
