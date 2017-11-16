import React, { Component } from 'react'
import { Button,FormInput } from 'react-native-elements';
var ImagePicker = require('react-native-image-picker');
import {ScrollView,View,TouchableOpacity,Text,Image,StyleSheet,PixelRatio, ActivityIndicator, Dimensions, AsyncStorage, Modal} from 'react-native';
import { Container, Content, Form, Item, Input, Label, Spinner, } from 'native-base';
import { addPackage, loadingAddPackageStarted, editPackage } from '../actions/AddPackageActions';
import { getMyPackagesList, myPackageStartLoading , } from '../actions/MyPackagesListActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const window = Dimensions.get('window');
const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
const radioProps = [
  { label: 'Pickup package from Source Location', value: 'pickup' },
  { label: "Deliver packge to Traveler's Location  ", value: 'delivery' }
];
const mapStateToProps = ({ AddPackageReducer, PickUpReducer }) => {
  return {
    addPackageResponse: AddPackageReducer.addPackageResponse,
    isLoading: AddPackageReducer.isLoading,
    pickupAddress: PickUpReducer.pickupAddress,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addPackage, loadingAddPackageStarted,getMyPackagesList, myPackageStartLoading, editPackage }, dispatch)
}
class ParcelDetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pickupAddress: null,
      radioSelected: '',
      description: '',
      length: 0,
      width: 0,
      weight: 0,
      height: 0,
      quantity: 0,
      price: 0,
      budget: 0,
      avatarSource: null,
      base64: '',
      title: '',
      lenghtM: 'cm',
      widthM: 'cm',
      heightM: 'cm',
      weightM: 'kg',
      modalVisible: false
    };
  }
  componentDidMount() {
    console.log("loc",this.props.item);
    if(this.props.item){
      this.setState({title:this.props.item.package_name,length:this.props.item.length, width: this.props.item.width, height: this.props.item.height, description: this.props.item.description, quantity: this.props.item.quantity, price: this.props.item.budget, weight:this.props.item.weight },()=>console.log(this.state.quantity))

      this.setState({ budget: this.props.item.budget }, ()=> console.log("sssghsghgs",this.state.budget));

      //  alert(this.props.item.quantity+"--"+this.props.item.budget+"--"+this.state.budget);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.pickupAddress !== this.props.pickupAddress) {
      this.setState({ pickupAddress: nextProps.pickupAddress }, () => console.log("Updated Address",this.state.pickupAddress))
    }
  }
  componentWillUnmount() {
    try {
      const value = AsyncStorage.getItem('user_id',(err, result) => {
        if (result !== undefined && result !== null && result !== '') {
          this.props.myPackageStartLoading();
          this.props.getMyPackagesList(result);
        }
        });
    } catch (error) {
      // Error retrieving data
      console.log("Error getting Token",error);
    }
  }
  onRadioClick(data) {
    this.setState({ radioSelected: data }, () => console.log(this.state.radioSelected));
    if (data === 'pickup') {
      //Actions.PickupLocationScreen();
      //alert("under developement");
      this.setState({ modalVisible: true });
    } else {
      this.setState({ pickupAddress: null }, () => console.log('Removed Pickup'));
    }
  }
  selectPhotoTapped() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        let base64Strng = { uri: 'data:image/jpeg;base64,' + response.data };
        console.log("base64--", base64Strng.uri);
        this.setState({ base64: base64Strng.uri })
        this.setState({ avatarSource: source });
      }
    });
    try {
      AsyncStorage.setItem('pick_up_location', '');
      AsyncStorage.setItem('pick_up_lat', '');
      AsyncStorage.setItem('pick_up_lng', '');
    } catch (error) {
    // Error saving data
      console.log('Saving user_id Error', error);
    }
}
  submit() {
    if(this.state.radioSelected === '')
      alert("Please select delivery option for Traveler")
    else if (this.state.title === '') {
      alert("Please enter package title.")
    }
    else if(this.state.description==='')
      alert("Please enter description")
    else if(this.state.length=== 0)
      alert("Please enter length")
    else if(this.state.width=== 0)
      alert("Please enter width")
    else if(this.state.weight===0)
      alert("Please enter weight")
    else if(this.state.height===0)
      alert("Please enter height")
    else if(this.state.quantity===0)
      alert("Please enter quantity")
    else if(this.state.price === 0)
      alert("Please enter budget")
    else
    {
      if (this.state.radioSelected === 'pickup') {
        if (this.state.pickupAddress !== null) {
          const value = AsyncStorage.getItem('user_id', (err, result) => {
            if (result !== null && result !== undefined && result !== '' ) {
              this.props.loadingAddPackageStarted();
              var date = new Date();
                const requestJSON = {
                    image: this.state.base64,
                    package_name: this.state.title,
                    weight: this.state.weight+' '+ this.state.weightM,
                    source: this.props.startAddress,
                    destination: this.props.endAddress,
                    startDate: "2016-05-18T16:00:00Z",
                    endDate: "2016-05-18T16:00:00Z",
                    user_id: result,
                    budget: this.state.price,
                    description: this.state.description,
                    quantity: this.state.quantity,
                    picked_up: true,
                    delivered_to_traveller: false,
                    source_lat: this.props.originLatitude,
                    source_long: this.props.originLongitude,
                    destination_lat: this.props.destinationLatitude,
                    destination_long: this.props.destinationLongitude,
                    pick_lat: this.state.pickupAddress.pick_up_lat,
                    pick_long: this.state.pickupAddress.pick_up_lng,
                    pick_address: this.state.pickupAddress.pick_up_location,
                    height: this.state.height+' '+ this.state.heightM,
                    width: this.state.width+' '+this.state.widthM,
                    length: this.state.length+' '+this.state.lenghtM,
                    rating: 5
                };
                console.log(JSON.stringify(requestJSON));
                console.log("ITEMSSS",this.props.item);
                if (this.props.item) {
                  this.props.editPackage(JSON.stringify(requestJSON), this.props.item._id);
                }else {
                  this.props.addPackage(JSON.stringify(requestJSON));
                }

            }
          });
        }else {
          alert('Please select Pickup location');
        }
  }
          else {

            try {
              const value = AsyncStorage.getItem('user_id',(err, result) => {
                this.props.loadingAddPackageStarted();
                var date = new Date();
                  const requestJSON = {
                      image: this.state.base64,
                      package_name:this.state.title,
                      weight: this.state.weight+' '+ this.state.weightM,
                      source:this.props.startAddress,
                      destination:this.props.endAddress,
                      startDate:"2016-05-18T16:00:00Z",
                      endDate:"2016-05-18T16:00:00Z",
                      user_id: result,
                      budget:this.state.price,
                      description: this.state.description,
                      quantity:this.state.quantity,
                      picked_up:"false",
                      delivered_to_traveller:"true",
                      source_lat:this.props.originLatitude,
                      source_long:this.props.originLongitude,
                      destination_lat:this.props.destinationLatitude,
                      destination_long:this.props.destinationLongitude,
                      pick_lat:'',
                      pick_long:'',
                      pick_address: '',
                      height: this.state.height+' '+ this.state.heightM,
                      width: this.state.width+' '+this.state.widthM,
                      length: this.state.length+' '+this.state.lenghtM,
                      rating: 5
                  }
                  console.log(JSON.stringify(requestJSON));
                  if (this.props.item) {
                    this.props.editPackage(JSON.stringify(requestJSON), this.props.item._id);
                  }else {
                    this.props.addPackage(JSON.stringify(requestJSON));
                  }
                });
            } catch (error) {
              // Error retrieving data
              console.log("Error getting Token",error);
            }
          }

        }
    }

    render(){
      let data = [{
  			value: 'cm',
  		}, {
  			value: 'inch',
  		}, {
  			value: 'm',
  		}];
      let dataW = [{
  			value: 'kg',
  		}, {
  			value: 'gm',
  		}
  		];
        return(
         <View style={{flex:1,backgroundColor:'#615ECD'}}>
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
                var data ={
                    'pick_up_location': details.formatted_address,
                    'pick_up_lat': details.geometry.location.lat,
                    'pick_up_lng': details.geometry.location.lng
                  };
                  this.setState({ pickupAddress: data, modalVisible: false },
                      ()=> console.log("New Address Pickup", this.state.pickupAddress)
                    );
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

              currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
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
          <Container style={{flex:.9,padding:5}}>
            <Content>
              <Form>
                <View style={{alignItems:'center'}}>
                  <Text style={{fontWeight:'bold'}}>Upload Image:</Text>
                  <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} style={[styles.avatar, {alignItems:'center'}]}>
                    <View style={[styles.avatar, styles.avatarContainer, {alignItems:'center',backgroundColor:'grey'}]}>
                      { this.state.avatarSource === null ? <Text style={{backgroundColor:'transparent'}}>Select a Photo</Text> :
                          <Image
                            style={styles.avatar}
                            source={this.state.avatarSource} />
                      }
                    </View>
                  </TouchableOpacity>
                  </View>
                  <Text style={{ color: 'white' }}> Choose below option for Traveler</Text>
                    <View style={{marginTop:10,}}>
                      <RadioForm
                        onPress={(data) => this.onRadioClick(data)}
                        radio_props={radioProps}
                        initial={null}
                        animation={false}
                        style={{flex:1, flexDirection:'column'}}
                        buttonColor={'white'}
                        labelColor={'white'}
                      />
                    </View>

                  <View style={{flex:.6,paddingHorizontal:'10%'}}>
    								<View style={{flex:.6,justifyContent:'center'}}>
    									<Item>
                      	<Icon active name='straighten'size={20} color='white' style={{ backgroundColor: 'transparent' }} />
    										<Input placeholder='Package Title' placeholderTextColor='white' value={this.state.title} onChangeText={(text) => this.setState({title:text})} textColor='white'style={{color:'white'}} />
    									</Item>
    								</View>
    								<View style={{flex:.6,flexDirection:'row'}}>
    									<View style={{flex:.7,paddingHorizontal:'2%'}}>
    										<Item>
                          <Icon active name='straighten'size={20} color='white' style={{ backgroundColor: 'transparent' }} />
    											<Input placeholder='Length' placeholderTextColor='white' value={this.state.length}keyboardType='numeric' style={{color:'white'}} onChangeText={(text) => this.setState({length:text})}/>
    										</Item>
    									</View>
    									<View style={{flex:.3,borderBottomColor:'white'}}>
    						        <Dropdown
                          value={this.state.lenghtM.toString()}
    											label='Lenght'
    											data={data}
    											baseColor='white'
    											textColor='red'
    											labelHeight={19}
                          onChangeText={(data,index)=> this.setState({lenghtM:data},() => console.log(this.state.lenghtM))}
    										/>
    									</View>
    								</View>
    								<View style={{flex:.6,flexDirection:'row'}}>
    									<View style={{flex:.7,paddingHorizontal:'2%'}}>
    										<Item>

    											<Icon active name='more-vert'size={20} color='white' style={{ backgroundColor: 'transparent' }} />
    											<Input placeholder='Height' placeholderTextColor='white' keyboardType='numeric'style={{color:'white'}} onChangeText={(text) => this.setState({height:text})} value={this.state.height}/>
    										</Item>
    									</View>
    									<View style={{flex:.3}}>
                        <Dropdown
                          value={this.state.heightM.toString()}
    											label='HEIGHT'
    											data={data}
                          onChangeText={(data,index)=> this.setState({heightM:data},() => console.log(this.state.heightM))}
    											baseColor='white'
    											textColor='red'
    											labelHeight={19}
    										/>
    									</View>
    								</View>
    								<View style={{flex:.6,flexDirection:'row'}}>
    									<View style={{flex:.7,paddingHorizontal:'2%'}}>
    										<Item>

    											<Icon active name='straighten'size={20} color='white' style={{ backgroundColor: 'transparent' }} />
    											<Input placeholder='Width' placeholderTextColor='white' keyboardType='numeric' style={{color:'white'}} onChangeText={(text) => this.setState({width:text})} value={this.state.width}/>
    										</Item>
    									</View>
    									<View style={{flex:.3}}>

    										<Dropdown
                          value={this.state.widthM.toString()}
    											label='WIDTH'
    											data={data}
                          onChangeText={(data,index)=> this.setState({widthM:data},() => console.log(this.state.widthM))}
    											baseColor='white'
    											textColor='red'
    											labelHeight={19}
    										/>
    									</View>
    								</View>
    								<View style={{flex:.6,flexDirection:'row'}}>
    									<View style={{flex:.7,paddingHorizontal:'2%'}}>
    										<Item>

    											<Icon active name='markunread-mailbox'size={20} color='white' style={{ backgroundColor: 'transparent' }} />
    											<Input placeholder='Weight' placeholderTextColor='white' keyboardType='numeric'style={{color:'white'}} onChangeText={(text) => this.setState({weight:text})} value={this.state.weight}/>
    										</Item>
    									</View>
    									<View style={{flex:.3}}>
                        <Dropdown
                          value={this.state.weightM.toString()}
    											label='WEIGHT'
    											data={dataW}
                          onChangeText={(data,index)=> this.setState({weightM:data},() => console.log(this.state.weightM))}
    											baseColor='white'
    											textColor='red'
    											labelHeight={19}
    										/>
    									</View>
    								</View>
    								<View style={{flex:.6}}>
    									<Item>

    										<Icon active name='attach-money'size={20} color='white' style={{ backgroundColor: 'transparent' }} />
    										<Input placeholder='Budget' placeholderTextColor='white' keyboardType='numeric'style={{color:'white'}} onChangeText={(text) => this.setState({price:text})} value={this.state.budget}/>
    									</Item>
    								</View>
                    <View style={{flex:.6}}>
    									<Item>

    										<Icon active name='quantity'size={20} color='white' style={{ backgroundColor: 'transparent' }} />
    										<Input placeholder='Quantity' placeholderTextColor='white' keyboardType='numeric'style={{color:'white'}}value={this.state.quantity} onChangeText={(text) => this.setState({quantity:text})} />
    									</Item>
    								</View>
    								<View style={{flex:.6}}>
    									<Item>
    										<Item>
    											<Input placeholder='Discription Of Package..' placeholderTextColor='white'style={{color:'white'}} multiline={true} onChangeText={(text) => this.setState({description:text})} value={this.state.description}/>
    										</Item>
    									</Item>
    								</View>
    							</View>

              </Form>

                <View style={{flex:1,marginTop:window.height/2-30,marginLeft:window.width/2-35,position:'absolute'}} >
                  <ActivityIndicator
                    size='large'
                    color='white'
                    animating={this.props.isLoading}
                    style={{alignItems: 'center', alignSelf: 'center' }}
                  />
                </View>
              </Content>

              </Container>
              <View style={{justifyContent:'center',marginTop:20}}>
                  <Button
                  rounded
                  color='#6643d8'
                  backgroundColor="white"
                  buttonStyle={{ borderRadius:5}}
                  textStyle={{textAlign: 'center',fontWeight:'500'}}
                  title={`Submit`}
                  onPress={()=>this.submit()}
                  />
              </View>
              </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
      flex: 1,
      backgroundColor: 'lightgrey',
    },
    avatarContainer: {
      borderColor: '#9B9B9B',
      borderWidth: 1 / PixelRatio.get(),
      justifyContent: 'center',
      alignItems: 'center'
    },
    avatar: {
      borderRadius: 75,
      width: 150,
      height: 150
    },
    row:{
        flexDirection:'row',
        flex:0.3333333333333
    }
  });

export default connect(mapStateToProps,mapDispatchToProps )(ParcelDetailScreen)
