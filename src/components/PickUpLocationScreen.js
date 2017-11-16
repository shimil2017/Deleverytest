import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Spinner } from 'native-base';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements';
import Geocoder from 'react-native-geocoding';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { addPickup, removePickup } from '../actions/PickupActions';

const mapStateToProps = ({ PickUpReducer }) => {
  return {
    pickupAddress: PickUpReducer.pickupAddress,

  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addPickup, removePickup }, dispatch);
}
class PickupLocationScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      originLatitude: 0,
      originLongitude: 0,
      showButton: false,
      startAddress: '',
      loading: false,
    }
  }
  componentWillUnmount() {
    if (this.state.startAddress !== '') {
        var data ={
          'pick_up_location': this.state.startAddress,
          'pick_up_lat': this.state.originLatitude,
          'pick_up_lng': this.state.originLongitude
        };
        this.props.addPickup(data);
      }
      else {
        this.props.removePickup();
      }

  }
    onClickSubmit() {
        this.setState({ originLatitude:this.state.region.latitude,originLongitude:this.state.region.longitude });
        this.setState({isSource: true, isDestination: true, showButton:false, loading: true});
        Geocoder.getFromLatLng(this.state.region.latitude, this.state.region.longitude).then(
          json => {
            console.log("Address DATA",JSON.stringify(json.results[0].formatted_address));
            var address_component = json.results[0].formatted_address;
            this.setState({startAddress: address_component,loading:false});
            if (this.state.originLatitude !== 0 && this.state.destinationLatitude !== 0) {
              this.setState({showContinueButton: true});
              this.map.fitToCoordinates([
                {latitude:this.state.originLatitude,longitude:this.state.originLongitude},
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
  onClickSource(){
    this.setState({startAddress:'',showButton:true, modalVisible: true, showButton:false, showContinueButton:false});
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
        <Modal transparent={false} visible={this.state.modalVisible} style={{ flexDirection: "column", flex: 1, marginTop:40 }}>

          <GooglePlacesAutocomplete
            placeholder= 'Search'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed='auto' // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
              console.log("=========", details);
              this.setState({ startAddress: details.formatted_address });
              this.setState({ originLatitude: details.geometry.location.lat,
                originLongitude: details.geometry.location.lng, modalVisible: false },
                  ()=> console.log("sadasdghasg")
                );
                this.map.fitToCoordinates([
                  {latitude:this.state.originLatitude,longitude:this.state.originLongitude},
                ], {
                edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
                animated: true,
                });
              //  this.setState({ isSource: true, isDestination: true, showButton:false, loading: true});
            }}

            getDefaultValue={() => ''}

            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyA8W4LJk2g7BDmtuJNHmdrHUYj9mPEixkQ',
              language: 'en', // language of the results
            }}

            styles={{
              flexDirection:'column',
              textInputContainer: {
                width: '100%'
              },
              description: {
                fontWeight: 'bold'
              },
              predefinedPlacesDescription: {
                color: '#1faadb'
              }
            }}

            currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel=""
            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={{
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }}
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              rankby: 'distance',
              types: 'food'
            }}

            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            renderLeftButton={() => <Icon name="chevron-left" onPress={()=> this.setState({modalVisible:false})} style={{marginTop:10} } size={25} />}
            renderRightButton={() => <TouchableOpacity style={{marginTop:10}} onPress={()=> this.onChooseFromMap()}>
              <Text>Chosse from Map</Text>
            </TouchableOpacity>}
          />
        </Modal>
     <MapView
       ref={ref => { this.map = ref; }}
       loadingEnabled={true}
       loadingIndicatorColor='red'
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
          <MapView.Marker
            pinColor='blue'
            draggable
            coordinate={{longitude: this.state.region.longitude,latitude: this.state.region.latitude }}
            onDragEnd={(e) => this.setState({ region: e.nativeEvent.coordinate })}
         />
         <View style={{flexDirection:'row',padding:8,width:window.width, backgroundColor:'#fff',margin:5 }}>

           <Icon name="location-on" size={25} color='green' style={{backgroundColor:'transparent'}} />
           <TouchableOpacity onPress={()=> this.onClickSource()}>
             {
               (this.state.startAddress === '')?
               <Text style={{width:250}}> Select start Point</Text>
                 :
               <Text style={{width:250}}>{this.state.startAddress}</Text>
             }
           </TouchableOpacity>
           {
             (this.state.startAddress !== '')?
               <Icon onPress={()=> this.onClickSource()} name="create" size={25} color='grey' style={{alignSelf:"flex-end",backgroundColor:'transparent'}} />
               :
               null
           }

             <Spinner
               color='#3f51b5'
               animating={this.state.loading}
               style={{ alignSelf:'center',position:'absolute', marginTop: window.height/2-100, left: window.width/2-35 }}
             />

         </View>
        <View style={(this.state.showContinueButton === true)?{flex:.1}:{flex:null}}>
         {
           (this.state.showButton === true)?
             <Button
               style={{alignSelf:'flex-end',justifyContent:'flex-end'}}
               onPress={()=> this.onClickSubmit()}
               raised
               buttonStyle={{backgroundColor: '#00cccc', borderRadius:5}}
               textStyle={{textAlign: 'center',fontWeight:'500'}}
               title={'Select this location'}
             />
          :
            <View></View>
         }
         </View>

        </MapView>

    </View>
  );
}
}
export default connect(mapStateToProps,mapDispatchToProps )(PickupLocationScreen)
