import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, AsyncStorage, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { addTravelPlan, loadingAddPackageStarted } from '../actions/AddPackageActions';
import { bindActionCreators } from 'redux';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
const window = Dimensions.get('window');
import Geocoder from 'react-native-geocoding';

const mapStateToProps = ({ AddPackageReducer }) => {
  return {
    addTravelPlanResponse: AddPackageReducer.addTravelPlanResponse,
    isLoading: AddPackageReducer.isLoading,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addTravelPlan, loadingAddPackageStarted }, dispatch)

}
 class PostPackageScreen extends Component{
  constructor(props) {
    super(props);
    this.state = { region: { latitude: 37.78825,
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
  onClickSource() {
    this.setState({startAddress:'',isSource:true,isDestination:false, showButton:true, showContinueButton:false });
  }
  onClickDestination() {
    this.setState({endAddress:'',isSource:false,isDestination:true, showButton:true, showContinueButton:false });
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
          this.props.addTravelPlan(JSON.stringify(requestJSON));
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
              (this.state.isSource ===  true )?
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
              :
              <View></View>
            }
            {
              (this.state.isDestination === true)?
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
              :
              <View></View>
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
                  endAddress: this.state.endAddress })}
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
