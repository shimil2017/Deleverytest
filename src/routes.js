import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux'
import { View,Text } from 'react-native';
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
        <Icon style={{color: color}} name={this.props.iconName || "circle"} size={30}/>
        <Text style={{color: color}}>{text}</Text>
      </View>
    );
  }
}
const Route = () => (

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
        initial
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
      <Drawer
        key="drawer"
        drawer
        initial
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
export default Route
