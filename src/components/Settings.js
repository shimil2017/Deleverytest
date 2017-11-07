import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
  FlatList,
  Switch,
  Alert,
  AsyncStorage
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { Container, Header, Content, List, ListItem, Text, Items, Left, Icon, Body, Segment, Right, Spinner } from 'native-base';
import { Button } from 'react-native-elements';

import Slider from 'react-native-slider';

import Payment from './Payment';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { saveSetting, loadingSetting } from '../actions/SaveSetting';
const WINDOW_HEIGHT = Dimensions.get('window').height;
const mapStateToProps = ({ SaveSettingReducer, LoginReducer }) => {
  return {
    saveSetting: SaveSettingReducer.saveSetting,
    loading: SaveSettingReducer.isLoading,
    loginResponse: LoginReducer.loginResponse,
  };
};
  const mapDispatchToProps = dispatch => {
    return bindActionCreators({ loadingSetting, saveSetting }, dispatch)
}
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      arr: [],
      switch2: false,
      profileVisble: false,
      newPackageNearby: false,
      newTravelerNearBy: false,
      requestonPackage: false,
      requestonPlan: false,
      notificationOnTracking: false,
    };

  }
  componentWillMount() {
    console.log('Seetinggggsgsh',this.props.loginResponse);
    this.setState({
      value: this.props.loginResponse.distanceSelected,
      profileVisble: this.props.loginResponse.profileVisibility,
      newPackageNearby: this.props.loginResponse.newPackageNearBy,
      newTravelerNearBy: this.props.loginResponse.newTravellerNearBy,
      requestonPackage: this.props.loginResponse.reqOnYourPackage,
      requestonPlan: this.props.loginResponse.reqOnYourTraveller,
      notificationOnTracking: this.props.loginResponse.notificationOnTracking
     }, ()=> console.log("fgdgddfgdgfdfg",this.state.newTravelerNearBy));
  }
  componentWillReceiveProps(nextProps) {

    if (nextProps.loginResponse !== this.props.loginResponse) {
      this.props.loginResponse === nextProps.loginResponse;
    }
  }
  onClickSubmit() {
    Alert.alert(
  'Update Settings',
  'Do you want to change settings?',
  [
    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    {text: 'OK', onPress: () => {const value = AsyncStorage.getItem('user_id',(err, result) => {
      if (result !== undefined && result !== null && result !== '') {
        const data = {
        	"profileVisibility" :  this.state.profileVisble,
        	"distanceSelected" :  this.state.value,
        	"newPackageNearBy" : this.state.newPackageNearby,
        	"newTravellerNearBy" :  this.state.newTravelerNearBy,
        	"reqOnYourPackage" :  this.state.requestonPackage,
        	"reqOnYourTraveller" :  this.state.requestonPlan,
          "notificationOnTracking": this.state.notificationOnTracking
        };
        this.props.loadingSetting();
        this.props.saveSetting(JSON.stringify(data), result);
      }
    });}},
  ],
  { cancelable: false }
  )
  }

  render() {
    return (
      <Container style={{ flex: 1 }}>
        <Content style={{ height: WINDOW_HEIGHT * 1 }}>
          <View style={{ flexDirection: 'row', flex: 0.1 }}>
            <View style={{ flex: 0.05, padding: '2%' }}>
              <MIcon active name="settings" size={20} style={{ backgroundColor: 'transparent' }} />
            </View>
            <View style={{ flex: 0.95, justifyContent: 'center' }}>
              <Text style={{ fontSize: WINDOW_HEIGHT * 0.025 }}>General Settings</Text>
            </View>
          </View>
          <View style={{ flex: 0.2, borderBottomColor: 'black', borderBottomWidth: 1, flexDirection: 'row', paddingLeft: '3%', backgroundColor: 'white' }}>
            <View style={{ flex: 0.7, justifyContent: 'center' }}>
              <Text >Profile Visibility</Text>
            </View>
            <View style={{ flex: 0.3, alignItems: 'flex-end' }}>
              <Switch
                onValueChange={(value) => this.setState({profileVisble: value})}
                style={{marginBottom: 10}}
                value={this.state.profileVisble}
              />
            </View>
          </View>
          <View style={{ flex: 0.3, borderBottomColor: 'black', borderBottomWidth: 1, flexDirection: 'column', backgroundColor: 'white' }}>
            <View style={{ flex: 0.7, justifyContent: 'center', paddingHorizontal: '3%' }}>
              <View style={{ flex: 0.33 }}>
                <Text >Distance Prefrence</Text>
              </View>
              <View style={{ flex: 0.33, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: '2%' }}>
                <View style={{ flex: 0.5 }}>
                  <Text>Distance Selected :</Text>
                </View>
                <View style={{ flex: 0.5 }}>
                  <Text>{Math.floor(this.state.value)}</Text>
                </View>
              </View>
              <View style={{ flex: 0.33, flexDirection: 'row' }}>
                <View style={{ flex: 0.1, justifyContent: 'center' }}>
                  <Text>0KM</Text>
                </View>
                <View style={{ flex: 0.7 }}>
                  <Slider
                    value={this.state.value}
                    onValueChange={value => this.setState({ value })}
                    minimumValue={0}
                    maximumValue={1000}
                  />
                </View>
                <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>1000KM</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flex: 0.2, flexDirection: 'row', padding: '3%' }}>
            <Text style={{ fontSize: WINDOW_HEIGHT * 0.03 }}>Notifications</Text>
          </View>
          <View style={{ flex: 0.2, flexDirection: 'row', backgroundColor: 'white' }}>
            <View style={{ flex: 0.7, justifyContent: 'center', paddingHorizontal: '3%' }}>
              <Text>New Package NearBy</Text>
            </View>
            <View style={{ flex: 0.3, alignItems: 'flex-end' }}>
              <Switch
                onValueChange={(value) => this.setState({newPackageNearby: value})}
                style={{marginBottom: 10}}
                value={this.state.newPackageNearby}
              />
            </View>
          </View>
          <View style={{ flex: 0.2, flexDirection: 'row', backgroundColor: 'white' }}>
            <View style={{ flex: 0.7, justifyContent: 'center', paddingHorizontal: '3%' }}>
              <Text>New Travler NearBy</Text>
            </View>
            <View style={{ flex: 0.3, alignItems: 'flex-end' }}>
              <Switch
                onValueChange={(value) => this.setState({ newTravelerNearBy: value})}
                style={{marginBottom: 10}}
                value={this.state.newTravelerNearBy}
              />
            </View>
          </View>
          <View style={{ flex: 0.2, flexDirection: 'row', backgroundColor: 'white' }}>
            <View style={{ flex: 0.7, justifyContent: 'center', paddingHorizontal: '3%' }}>
              <Text>Request on your Package</Text>
            </View>
            <View style={{ flex: 0.3, alignItems: 'flex-end' }}>
              <Switch
                onValueChange={(value) => this.setState({requestonPackage: value})}
                style={{marginBottom: 10}}
                value={this.state.requestonPackage}
              />
            </View>
          </View>

          <View style={{ flex: 0.2, flexDirection: 'row', backgroundColor: 'white' }}>
            <View style={{ flex: 0.7, justifyContent: 'center', paddingHorizontal: '3%' }}>
              <Text>Request on your Plan</Text>
            </View>
            <View style={{ flex: 0.3, alignItems: 'flex-end',}}>
              <Switch
                onValueChange={(value) => this.setState({ requestonPlan: value})}
                style={{marginBottom: 10}}
                value={this.state.requestonPlan}
              />
            </View>
          </View>
          <View style={{ flex: 0.2, flexDirection: 'row', backgroundColor: 'white' }}>
            <View style={{ flex: 0.7, justifyContent: 'center', paddingHorizontal: '3%' }}>
              <Text>Notifications on Package Tracking</Text>
            </View>
            <View style={{ flex: 0.3, alignItems: 'flex-end' }}>
              <Switch
                onValueChange={(value) => this.setState({notificationOnTracking: value})}
                style={{marginBottom: 10}}
                value={this.state.notificationOnTracking}
              />
            </View>
          </View>
          <TouchableOpacity onPress={() => Actions.Payment()}>
            <View style={{ flex: 0.2, flexDirection: 'row', padding: '3%', marginTop: '3%', backgroundColor: 'white' }}>
              <View style={{ flex: 0.7, justifyContent: 'center', paddingHorizontal: '3%' }}>
                <Text style={{ fontSize: WINDOW_HEIGHT * 0.03 }}>Payment</Text>
              </View>

              <View style={{ flex: 0.3, alignItems: 'flex-end' }}>
                <MIcon active name="payment" size={30} color="grey" style={{ backgroundColor: 'transparent' }} />
              </View>
            </View>
          </TouchableOpacity>
          <View style={{ flex: 0.2, marginTop: '2%' }}>
            <Button
              rounded
              small
              onPress={() => this.onClickSubmit()}
              title="Save Settings"
              color="black"
              backgroundColor="white"
            />
          </View>
          <View style={{ alignSelf:'center', alignItems: 'center' }}>
            <Spinner
              color='#3f51b5'
              animating={this.props.loading}
              style={{ alignSelf:'center', position:'absolute', marginTop: window.height/2-100, left: window.width/2-35 }}
            />
          </View>
        </Content>


      </Container>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps )(Settings);
