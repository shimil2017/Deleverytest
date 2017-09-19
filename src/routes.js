import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux'
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Loginpage from './components/LoginScreen'
import SignUpPage from './components/RegisterScreen'
import Drawer from './components/drawer'
import Home from './components/home'
import Events from './components/events'
import Profile from './components/profile'
import Forget from './components/ForgetPasswordScreen'
import MenuIcon from './components/images/menu.png';
import PostPackageScreen from './components/PostPackageScreen'

class TabIcon extends Component {
  render() {
    var color = this.props.focused ? '#ff4d4d' : 'white';

    return (
      <View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
        <Icon style={{color: color}} name={this.props.iconName || "circle"} size={30}/>
      </View>
    );
  }
}


const Route = () => (
  <Router>
    <Stack
      key="root"
    >
      <Scene
        key="login"
        component={Loginpage}
        title="Login"
        hideNavBar

      />
      <Scene
        key="register"
        component={SignUpPage}
        title="Sign up"
      />
      <Scene
        key="forgetpassword"
        component={Forget}
        title="forget_password"
      />
      <Scene
        key="PostPackageScreen"
        component={PostPackageScreen}
        title="Select Location"
      />
      <Drawer
        key="drawer"
        drawer
        contentComponent={Drawer}
        hideNavBar
        navigationBarStyle={{backgroundColor:' #e62e00' }}
        drawerImage={MenuIcon}
        initial
      >
        <Scene key="tab" tabs tabBarPosition='bottom' showLabel={false} tabBarStyle={{backgroundColor:'green'}}>
          <Scene
            key="home"
            component={Home}
            title='Select Job'
            icon={TabIcon}
            iconName="home"
          />
          <Scene
            key="event"
            component={Events}
            icon={TabIcon}
            iconName="gps-fixed"
          />
          <Scene
            key="profile"
            component={Profile}
            icon={TabIcon}
            iconName="account-circle"
          />
        </Scene>
      </Drawer>
    </Stack>
  </Router>
);

export default Route
