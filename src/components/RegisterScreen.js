import React, { Component } from 'react'
import { View, TouchableOpacity, Image, ActivityIndicator, StyleSheet, PixelRatio, Dimensions, Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Container, Content, Form, Item, Input, Button, Text } from 'native-base';
import PhoneNumberPicker from 'react-native-country-code-telephone-input'
const window = Dimensions.get('window');
import { signUp, loadingStarted } from '../actions/SignUpActions';

var ImagePicker = require('react-native-image-picker');
var radio_props = [
  { label: 'Male ', value: 'male' },
  { label: 'Female', value: 'female' }
];
var options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
const mapStateToProps = ({ SignUpReducer }) => {

  return {
    registerResponse: SignUpReducer.userData,
    loading: SignUpReducer.loading,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ signUp, loadingStarted }, dispatch)
};
class SignUpPage extends Component{
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      fname: '',
      lname: '',
      confirmPassword: '',
      gender: '',
      phone: '',
      base64: '',
      avatarSource: null,
      countryName: '',
      callingCode: '',
      phoneNo: '',
      paypalId: ''
    }
  }
  PhoneNumberPickerChanged(country, callingCode, phoneNumber) {
            this.setState({countryName: country.name, callingCode: callingCode, phone: phoneNumber });
         }
  submit(){
    if(this.state.fname==='')
      alert("Please enter your first name")
    else if(this.state.lname==='')
      alert("Please enter your last name")
    else if(this.state.email==='')
      alert("Please enter email")
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email))
      alert("Invalid email")
    else if(this.state.password==='')
      alert("Please enter password")
    else if(this.state.password.length<8)
      alert("Password too short")
    else if(this.state.confirmPassword==='')
      alert("Please confirm your password")
    else if(this.state.confirmPassword!==this.state.password)
      alert("Password and confirm password do not match")
    else
    {
      var deviceType = (Platform.OS === 'ios')? 'ios': 'android';

      console.log("Phone---",this.state.callingCode+''+this.state.phone);
      this.props.loadingStarted();
      this.props.signUp(this.state.email, this.state.password, this.state.gender, this.state.fname, this.state.lname, '+91'+this.state.callingCode+''+this.state.phone, this.state.base64, this.props.fcmToken, deviceType, this.state.paypalId);
  }
}
selectPhotoTapped() {
  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled photo picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else {
      let source = { uri: response.uri };

      // You can also display the image using data:
       let base64Strng = { uri: 'data:image/jpeg;base64,' + response.data };
       console.log("base64--",base64Strng.uri);
       this.setState({ base64:base64Strng.uri })

      this.setState({
        avatarSource: source
      });
    }
  });
}
  render(){
    return(
      <View style={{ flex: 1, height: window.height }}>
        <Container >
          <Content >
            <View style={{ position: 'absolute', flexDirection: 'column', width: window.width, height: window.height/2 }}>
              <View style={{ backgroundColor: '#3f51b5', flex: 1 }} />
            </View>
            <Form style={{  padding: 20, borderColor: "#eeeeee", borderWidth: 1, backgroundColor: '#ffffff' }}>

          <View style={{marginTop:20,padding:10,justifyContent:'center'}}>
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} style={[styles.avatar, {alignItems:'center'}]}>
                <View style={[styles.avatar, styles.avatarContainer, {alignItems:'center',backgroundColor:'white'}]}>

                { this.state.avatarSource === null ? <Icon name="person-add" size={45} color='#6945D1'/> :
                    <Image style={styles.avatar} source={this.state.avatarSource} />
                }
                </View>
            </TouchableOpacity>
                <Item >
                  <Icon name="person" size={25} color='black'/>
                  <Input
                    maxLength={20}
                    placeholder='First Name'
                    placeholderTextColor = "#aaaaaa"
                    onChangeText={(text) => this.setState({ fname: text })}
                  />
                </Item>
                <Item >
                  <Icon name="person" size={25} color='black'/>
                  <Input
                    maxLength={20}
                    placeholder='Last Name'
                    placeholderTextColor = "#aaaaaa"
                    onChangeText={(text) => this.setState({ lname: text })}
                  />
                </Item>
                <Item >
                  <Icon name="email" size={25} color='black'/>
                  <Input
                    placeholder='Email'
                    keyboardType='email-address'
                    placeholderTextColor = "#aaaaaa"
                    autoCapitalize = "none"
                    onChangeText={(text) => this.setState({ email: text })}
                  />
                </Item>
                <Item >
                  <Icon name="email" size={25} color='black'/>
                  <Input
                    placeholder='Paypal Id'
                    placeholderTextColor = "#aaaaaa"
                    autoCapitalize = "none"
                    onChangeText={(text) => this.setState({ paypalId: text })}
                  />
                </Item>
                  <PhoneNumberPicker
                    maxLength={12}
                    style={{width: window.width,flex: 1 }}
                     countryHint={{name: 'United States', cca2: 'US', callingCode:"1"}}
                     onChange={this.PhoneNumberPickerChanged.bind(this)}
                  />
                <Item >
                  <Icon name="lock" size={25} color='black'/>
                  <Input
                    maxLength={20}
                    placeholder='Password'
                    placeholderTextColor = "#aaaaaa"
                    autoCapitalize = "none"
                    secureTextEntry = {true}
                    onChangeText={(text) => this.setState({ password: text })}
                  />
                </Item>
                <Item >
                  <Icon name="lock" size={25} color='black'/>
                  <Input
                    maxLength={20}
                    placeholder='Confirm Password'
                    placeholderTextColor = "#aaaaaa"
                    autoCapitalize = "none"
                    secureTextEntry = {true}
                    onChangeText={(text) => this.setState({ confirmPassword: text })}
                  />
                </Item>
              <View style={{marginTop:20,alignItems:'flex-start'}}>
                <RadioForm
                  radio_props={radio_props}
                  initial={0}
                  onPress={(value) => {this.setState({gender:value})}}
                  formHorizontal={true}
                  buttonColor={'#6945D1'}
                  labelColor={'#6945D1'}
                  style={{backgroundColor:'transparent'}}
                />
              </View>
          </View>
              <View style={{justifyContent:'center',alignItems:'center'}}>
                <Button
                  rounded
                  primary
                  style={{
                    backgroundColor: '#6945D1',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: "center",
                    alignSelf: "center",
                    width:300,
                    marginTop:10}}
                  onPress={() => this.submit()}
                >
                <Text > Submit </Text>
              </Button>
              </View>
          </Form>
        </Content>
      </Container>
              <ActivityIndicator
                size='large'
                color='#3f51b5' animating={this.props.loading}
                style={{ position:'absolute', alignItems: 'center', alignSelf: 'center' ,marginTop: window.height/2-100, left: window.width/2-35 }}
              />

          </View>
    )
  }
}
const styles = StyleSheet.create({
    container : {
      flex: 1,
      backgroundColor: 'lightgrey',
    },
    avatarContainer: {
      borderColor: '#3f51b5',
      borderWidth: 1 / PixelRatio.get(),
      justifyContent: 'center',
      alignItems: 'center'
    },
    avatar: {
      alignSelf:'center',
      borderRadius: 55,
      width: 100,
      height: 100,
    },
    row:{
        flexDirection:'row',
        flex:0.3333333333333
    },
    submitButton: {
      width: window.width/2,
      backgroundColor: '#3f51b5',
      marginTop: 15,
      height: 40,
      flex:1,
      borderRadius: 0,
      justifyContent: 'center',
      alignItems:"center",
      alignSelf:"center"
    },
  });
export default connect(mapStateToProps,mapDispatchToProps )(SignUpPage);
