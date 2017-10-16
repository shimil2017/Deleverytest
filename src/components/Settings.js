import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { Container, Header, Content, List, ListItem, Text, Items, Left, Icon, Body, Segment, Right } from 'native-base';
import { Button } from 'react-native-elements';
import Switch from 'react-native-customisable-switch';
import Slider from 'react-native-slider';
import {
  MKSwitch, mdl, MKColor,
} from 'react-native-material-kit';
import Payment from './Payment';
import { Actions } from 'react-native-router-flux';

const WINDOW_HEIGHT = Dimensions.get('window').height;

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      arr: [],
      switch2: false,
    };
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
              <MKSwitch checked={false} />
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
                  <Text>{this.state.value}</Text>
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
              <MKSwitch checked={false}	/>
            </View>
          </View>
          <View style={{ flex: 0.2, flexDirection: 'row', backgroundColor: 'white' }}>
            <View style={{ flex: 0.7, justifyContent: 'center', paddingHorizontal: '3%' }}>
              <Text>New Travler NearBy</Text>
            </View>
            <View style={{ flex: 0.3, alignItems: 'flex-end' }}>
              <mdl.Switch
                onColor="rgba(255,152,0,.3)"
                thumbOnColor="red"
                rippleColor="rgba(255,152,0,.2)"
                onPress={() => this.setState({ switch2: false })}
                onCheckedChange={e => console.log('orange switch checked', e)}
              />
            </View>
          </View>
          <View style={{ flex: 0.2, flexDirection: 'row', backgroundColor: 'white' }}>
            <View style={{ flex: 0.7, justifyContent: 'center', paddingHorizontal: '3%' }}>
              <Text>Request on your Package</Text>
            </View>
            <View style={{ flex: 0.3, alignItems: 'flex-end' }}>
              <MKSwitch checked={false} />
            </View>
          </View>
          <View style={{ flex: 0.2, flexDirection: 'row', backgroundColor: 'white' }}>
            <View style={{ flex: 0.7, justifyContent: 'center', paddingHorizontal: '3%' }}>
              <Text>Request on your Plan</Text>
            </View>
            <View style={{ flex: 0.3, alignItems: 'flex-end', paddingRight: '2%' }}>
              <Switch
                activeBackgroundColor="blue"
                inactiveBackgroundColor="pink"
                activeButtonBackgroundColor="orange"
                inactiveButtonBackgroundColor="red"
                switchWidth={50}
                switchHeight={20}
                buttonWidth={30}
                buttonHeight={30}
                buttonBorderColor={'rgba(0, 0, 0, 1)'}
                buttonBorderWidth={0}
                animationTime={150}
                padding
                value={this.state.switch2}
                onPress={() => this.setState({ switch2: true })}
              />
            </View>
          </View>
          <TouchableOpacity onPress={() => Actions.payment()}>
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
              onPress={() => alert('Under Dovelopment')}
              title="Save Settings"
              color="black"
              backgroundColor="white"
            />
          </View>
        </Content>
      </Container>
    );
  }
}
