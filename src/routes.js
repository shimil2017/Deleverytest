import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux'
import { View, Text, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Loginpage from './components/LoginScreen'
import SignUpPage from './components/RegisterScreen'
import Drawer from './components/drawer'
import Home from './components/home';
import Events from './components/events';
import Forget from './components/ForgetPasswordScreen'
import MenuIcon from './components/images/menu.png';
import PostPackageScreen from './components/PostPackageScreen';
import ParcelDetailScreen from './components/ParcelDetailScreen'
import TravelersList from './components/TravelersList';
import TravelDealScreen from './components/TravelDealScreen';
import TravelPlanScreen from './components/TravelPlanScreen'
import PackagesList from './components/PackagesList';
import Test from './components/eventdetail';
import ProfileNew from './components/ProfileNew';
import AddPackage from './components/AddPackage';
import PickupLocationScreen from './components/PickUpLocationScreen';
import MyPackagesRequest from './components/userprofilecomponents/MyPackagesRequest';
import MyPlansRequest from './components/userprofilecomponents/MyPlansRequest';
import EditProfileScreen from './components/EditProfileScreen';
import Settings from './components/Settings';
import AddCard from './components/AddCard';
import Payment from './components/Payment';
import FinalDealScreen from './components/FinalDealScreen';
import MyPreviousPost from './components/userprofilecomponents/MyPreviousPost';
import MyDelivery from './components/userprofilecomponents/MyDelivery';
import ChangeStatusScene from './components/userprofilecomponents/ChangeStatusScene';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTravelerList, pullToRefreshTravelerList, getTravelerListExplore } from './actions/TravelerActions';
import { getPackagesList, pullToRefreshPackagesList, getPackagesListExplore } from './actions/PackagesListActions';
import { getMyPackagesList } from './actions/MyPackagesListActions';
import { getMyTravelPlanList } from './actions/MyTravelPlansListActions';
const drawerStyles = { drawer: { shadowColor: '#000', shadowOpacity: 0,elevation:0, shadowRadius: 0,shadowOffset: {height: 0,
width: 0,
},
},
main: { paddingLeft: 0 }
}
class TabIcon extends Component {
  render() {
    var color = this.props.focused ? '#6945D1' : 'grey';
    var text = ''
    if (this.props.iconName === 'home') {
      text='Home';
    }
    else if(this.props.iconName === 'explore') {
      text ="Explore";
    }else {
      text = 'You';
    }
    return (
      <View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
        <Icon style={{color: color}} name={this.props.iconName || "circle"} size={30} />
        <Text style={{color: color}}>{text}</Text>
      </View>
    );
  }
}
const mapStateToProps = ({ LoginReducer }) => {
  return {
    loggedIn: LoginReducer.loggedIn,
    loginResponse: LoginReducer.loginResponse,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
     getTravelerList,
     getPackagesList,
     pullToRefreshTravelerList,
     pullToRefreshPackagesList,
     getMyPackagesList,
     getMyTravelPlanList,
     getTravelerListExplore,
     getPackagesListExplore
   }, dispatch);

};
var myLat = 0
var myLng = 0;
class Route extends Component{
  constructor(props) {
    super(props)

  }
  componentDidMount(){
    this.watchID = navigator.geolocation.watchPosition((position) => {
       myLat = position.coords.latitude;
       myLng = position.coords.longitude;
        console.log("Locations",myLat,myLng);
    });
  }
onEnterExplore(){
  try {
    const value = AsyncStorage.getItem('user_id',(err, result) => {
      if (result !== undefined && result !== null && result !== '') {
        console.log("LOGIN");
        this.props.getMyPackagesList(result);
        this.props.getMyTravelPlanList(result);
        this.props.getTravelerListExplore(result,this.props.loginResponse.distanceSelected,myLat,myLng);
        this.props.getPackagesListExplore(result,this.props.loginResponse.distanceSelected,myLat,myLng);
      }
      else {
        console.log("LOGIOUT");
        this.props.getTravelerList();
        this.props.getPackagesList();
      }
      });
  } catch (error) {
    // Error retrieving data
    console.log("Error getting Token",error);
  }
}
  render() {
    return(
      <Router>
        <Stack
          titleStyle={{ color:'white' }}
          navigationBarStyle={{backgroundColor:'#6945D1'}}
          key="root"
          tintColor={'white'}
        >
          <Scene
            key="login"
            component={Loginpage}
            title="Login"
          />
          <Scene
            key="Settings"
            component={Settings}
            title="Settings"

          />
          <Scene
            key="register"
            component={SignUpPage}
            title="Sign up"
            leftButtonIconStyle={{ tintColor: 'red' }}
          />
          <Scene
            key="forgetpassword"
            component={Forget}
            title="Forget password"
          />
          <Scene
            key="PostPackageScreen"
            component={PostPackageScreen}
            title="Select Location"
          />
          <Scene
            key="ParcelDetail"
            component={ParcelDetailScreen}
            title="Parcel Detail"
          />
          <Scene
            key="TravelersList"
            component={TravelersList}
            title="Travelers List"
          />
          <Scene
            key="PackagesList"
            component={PackagesList}
            title="Packages List"
          />
          <Scene
            key="TravelDealScreen"
            component={TravelDealScreen}
            title="Travel Deal"
          />
          <Scene
            key="eventDetail"
            component={Test}
            title="Travel Deal"

          />
          <Scene
            key="TravelPlanScreen"
            component={TravelPlanScreen}
            title="Travel Plan"
          />
          <Scene
            key="ProfileNew"
            component={ProfileNew}
            title="My ProfileNew"
          />
          <Scene
            key="AddPackage"
            component={AddPackage}
            title="Add Package"
          />
          <Scene
            key="PickupLocationScreen"
            component={PickupLocationScreen}
            title="PickupLocationScreen"
          />
          <Scene
            key="MyPackagesRequest"
            component={MyPackagesRequest}
            title="Received Requests"
          />
          <Scene
            key="MyPlansRequest"
            component={MyPlansRequest}
            title="Received Requests"
          />
          <Scene
            key="EditProfileScreen"
            component={EditProfileScreen}
            title="Edit Profile"
          />
          <Scene
            key="Payment"
            component={Payment}
            title="Payment"
          />
          <Scene
            key="AddCard"
            component={AddCard}
            title="AddCard"
          />
          <Scene
            key="FinalDealScreen"
            component={FinalDealScreen}
            title="FinalDealScreen"
          />
          <Scene
            key="MyPreviousPost"
            component={MyPreviousPost}
            title="MyPreviousPost"
          />
          <Scene
            key="MyDelivery"
            component={MyDelivery}
            title="MyDelivery"
          />
          <Scene
            key="ChangeStatusScene"
            component={ChangeStatusScene}
            title="ChangeStatusScene"
          />
          <Drawer
            key="drawer"
            drawer
            initial={true}
            contentComponent={Drawer}
            hideNavBar
            navigationBarStyle={{ backgroundColor:'#6945D1' }}
            drawerImage={MenuIcon}
            styles={drawerStyles}
          >
            <Scene
              key="tab"
              inactiveTintColor='grey'
              activeTintColor='#6945D1'
              tabs
              swipeEnabled={false}
              tabBarPosition='bottom'
              showLabel={false}
              tabBarStyle={{ backgroundColor:'#FFFFFF', }}
              labelStyle={{ color:'grey' }}>
              <Scene
                tabBarLabel='HOME'
                key="home"
                component={Home}
                title="Today's Plan?"
                icon={TabIcon}
                iconName="home"
                titleStyle={{ color:'white'}}

              />
             <Scene
                tabBarLabel='Explore'
                key="event"
                component={Events}
                icon={TabIcon}
                titleStyle={{ color:'white' }}
                title="Explore"
                iconName="explore"
                onEnter={()=> this.onEnterExplore()}
              />
             <Scene
                tabBarLabel='You'
                key="profile"
                component={ProfileNew}
                icon={TabIcon}
                titleStyle={{ color:'white'}}
                title="My Account"
                iconName="account-circle"

              />
            </Scene>
          </Drawer>
        </Stack>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps )(Route);
