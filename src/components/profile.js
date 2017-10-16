import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,TouchableOpacity,ScrollView,Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Header, Content, Thumbnail, Button } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login, loadingStarted,loginFB } from '../actions/LoginAction';
import { IMAGE_URL } from '../constant/index';
import { Actions } from 'react-native-router-flux';
const mapStateToProps = ({ LoginReducer }) => {
  return {
    loginResponse: LoginReducer.loginResponse,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ login,loadingStarted,loginFB }, dispatch)
}
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 12,
      value1: 6,
      name: 'joslin',
      dot: '1'
    };
    console.log("Profile",this.props.loginResponse,"Image ",IMAGE_URL+this.props.loginResponse.image);
  }
  render() {
    let profilePic ='';
    if (this.props.loginResponse.loginType !== undefined && this.props.loginResponse.loginType === 2) {
      profilePic = this.props.loginResponse.image;
    }else {
      profilePic = IMAGE_URL+this.props.loginResponse.image;
    }
    console.log("PP",profilePic);
    if (this.props.loginResponse === null || this.props.loginResponse === undefined ||  this.props.loginResponse.first_name === undefined || this.props.loginResponse.first_name === null || this.props.loginResponse.first_name === '') {
      return(
        <View style={{ marginTop:50, flex:1,alignSelf:'center',alignItems:'center'}}>
          <Text style={{margin: 10, fontSize: 15, textAlign: 'center'}}>Please Login to continue</Text>
          <Button style={{width:300,alignSelf: 'center', margin: 10}} info onPress={() => Actions.login()}>
            <Text style={{width:300,  textAlign: 'center',color: '#fff', alignSelf:'center', alignItems:'center'}}> Login </Text>
          </Button>
        </View>
      );
    }else{
    return (

       <View style={{flex:1}}>

                <View style={{flex:.5,backgroundColor:'#2F3F4A',flexDirection:'column'}}>
                    <View style={{flex:.1}}>
                    </View>
                    <View style={{flex:.1,flexDirection:'row',justifyContent:'flex-end',padding:10}}>
                        <View style={{flex:.1,borderRadius:150,borderWidth:1.5,borderColor:'white',justifyContent:'center',alignItems:'center'}}>
                            <Icon name="email" size={25} color='white' style={{backgroundColor:'transparent',padding:5}} />
                        </View>
                            <Text style={{color:'red',fontWeight:'bold'}}>{this.state.dot}</Text>
                    </View>
                    <View style={{flex:.4,justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                      <Icon name='create' style={{ position: 'absolute', margin:10 }}/>
                      <Thumbnail large source={ {uri: profilePic}} />
                      <Text style={{color:'white',fontWeight:'bold',fontSize:18}}>{this.props.loginResponse.first_name} {this.props.loginResponse.last_name}</Text>
                    </View>
                    <View style={{flex:.3,flexDirection:'row',paddingHorizontal:20}}>
                          <View style={{flex:.5,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                             <Text style={{fontSize:25,color:'white'}}>{this.state.value}</Text>
                             <Text style={{fontSize:20,color:'gray'}}>Parcel Posted</Text>
                          </View>
                            <View style={{flex:.5,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                              <Text style={{fontSize:25,color:'white'}}>{this.state.value1}</Text>
                              <Text style={{fontSize:20,color:'gray'}}>Total Delivered</Text>
                            </View>
                        </View>

                  </View>

               <View style={{flex:.05,backgroundColor:'white',flexDirection:'row',paddingVertical:10}}>
                    <View style={{flex:.09,backgroundColor:'#2F3F4A',justifyContent:'center',alignItems:'center',borderRadius:50,marginLeft:10}}>
                       <Icon name="event-available" size={20} color='white' style={{backgroundColor:'transparent'}} />
                    </View>
                    <TouchableOpacity onPress={()=> alert('Under development.')} style={{flex:.8,justifyContent:'center',marginLeft:10}}>
                       <Text style={{fontSize:16,color:'black',fontWeight:'bold'}}>Post a Package</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> alert('Under development.')} style={{flex:.1,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                      <Icon name="fiber-manual-record" size={15} color='red' style={{backgroundColor:'transparent'}} />
                              <Icon name="chevron-right" size={30} color='grey' style={{backgroundColor:'transparent'}} />
                    </TouchableOpacity>
              </View>
              <View style={{flex:.05,backgroundColor:'white',flexDirection:'row',paddingVertical:10}}>
                   <View style={{flex:.09,backgroundColor:'#2F3F4A',justifyContent:'center',alignItems:'center',borderRadius:50,marginLeft:10}}>
                      <Icon name="event-available" size={20} color='white' style={{backgroundColor:'transparent'}} />
                   </View>
                   <TouchableOpacity onPress={()=> alert('Under development.')} style={{flex:.8,justifyContent:'center',marginLeft:10}}>
                      <Text style={{fontSize:16,color:'black',fontWeight:'bold'}}>Add your Travel Plan</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=> alert('Under development.')} style={{flex:.1,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                     <Icon name="fiber-manual-record" size={15} color='red' style={{backgroundColor:'transparent'}} />
                             <Icon name="chevron-right" size={30} color='grey' style={{backgroundColor:'transparent'}} />
                   </TouchableOpacity>
              </View>
           <View style={{flex:.02}}>
          </View>

          <View style={{flex:.35,flexDirection:'row',backgroundColor:'gray',justifyContent:'space-between'}}>
              <View style={{flex:.50,marginRight:.5,justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=> Actions.MyPackagesList()} style={{flex:.33,flexDirection:'row',backgroundColor:'white'}}>
                    <View style={{flex:.3,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                       <Icon name="account-balance" size={30} color='gray' style={{backgroundColor:'transparent'}} />
                   </View>
                   <View style={{flex:.7,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                       <Text style={{fontWeight:'bold',color:'black',fontSize:16}}>My Packages</Text>
                   </View>
               </TouchableOpacity>

              <TouchableOpacity onPress={()=> alert('Under development.')} style={{flex:.33,flexDirection:'row',backgroundColor:'white'}}>
                  <View style={{flex:.3,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                    <Icon name="subtitles" size={30} color='gray' style={{backgroundColor:'transparent'}} />
                  </View>
                  <View style={{flex:.7,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontWeight:'bold',color:'black',fontSize:16,textAlign:'center'}}>Account Information</Text>
                  </View>
                </TouchableOpacity>

            <TouchableOpacity onPress={()=> alert('Under development.')} style={{flex:.33,flexDirection:'row',backgroundColor:'white'}}>
              <View style={{flex:.3,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                <Icon name="help" size={30} color='gray' style={{backgroundColor:'transparent'}} />
               </View>
               <View style={{flex:.7,justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontWeight:'bold',color:'black',fontSize:16}}>help</Text>
                  <Text style={{fontWeight:'bold',color:'gray'}}>Common problems</Text>
                </View>
              </TouchableOpacity>
          </View>

          <View style={{flex:.5,justifyContent:'space-between'}}>
             <TouchableOpacity onPress={()=> Actions.MyTravelPlansScreen()} style={{flex:.33,flexDirection:'row',backgroundColor:'white'}}>
                 <View style={{flex:.2,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                   <Icon name="photo-camera" size={30} color='gray' style={{backgroundColor:'transparent'}} />
                 </View>
                 <View style={{flex:.8,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                   <Text style={{fontWeight:'bold',color:'black',fontSize:16}}>My Travel Plans</Text>
                 </View>
             </TouchableOpacity>

             <TouchableOpacity onPress={()=> alert('Under development.')} style={{flex:.33,flexDirection:'row',backgroundColor:'white'}}>
                <View style={{flex:.2,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                  <Icon name="settings" size={30} color='gray' style={{backgroundColor:'transparent'}} />
                </View>
                <View style={{flex:.8,justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontWeight:'bold',color:'black',fontSize:16}}>Notification setup</Text>
                  <Text style={{fontWeight:'bold',color:'gray'}}>Setting personalized</Text>
                </View>
            </TouchableOpacity>

              <TouchableOpacity onPress={()=> alert('Under development.')} style={{flex:.33,flexDirection:'row',backgroundColor:'white'}}>
                 <View style={{flex:.2,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                    <Icon name="info" size={30} color='gray' style={{backgroundColor:'transparent'}} />
                 </View>
                <View style={{flex:.8,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontWeight:'bold',color:'black',fontSize:16}}>About</Text>
                    <Text style={{fontWeight:'bold',color:'gray'}}>Introduction to App</Text>
                </View>
            </TouchableOpacity>

          </View>
      </View>
</View>

    );
  }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
