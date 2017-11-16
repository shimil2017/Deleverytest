import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
  FlatList,
  ImageBackground
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import User from './userprofilecomponents/user';
import MyTravelPlansScreen from './userprofilecomponents/MyTravelPlansScreen';
import MyPackagesList from './userprofilecomponents/MyPackagesList'
import Post from './userprofilecomponents/Post';
import Deleveries from './userprofilecomponents/Deleveries';
import { Container, Header, Content, Thumbnail, Card, Button } from 'native-base';
import { login, loadingStarted,loginFB } from '../actions/LoginAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IMAGE_URL } from '../constant/index';
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
import { Actions } from 'react-native-router-flux';
import MyDelivery from './userprofilecomponents/MyDelivery';
import MyPreviousPost from './userprofilecomponents/MyPreviousPost';

const mapStateToProps = ({ LoginReducer, MyTravelPlanListReducer }) => {
  return {
    loginResponse: LoginReducer.loginResponse,
    totalCount: MyTravelPlanListReducer.totalCount
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ login,loadingStarted,loginFB }, dispatch)

}
class ProfileNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'my_packages'
    }
    console.log("ProfileNew----constructor");
  }
  componentWillMount(){
    console.log("ProfileNew----Events");
    if (this.props.via !== undefined && this.props.via !==null) {
      if (this.props.via ===1) {
        this.setState({selected: 'my_packages'});

      }else if (this.props.via ===2) {
        this.setState({selected: 'Travel'});

      }else if (this.props.via ===3) {
        this.setState({selected: 'Post'});

      }else if (this.props.via ===4) {
        this.setState({selected: 'Delivery'});

      }
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log("ghasghdafsgfasasdfgdghsadgfasgdfgahsgh");
    if (nextProps.via !== undefined && nextProps.via !==null) {
      if (nextProps.via ===1) {
        this.setState({selected: 'my_packages'});

      }else if (nextProps.via ===2) {
        this.setState({selected: 'Travel'});

      }else if (nextProps.via ===3) {
        this.setState({selected: 'Post'});

      }else if (nextProps.via ===4) {
        this.setState({selected: 'Deleveries'});

      }
    }
  }
  componentWillMount() {
    console.log("ProfileNew----Events");
  }
  render() {
    let profilePic ='';
    if (this.props.loginResponse.loginType !== undefined && this.props.loginResponse.loginType === 2 && this.props.loginResponse.image !== undefined) {
      profilePic = this.props.loginResponse.image;
    }else if(this.props.loginResponse.image !== undefined ) {
      profilePic = IMAGE_URL+this.props.loginResponse.image;
    }
    console.log('PP', profilePic);
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
      <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
        <ImageBackground style={{ flex: 0.4,}} source={require('./images/gredient_bg.png')}>
          <View style={{ flex: 0.1 }}>
          </View>
          <View style={{ flex: 0.15, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <View style={{ flex: 0.88, alignItems: 'flex-end' }}>
              <TouchableOpacity onPress={null} style={{ backgroundColor: 'transparent' }}>
                <MIcon name='email' color='white' size={30} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.12, alignItems: 'center' }}>
              <TouchableOpacity onPress={()=> Actions.Settings()} style={{ backgroundColor: 'transparent' }}>
                <MIcon name='settings' color='white' size={30} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => Actions.EditProfileScreen()} style={{ flex: 0.12, backgroundColor: 'transparent' }}>
              <MIcon name='create' color='white' size={30} style={{  backgroundColor: 'transparent' }}/>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 0.25, alignItems: 'center',justifyContent: 'center', paddingVertical: 5, flexDirection: 'row' }}>

          <Thumbnail large
            style={{ borderColor: 'white', borderWidth: 2 }}
            source={{ uri: profilePic }} >
          </Thumbnail>
          </View>
          <View style={{ flex: 0.15, alignItems: 'center', justifyContent: 'center',marginTop:20 }}>
            <Text style={{ backgroundColor: 'transparent', fontSize: WINDOW_HEIGHT * 0.035, color: 'white' }}>{this.props.loginResponse.first_name} {this.props.loginResponse.last_name}</Text>

          </View>
          <View style={{ flex: 0.3, flexDirection: 'row', alignItems: 'flex-start', marginTop:30 }}>
            <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
              {
                (this.props.totalCount.pdata != undefined)?
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: WINDOW_HEIGHT * 0.03 }}>{this.props.totalCount.pdata[0].parcels}</Text>
                :
                null
              }

              <Text style={{ color: 'white', fontSize: WINDOW_HEIGHT * 0.023 }}>Parcel Posted</Text>
            </View>
            <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
              {
                (this.props.totalCount.tdata != undefined)?
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: WINDOW_HEIGHT * 0.03 }}>{this.props.totalCount.tdata[0].totaldeliveries}</Text>
                  :
                  null

              }

              <Text style={{ color: 'white', fontSize: WINDOW_HEIGHT * 0.023 }}>Total Delivered</Text>
            </View>
          </View>
        </ImageBackground>
        <View style={{ flex: 0.6 }}>
          <View style={{ flex: 0.2, flexDirection: 'row', backgroundColor: 'white', borderColor: '#dadada', borderBottomWidth: 1 }}>

            <TouchableOpacity onPress={() => this.setState({ selected: 'my_packages' })} style={{ flex: 0.25, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#dadada', borderBottomWidth: 3, borderBottomColor: this.state.selected === 'user' ? '#6643d8' : 'transparent' }}>
              <TouchableOpacity onPress={() => this.setState({ selected: 'my_packages' })} style={{ height: WINDOW_HEIGHT * 0.038, width: WINDOW_WIDTH * 0.13, alignItems: 'center', justifyContent: 'center' }}>
                <MIcon name='markunread-mailbox' color= {this.state.selected === 'my_packages' ? '#6643d8' : 'grey'} size={25} />
              </TouchableOpacity>
              <Text style={{ fontSize: 12,color:this.state.selected === 'my_packages' ? '#6643d8' : 'grey' }}>My Packages</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.setState({ selected: 'Travel' })} style={{ flex: 0.25, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#dadada', borderBottomWidth: 3, borderBottomColor: this.state.selected === 'Travel' ? '#6643d8' : 'transparent' }}>
              <TouchableOpacity onPress={() => this.setState({ selected: 'Travel' })} style={{ alignItems: 'center', justifyContent: 'center' }}>
                <MIcon name='local-shipping' color= {this.state.selected === 'Travel' ? '#6643d8' : 'grey'} size={23} />
              </TouchableOpacity>
              <Text style={{ fontSize:12,color:this.state.selected === 'Travel' ? '#6643d8' : 'grey' }}>My Travel Plan</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ selected: 'Post' })} style={{ flex: 0.25, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#dadada', borderBottomWidth: 3, borderBottomColor: this.state.selected === 'Post' ? '#6643d8' : 'transparent' }}>
              <TouchableOpacity onPress={() => this.setState({ selected: 'Post' })} style={{ alignItems: 'center', justifyContent: 'center' }}>
                <MIcon name='local-offer' color= {this.state.selected === 'Post' ? '#6643d8' : 'grey'} size={25} />
              </TouchableOpacity>
              <Text style={{ fontSize:12 ,color:this.state.selected === 'Post' ? '#6643d8' : 'grey'  }}>My Previous Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ selected: 'Deleveries' })} style={{ flex: 0.25, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 3, borderBottomColor: this.state.selected === 'Deleveries' ? '#6643d8' : 'transparent' }}>
              <TouchableOpacity onPress={() => this.setState({ selected: 'Deleveries' })} style={{ alignItems: 'center', justifyContent: 'center' }}>
                <MIcon name='local-shipping' color= {this.state.selected === 'Deleveries' ? '#6643d8' : 'grey'} size={23} />
              </TouchableOpacity>
              <Text style={{ fontSize:12,color:this.state.selected === 'Deleveries' ? '#6643d8' : 'grey'  }}>My Deleiveries</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.8,  }}>
            {
              this.state.selected === 'my_packages'
               ? <MyPackagesList /> : this.state.selected === 'Travel'
               ? <MyTravelPlansScreen /> : this.state.selected === 'Post'
                ? <MyPreviousPost /> : <MyDelivery />
            }
          </View>
        </View>
      </View>)
    }
  }

}
export default connect(mapStateToProps,mapDispatchToProps)(ProfileNew);
