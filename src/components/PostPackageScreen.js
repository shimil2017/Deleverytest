import React, { Component } from 'react'
import { View,Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements';
const window = Dimensions.get('window');
import Geocoder from 'react-native-geocoding';
import { Actions } from 'react-native-router-flux';
export default class PostPackageScreen extends Component{
  constructor(props) {
    super(props);

    this.state = {
        region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
        originLatitude: 0,
        originLongitude: 0,
        destinationLatitude: 0,
        destinationLongitude: 0,
        isSource:true,
        isDestination:true,
        showButton: false,
        startAddress:'',
        endAddress:'',
        loading:false,
        showContinueButton: false,

    };
    //AIzaSyBgykJIQqrUq9XOgs4G8YL5DuSGrE_oPZs
    Geocoder.setApiKey('AIzaSyBgykJIQqrUq9XOgs4G8YL5DuSGrE_oPZs');
  }
  onClickSource(){
    this.setState({isSource:true,isDestination:false, showButton:true, showContinueButton:false });
  }
  onClickDestination(){
    this.setState({isSource:false,isDestination:true, showButton:true, showContinueButton:false });
  }
  onClickSubmit(){
    if (this.state.isSource == true) {
        this.setState({ originLatitude:this.state.region.latitude,originLongitude:this.state.region.longitude });
        this.setState({isSource: true, isDestination: true, showButton:false,loading: true});
        Geocoder.getFromLatLng(this.state.region.latitude, this.state.region.longitude).then(
          json => {
            console.log("Address DATA",JSON.stringify(json.results[0].formatted_address));
            var address_component = json.results[0].formatted_address;
            this.setState({startAddress: address_component});
            if (this.state.originLatitude !== 0 && this.state.destinationLatitude !== 0) {
              this.setState({showContinueButton: true});
              this.map.fitToCoordinates([
                {latitude:this.state.originLatitude,longitude:this.state.originLongitude},
                {latitude:this.state.destinationLatitude,longitude:this.state.destinationLongitude}
              ], {
              edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
              animated: true,
              });
            }
          },
          error => {
            alert(error);
          }
        );
    }
    if (this.state.isDestination == true) {
        this.setState({ destinationLatitude: this.state.region.latitude,destinationLongitude:this.state.region.longitude });
        this.setState({isSource: true, isDestination: true,showButton:false,loading: true});
        Geocoder.getFromLatLng(this.state.region.latitude, this.state.region.longitude).then(
          json => {
            console.log("Address DATA",JSON.stringify(json.results[0].formatted_address));
            var address_component = json.results[0].formatted_address;
            this.setState({endAddress: address_component});
            if (this.state.originLatitude !== 0 && this.state.destinationLatitude !== 0) {
              this.setState({showContinueButton: true});
              this.map.fitToCoordinates([
                {latitude:this.state.originLatitude,longitude:this.state.originLongitude},
                {latitude:this.state.destinationLatitude,longitude:this.state.destinationLongitude}
              ], {
              edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
              animated: true,
              });
            }

          },
          error => {
            alert(error);
          }
        );
    }
  }
  render() {
    var _this=this;
  return (
    <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,}}>

     <MapView
       ref={ref => { this.map = ref; }}

       fitToElements={true}
       style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,}}
        initialRegion={this.state.region}
        onRegionChange={(region) => this.setState({ region: region })}
        >
        {
          (this.state.showButton)?
          <MapView.Marker
            pinColor='blue'
            draggable
            coordinate={{longitude: this.state.region.longitude,latitude: this.state.region.latitude }}
            onDragEnd={(e) => this.setState({ region: e.nativeEvent.coordinate })}
         />
         :
         null
        }
        {
          (!this.state.showButton)?
            <MapView.Marker
              key={1}
              coordinate={{longitude: this.state.originLongitude,latitude: this.state.originLatitude }}
              title='Source'
              description='Source Point'
              pinColor="green"
            />
            :
            null
        }
        {
          (!this.state.showButton)?
            <MapView.Marker
              key={2}
              coordinate={{latitude: this.state.destinationLatitude,longitude: this.state.destinationLongitude }}
              title='Destination'
              description='Destination Point'
            />
            :
            null
        }
        </MapView>
        <View style={{flexDirection:'column'}}>
          <Text style={{padding:10,backgroundColor:'#fff'}}>Locations</Text>
          {
            (this.state.isSource ===  true )?
            <View style={{flexDirection:'row',padding:10,width:window.width, backgroundColor:'#fff',margin:10 }}>
              <Icon name="location-on" size={25} color='green' style={{backgroundColor:'transparent'}} />
              <TouchableOpacity onPress={()=> this.onClickSource()}>
                {
                  (this.state.startAddress === '')?
                  <Text > Start Point</Text>
                    :
                  <Text >{this.state.startAddress}</Text>
                }
              </TouchableOpacity>
            </View>
            :
            <View></View>
          }
          {
            (this.state.isDestination === true)?
            <View style={{flexDirection:'row',padding:10,width:window.width, backgroundColor:'#fff',margin:10 }}>
              <Icon name="location-on" size={25} color='red' style={{backgroundColor:'transparent'}} />
              <TouchableOpacity onPress={()=> this.onClickDestination()}>
                {
                  (this.state.endAddress === '')?
                  <Text > End Point</Text>
                  :
                  <Text >{this.state.endAddress}</Text>
                }
              </TouchableOpacity>
            </View>
            :
            <View></View>
          }
          {
            (this.state.showButton === true)?
              <Button
                style={{alignSelf:'flex-end'}}
                onPress={()=> this.onClickSubmit()}
                raised
                buttonStyle={{backgroundColor: '#00cccc', borderRadius:5}}
                textStyle={{textAlign: 'center',fontWeight:'500'}}
                title={`Select this location`}
              />
            :
              <View></View>
          }

          {
            (this.state.showContinueButton === true)?
            <Button
              onPress={()=> Actions.ParcelDetail({ originLatitude: this.state.originLatitude,
              originLongitude: this.state.originLongitude,
              destinationLatitude: this.state.destinationLatitude,
              destinationLongitude: this.state.destinationLongitude,
              startAddress: this.state.startAddress,
              endAddress: this.state.endAddress })}
              raised
              buttonStyle={{backgroundColor: '#00cccc', borderRadius:5}}
              textStyle={{textAlign: 'center',fontWeight:'500'}}
              title={`Continue`}
            />
            :
            null
         }
         </View>
    </View>
  );
}
}
