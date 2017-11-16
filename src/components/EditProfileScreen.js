import React, { Component } from 'react'
import { View, TouchableOpacity, Image, ActivityIndicator, StyleSheet, PixelRatio, Dimensions, AsyncStorage } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Container, Content, Form, Item, Input, Button, Text } from 'native-base';
const window = Dimensions.get('window');
import { editProfile, loadingStartedEditProfile } from '../actions/EditProfileActions';
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
const mapStateToProps = ({ LoginReducer, EditProfileReducer }) => {

  return {
    loggedIn: LoginReducer.loggedIn,
    loginResponse: LoginReducer.loginResponse,
    loading: EditProfileReducer.loading,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ editProfile, loadingStartedEditProfile  }, dispatch)
};
class EditProfileScreen extends Component {
  constructor(props) {
    super(props)
    console.log('EMAIL---', this.props.loginResponse.email);
    this.state = {
      email: "jhdjhjdkhh",
      password: '',
      fname: '',
      lname: '',
      confirmPassword: '',
      gender: '',
      phone: '',
      base64: '',
      avatarSource: null,
      paypalId: ''
    }
  }
  componentWillMount(){
    this.setState({
      email: this.props.loginResponse.email,
      fname: this.props.loginResponse.first_name,
      lname: this.props.loginResponse.last_name,
      gender: this.props.loginResponse.gender,
      phone: this.props.loginResponse.phone_number,
      base64: this.props.loginResponse.image,
      avatarSource: this.props.loginResponse.image,
      paypalId: this.props.loginResponse.paypalId,
    }, () => console.log("Profile Added",this.state.email, this.state.avatarSource ));
  }
  submit(){
    if(this.state.fname==='')
      alert("Please enter your first name")
    else if(this.state.lname==='')
      alert("Please enter your last name")
    else if(this.state.email === '')
      alert("Please enter email")
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email))
      alert("Invalid email")
    else
    {
      this.props.loadingStartedEditProfile();
      try {
        const value = AsyncStorage.getItem('user_id',(err, result) => {
          if (result !== undefined && result !== null && result !== '') {
            this.props.editProfile( result, this.state.email, this.state.gender, this.state.fname, this.state.lname, this.state.phone, this.state.base64, this.state.paypalId);
          }

          });
      } catch (error) {
        // Error retrieving data
        console.log("Error getting Token",error);
      }

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
        avatarSource: response.uri
      }, () => console.log("updared image",this.state.avatarSource));
    }
  });
}
  render() {
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

                { this.state.avatarSource === null ?
                  <Icon name="person-add" size={45} color='#6945D1'/> :
                  <Image style={styles.avatar} source={{ uri: this.state.avatarSource } } />
                }
                </View>
            </TouchableOpacity>
                <Item >
                  <Icon name="person" size={25} color='black'/>
                  <Input
                    value={this.state.fname}
                    placeholder='First Name'
                    placeholderTextColor = "#aaaaaa"
                    onChangeText={(text) => this.setState({ fname: text })}
                  />
                </Item>
                <Item >
                  <Icon name="person" size={25} color='black'/>
                  <Input
                    value={this.state.lname}
                    placeholder='Last Name'
                    placeholderTextColor = "#aaaaaa"
                    onChangeText={(text) => this.setState({ lname: text })}
                  />
                </Item>
                <Item >
                  <Icon name="email" size={25} color='black'/>
                  <Input
                    value={this.state.email}
                    keyboardType='email-address'
                    placeholderTextColor = "#aaaaaa"
                    autoCapitalize = "none"
                    onChangeText={(text) => this.setState({ email: text })}
                  />
                </Item>
                <Item >
                  <Icon name="email" size={25} color='black'/>
                  <Input
                    value={this.state.paypalId}
                    placeholder='Paypal Id'
                    placeholderTextColor = "#aaaaaa"
                    autoCapitalize = "none"
                    onChangeText={(text) => this.setState({ paypalId: text })}
                  />
                </Item>
                <Item >
                  <Icon name="phone" size={25} color='black'/>
                  <Input
                    value={this.state.phone}
                    placeholder="Phone"
                    keyboardType='phone-pad'
                    placeholderTextColor = "#aaaaaa"
                    autoCapitalize = "none"
                    onChangeText={(text) => this.setState({ phone: text })}
                  />
                </Item>
              <View style={{marginTop:20,alignItems:'flex-start'}}>
                <RadioForm
                  radio_props={radio_props}
                  initial={(this.state.gender === 'male')?0:1}
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
                    flex:1,
                    justifyContent: 'center',
                    alignItems:"center",
                    alignSelf:"center",
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
      borderRadius: 50,
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
export default connect(mapStateToProps, mapDispatchToProps )(EditProfileScreen);
