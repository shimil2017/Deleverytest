import React, { Component } from 'react'
import { View,Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements';
const window = Dimensions.get('window');
import Geocoder from 'react-native-geocoding';
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
    };
    //AIzaSyBgykJIQqrUq9XOgs4G8YL5DuSGrE_oPZs
    Geocoder.setApiKey('AIzaSyBgykJIQqrUq9XOgs4G8YL5DuSGrE_oPZs');
  }
  onClickSource(){
    this.setState({isSource:true,isDestination:false, showButton:true});
  }
  onClickDestination(){
    this.setState({isSource:false,isDestination:true, showButton:true});
  }
  onClickSubmit(){
    if (this.state.isSource == true) {
        this.setState({ originLatitude:this.state.region.latitude,originLongitude:this.state.region.longitude });
        this.setState({isSource: true, isDestination: true, showButton:false});
        Geocoder.getFromLatLng(this.state.region.latitude, this.state.region.longitude).then(
          json => {
            var address_component = json.results[0].address_components[0];
            alert(address_component.long_name);
          },
          error => {
            alert(error);
          }
        );
    }
    if (this.state.isDestination == true) {
        this.setState({ destinationLatitude: this.state.region.latitude,destinationLongitude:this.state.region.longitude });
        this.setState({isSource: true, isDestination: true,showButton:false});
    }

  }
  render() {
  return (
    <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,}}>

     <MapView
          style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,}}
          region={this.state.region}
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
              <Icon name="location-on" size={25} color='#606060' style={{backgroundColor:'transparent'}} />
              <TouchableOpacity onPress={()=> this.onClickSource()}>
                {
                  (this.state.startAddress === '')?
                  <Text > Start Point</Text>
                  :
                <Text >{this.state.startAddress }</Text>
              }
              </TouchableOpacity>
            </View>
            :
            <View></View>
          }
          {
            (this.state.isDestination === true)?
            <View style={{flexDirection:'row',padding:10,width:window.width, backgroundColor:'#fff',margin:10 }}>
              <Icon name="location-on" size={25} color='#606060' style={{backgroundColor:'transparent'}} />
              <TouchableOpacity onPress={()=> this.onClickDestination()}>
                <Text >End Locations</Text>
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
            (this.state.originLatitude !== 0 && this.state.destinationLatitude !== 0)?
            <Button

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