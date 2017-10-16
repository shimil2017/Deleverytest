import React, { Component } from 'react'
import { TextInput,ScrollView,Dimensions,TouchableOpacity,Image,KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { FormInput } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/EvilIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from '../style/centerstyle';
import { forget,loadingStarted} from '../actions/ForgetAction';
import {
  Spinner,
   Container,
   Content,
   Form,
   Item,
   Input, Label, Text,
  View, Button } from 'native-base';
const window = Dimensions.get('window');
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
      <View style={{ flex: 1,height: '100%' }}>
        <Container style={{ height: '100%' }}>
          <Content style={{ height: '100%' }}>
            <View style={{ position: 'absolute', flexDirection: 'column', width: '100%', height: '50%' }}>
              <View style={{ backgroundColor: '#6945D1', flex: 1}} />
            </View>
            <Form style={{ margin: 20, padding: 20, borderColor: "#eeeeee", borderWidth: 1, backgroundColor: '#ffffff' }}>
              <Item floatingLabel>
                <Label style={{ color: "#3f51b5" }}>Email</Label>
                <Input
                  keyboardType='email-address'
                  placeholderTextColor = "#aaaaaa"
                  autoCapitalize = "none"
                  onChangeText={(text) => this.setState({ email: text })}
                />
              </Item>
              <Button
                rounded
                primary
                style={{marginTop:20,backgroundColor:"#6945D1",alignSelf:'flex-end'}}
                onPress={() => this.submit()}
              >
                <Text > Submit </Text>
              </Button>
            </Form>
          </Content>
        </Container>
        <Spinner color='#3f51b5' animating={this.props.isLoading}
          style={{ alignSelf:'center',position:'absolute', marginTop: window.height/2-100, left: window.width/2-35 }}
        />
      </View>
    )
  }
}
export default connect(mapStateToProps,mapDispatchToProps )(Forget);
