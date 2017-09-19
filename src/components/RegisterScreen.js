import React, { Component } from 'react'
import { View,Text,TextInput,ScrollView,TouchableOpacity,Image,KeyboardAvoidingView,ActivityIndicator, ImageBackground, Dimensions } from 'react-native';
import { Button,FormInput } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
const window = Dimensions.get('window');
import { signUp, loadingStarted } from '../actions/SignUpActions';
var radio_props = [
  {label: 'Male ', value: 'male' },
  {label: 'Female', value: 'female' }
];
const mapStateToProps = ({ SignUpReducer }) => {

  return {
    registerResponse: SignUpReducer.userData,
    loading: SignUpReducer.loading,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ signUp,loadingStarted }, dispatch)

};
class SignUpPage extends Component{
  constructor(props){
    super(props)
    this.state={
      email: '',
      password: '',
      fname:'',
      lname:'',
      confirmPassword:'',
      gender:'',
      phone:''
    }
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
      this.props.loadingStarted();
      this.props.signUp(this.state.email, this.state.password,this.state.gender, this.state.fname, this.state.lname, this.state.phone);
  }
}
  render(){
    return(
        <ImageBackground
        source={require('./images/login1_bg.png')}
        style={{flex:1,width:undefined,height:undefined}}>
        <ScrollView>
          <View >
          </View>
          <View style={{marginTop:20,paddingLeft:30,paddingRight:30,justifyContent:'space-around'}}>
              <View style={{marginTop:20,borderBottomColor:'#d9d9d9',borderBottomWidth:.5,flexDirection:'row'}}>
                  <View style={{justifyContent:'center',alignItems:'flex-end'}}>
                    <Icon name="account-circle" size={30} color='#d9d9d9' style={{backgroundColor:'transparent'}} />
                  </View>
                  <View style={{justifyContent:'center'}}>
                    <FormInput
                    onChangeText={(text) => this.setState({fname:text})}
                    placeholder='First name'
                    placeholderTextColor='#d9d9d9'
                    style={{color:'#d9d9d9',width:window.width-40}}
                    containerStyle={{borderBottomColor:'transparent'}}
                    underlineColorAndroid='transparent'
                    />
                  </View>
              </View>
              <View style={{marginTop:20,borderBottomColor:'#d9d9d9',borderBottomWidth:.5,flexDirection:'row'}}>
                  <View style={{justifyContent:'center',alignItems:'flex-end'}}>
                    <Icon name="account-circle" size={30} color='#d9d9d9' style={{backgroundColor:'transparent'}} />
                  </View>
                  <View style={{justifyContent:'center'}}>
                    <FormInput
                    onChangeText={(text) => this.setState({lname:text})}
                    placeholder='Last name'
                    placeholderTextColor='#d9d9d9'
                    style={{color:'#d9d9d9',width:window.width-40}}
                    containerStyle={{borderBottomColor:'transparent'}}
                    underlineColorAndroid='transparent'
                    />
                  </View>
              </View>
              <View style={{marginTop:20,borderBottomColor:'#d9d9d9',borderBottomWidth:.5,flexDirection:'row'}}>
                <View style={{justifyContent:'center',alignItems:'flex-end'}}>
                  <Icon name="email" size={30} color='#d9d9d9' style={{backgroundColor:'transparent'}} />
                </View>
                <View style={{justifyContent:'center'}}>
                  <FormInput
                  onChangeText={(text) => this.setState({email:text})}
                  placeholder='E-mail'
                  placeholderTextColor='#d9d9d9'
                  style={{color:'#d9d9d9',width:window.width-40}}
                  containerStyle={{borderBottomColor:'transparent'}}
                  underlineColorAndroid='transparent'
                  />
                </View>
              </View>
              <View style={{marginTop:20,borderBottomColor:'#d9d9d9',borderBottomWidth:.5,flexDirection:'row'}}>
                <View style={{justifyContent:'center',alignItems:'flex-end'}}>
                  <Icon name="phone" size={30} color='#d9d9d9' style={{backgroundColor:'transparent'}} />
                </View>
                <View style={{justifyContent:'center'}}>
                  <FormInput
                  onChangeText={(text) => this.setState({phone:text})}
                  placeholder='Phone'
                  placeholderTextColor='#d9d9d9'
                  style={{color:'#d9d9d9',width:window.width-40}}
                  containerStyle={{borderBottomColor:'transparent'}}
                  underlineColorAndroid='transparent'
                  />
                </View>
              </View>
              <View style={{marginTop:20,borderBottomColor:'#d9d9d9',borderBottomWidth:.5,flexDirection:'row'}}>
                <View style={{justifyContent:'center',alignItems:'flex-end'}}>
                  <Icon name="lock" size={30} color='#d9d9d9' style={{backgroundColor:'transparent'}} />
                </View>
                <View style={{justifyContent:'center'}}>
                  <FormInput
                  onChangeText={(text) => this.setState({password:text})}
                  placeholder='Password'
                  placeholderTextColor='#d9d9d9'
                  style={{color:'#d9d9d9',width:window.width-40}}
                  secureTextEntry={true}
                  containerStyle={{borderBottomColor:'transparent'}}
                  underlineColorAndroid='transparent'
                  />
                </View>
              </View>
              <View style={{marginTop:20,borderBottomColor:'#d9d9d9',borderBottomWidth:.5,flexDirection:'row'}}>
                  <View style={{justifyContent:'center',alignItems:'flex-end'}}>
                    <Icon name="lock" size={30} color='#d9d9d9' style={{backgroundColor:'transparent'}} />
                  </View>
                  <View style={{justifyContent:'center'}}>
                    <FormInput
                    onChangeText={(text) => this.setState({confirmPassword:text})}
                    placeholder='Confirm Password'
                    placeholderTextColor='#d9d9d9'
                    style={{color:'#d9d9d9',width:window.width-40}}
                    secureTextEntry={true}
                    containerStyle={{borderBottomColor:'transparent'}}
                    underlineColorAndroid='red'
                    />
                  </View>
              </View>
              <View style={{marginTop:20,alignItems:'flex-start'}}>
                <RadioForm
                  radio_props={radio_props}
                  initial={0}

                  onPress={(value) => {this.setState({gender:value})}}
                  formHorizontal={true}
                  buttonColor={'#00cccc'}
                  labelColor={'#d9d9d9'}
                  style={{backgroundColor:'transparent'}}
                />
              </View>
          </View>
          <View style={{paddingTop:20,paddingLeft:10,paddingRight:10}}>
              <View style={{justifyContent:'center'}}>
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
                color='#3f51b5' animating={this.props.loading}
                style={{ position:'absolute', alignItems: 'center', alignSelf: 'center' ,marginTop: window.height/2-100, left: window.width/2-35 }}
              />
          </View>
          </ScrollView>
        </ImageBackground>
    )
  }
}
export default connect(mapStateToProps,mapDispatchToProps )(SignUpPage);
