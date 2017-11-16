import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, AsyncStorage, ActivityIndicator, Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { addTravelPlan, loadingAddPackageStarted, editPlan } from '../actions/AddPackageActions';
import { bindActionCreators } from 'redux';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { getMyTravelPlanList, myPlanStartLoading } from '../actions/MyTravelPlansListActions';
const window = Dimensions.get('window');
import Geocoder from 'react-native-geocoding';

const mapStateToProps = ({ AddPackageReducer }) => {
  return {
    addTravelPlanResponse: AddPackageReducer.addTravelPlanResponse,
    isLoading: AddPackageReducer.isLoading,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addTravelPlan, loadingAddPackageStarted, getMyTravelPlanList, myPlanStartLoading, editPlan  }, dispatch)

}
 class PostPackageScreen extends Component {
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
      destinationLatitude: 0,
      destinationLongitude: 0,
      isSource: true,
      isDestination: true,
      showButton: false,
      startAddress: '',
      endAddress: '',
      loading: false,
      showContinueButton: false,
      modalVisible: false,
    };
    //AIzaSyBgykJIQqrUq9XOgs4G8YL5DuSGrE_oPZs
    Geocoder.setApiKey('AIzaSyBgykJIQqrUq9XOgs4G8YL5DuSGrE_oPZs');
  }
  componentDidMount() {
    console.log("loc",this.props.item)
    if(this.props.item){
      this.setState({startAddress:this.props.item.source,endAddress:this.props.item.destination, originLongitude: this.props.item.source_long, originLatitude: this.props.item.source_lat, destination_lat: this.props.item.destination_lat, destination_long: this.props.item.destination_long,showContinueButton: true })
    }
    if(this.props.item1){
      this.setState({ startAddress:this.props.item1.source, endAddress:this.props.item1.destination,originLatitude:this.props.item1.source_lat,originLongitude:this.props.item1.source_long,destinationLatitude:this.props.item1.destination_lat,
        destinationLongitude:this.props.item1.destination_long,showContinueButton:true});
    }
    this.watchID = navigator.geolocation.watchPosition((position) => {
      console.log("Currebt==",position);
      this.setState({region:{longitude: position.coords.longitude, latitude: position.coords.latitude}},()=>console.log("Updated Position",this.state.region));
    });
  }
  componentWillUnmount() {
    try {
      const value = AsyncStorage.getItem('user_id',(err, result) => {
        console.log("Loading for Traveld");
        if (result !== undefined && result !== null && result !== '') {
          this.props.myPlanStartLoading();
          this.props.getMyTravelPlanList(result);
        }
        });
    } catch (error) {
      // Error retrieving data
      console.log("Error getting Token",error);
    }
  }
  onClickSource() {
    this.setState({ modalVisible: true, startAddress:'',isSource:true,isDestination:false, showButton:false, showContinueButton:false });
  }
  onClickDestination() {
    this.setState({modalVisible: true, endAddress:'',isSource:false,isDestination:true, showButton:false, showContinueButton:false });
  }
  onChooseFromMap(){
    if (this.state.isSource) {
        this.setState({ originLatitude: 0, originLongitude: 0, modalVisible: false, startAddress:'',isSource:true,isDestination:false, showButton: true, showContinueButton:false },()=>console.log("Start"));
    }
    if (this.state.isDestination) {
        this.setState({ destinationLatitude: 0, destinationLongitude: 0, modalVisible: false, endAddress:'',isSource:false,isDestination:true, showButton: true, showContinueButton:false }, ()=>console.log("Start"));
    }
  }
  onClickSubmit() {
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
            console.log(error);
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
  onPostTravelPlanClick(){
    try {

      const value = AsyncStorage.getItem('user_id',(err, result) => {
        this.props.loadingAddPackageStarted();
          const requestJSON = {
              source:this.state.startAddress,
              destination:this.state.endAddress,
              startDate:this.props.startDate,
              endDate:this.props.endDate,
              user_id: result,
              budget:this.props.budget,
              source_lat:this.state.originLatitude,
              source_long:this.state.originLongitude,
              destination_lat:this.state.destinationLatitude,
              destination_long:this.state.destinationLongitude,
          }
          console.log(JSON.stringify(requestJSON));
          if(this.props.item1){
            this.props.editPlan(JSON.stringify(requestJSON), this.props.item1._id);
          }
          else{
            this.props.addTravelPlan(JSON.stringify(requestJSON));
        }
        });
    } catch (error) {
      // Error retrieving data
      console.log("Error getting Token",error);
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
    <Modal transparent={false} visible={this.state.modalVisible} style={{ flexDirection: "column", flex: 1, marginTop:40 }}>

        <GooglePlacesAutocomplete
        placeholder='Search'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed='auto'    // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          console.log("=========", details);
          if (this.state.isSource) {
            this.setState({startAddress: details.formatted_address});
            this.setState({ originLatitude: details.geometry.location.lat,
              originLongitude: details.geometry.location.lng, modalVisible: false },
              ()=> console.log("sadasdghasg")
            );
          //  this.setState({ isSource: true, isDestination: true, showButton:false, loading: true});
          }
          if (this.state.isDestination) {
            this.setState({ destinationLatitude: details.geometry.location.lat,destinationLongitude:details.geometry.location.lng });
            //this.setState({isSource: true, isDestination: true,showButton:false,loading: true});
            this.setState({endAddress: details.formatted_address, modalVisible: false},()=>console.log("End Address"));

            this.map.fitToCoordinates([
              {latitude:this.state.originLatitude,longitude:this.state.originLongitude},
              {latitude:this.state.destinationLatitude,longitude:this.state.destinationLongitude}
            ], {
            edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
            animated: true,
            });
            if (this.state.startAddress !== '') {
              this.setState({isSource: true, isDestination: true,showButton:false,loading: true, showContinueButton: true });
            }
          }
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
        currentLocationLabel="Current location"
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
       followsUserLocation={true}
       ref={ref => { this.map = ref; }}
       loadingEnabled={true}
       loadingIndicatorColor='red'
       fitToElements={true}
       showsMyLocationButton={true}
       showsUserLocation={true}
       style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,}}
        initialRegion={this.state.region}
        onRegionChange={(region) => this.setState({ region: region })}
        >
        {(this.state.showContinueButton === true )?
          <MapView.Polyline
               key="key"
               coordinates={[{latitude: this.state.originLatitude, longitude: this.state.originLongitude},
               {latitude: this.state.destinationLatitude, longitude: this.state.destinationLongitude}]}
               strokeColor="red"
               fillColor="red"
               strokeWidth={1}
             />
           :
           null
        }
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
        <View style={(this.state.showContinueButton === true)?{flex:1}:{flex:null}}>
          <View style={(this.state.showContinueButton === true)?{flex:.9}:{flex:null}}>
            {

              <View style={{flexDirection:'row',padding:8,width:window.width, backgroundColor:'#fff',margin:5 }}>
                <Icon name="location-on" size={25} color='green' style={{backgroundColor:'transparent'}} />
                <TouchableOpacity onPress={()=> this.onClickSource()}>
                  {
                    (this.state.startAddress === '')?
                    <Text style={{width:300}}> Select start Point</Text>
                      :
                    <Text style={{width:300}}>{this.state.startAddress}</Text>
                  }
                </TouchableOpacity>
                {
                  (this.state.startAddress !== '')?
                    <Icon onPress={()=> this.onClickSource()} name="create" size={25} color='grey' style={{alignSelf:"flex-end",backgroundColor:'transparent'}} />
                    :
                    null
                }

              </View>

            }
            {

              <View style={{flexDirection:'row',padding:8,width:window.width, backgroundColor:'#fff',margin:5 }}>
                <Icon name="location-on" size={25} color='red' style={{backgroundColor:'transparent'}} />
                <TouchableOpacity onPress={()=> this.onClickDestination()}>
                  {
                    (this.state.endAddress === '')?
                    <Text style={{width:300}}>Select End Point</Text>
                    :
                    <Text style={{width:300}}>{this.state.endAddress}</Text>
                  }
                </TouchableOpacity>
                {
                  (this.state.endAddress !== '')?
                    <Icon onPress={()=> this.onClickDestination()} name="create" size={25} color='grey' style={{alignSelf:"flex-end",backgroundColor:'transparent'}} />
                    :
                    null
                }
              </View>

            }
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
                    title={`Select this location`}
                  />
                :
                  <View></View>
              }

              {
                (this.state.showContinueButton === true && this.props.isTravelPlan == null)?
                <Button
                  onPress={()=> Actions.ParcelDetail({ originLatitude: this.state.originLatitude,
                  originLongitude: this.state.originLongitude,
                  destinationLatitude: this.state.destinationLatitude,
                  destinationLongitude: this.state.destinationLongitude,
                  startAddress: this.state.startAddress,
                  endAddress: this.state.endAddress, item: this.props.item })}
                  raised
                  buttonStyle={{backgroundColor: '#00cccc', borderRadius:5}}
                  textStyle={{textAlign: 'center',fontWeight:'500'}}
                  title={`Continue`}
                />
                :
                null
            }
            {
              (this.props.isTravelPlan !=null && this.props.isTravelPlan === true && this.state.showContinueButton === true )?
              <Button
                onPress={()=> this.onPostTravelPlanClick()}
                raised
                buttonStyle={{backgroundColor: '#00cccc', borderRadius:5}}
                textStyle={{textAlign: 'center',fontWeight:'500'}}
                title={`Submit Travel Plan`}
              />
              :
              null
            }
          </View>
          <View style={{flex:1,marginTop:window.height/2-30,marginLeft:window.width/2-35,position:'absolute'}} >
            <ActivityIndicator
              size='large'
              color='#3f51b5'
              animating={this.props.isLoading}
              style={{alignItems: 'center', alignSelf: 'center' }}
            />
          </View>
         </View>
    </View>
  );
}
}
export default connect(mapStateToProps, mapDispatchToProps )(PostPackageScreen)
