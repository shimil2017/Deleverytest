import React, { Component } from 'react'
import { Button,FormInput } from 'react-native-elements';
var ImagePicker = require('react-native-image-picker');
import {ScrollView,View,TouchableOpacity,Text,Image,StyleSheet,PixelRatio, ActivityIndicator, Dimensions, AsyncStorage, Modal} from 'react-native';
import { Container, Content, Form, Item, Input, Label, Spinner, } from 'native-base';
import { addPackage, loadingAddPackageStarted } from '../actions/AddPackageActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
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
  { label: '  Pickup package from Source Location  ', value: 'pickup' },
  { label: "  Deliver Packge to  Traveler's   Location", value: 'delivery' }
];
const mapStateToProps = ({ AddPackageReducer, PickUpReducer }) => {
  return {
    addPackageResponse: AddPackageReducer.addPackageResponse,
    isLoading: AddPackageReducer.isLoading,
    pickupAddress: PickUpReducer.pickupAddress,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addPackage, loadingAddPackageStarted }, dispatch)
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
      avatarSource: null,
      base64: '',
      title: '',
      lenghtM: 'CM',
      widthM: 'CM',
      heightM: 'CM',
      weightM: 'KG',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.pickupAddress !== this.props.pickupAddress) {
      this.setState({ pickupAddress: nextProps.pickupAddress }, () => console.log("Updated Address",this.state.pickupAddress))
    }
  }
  onRadioClick(data) {
    this.setState({ radioSelected: data }, () => console.log(this.state.radioSelected));
    if (data === 'pickup') {
      Actions.PickupLocationScreen();
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
                    weight: this.state.weight,
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
                    height: this.state.height,
                    width: this.state.width,
                    length: this.state.length,
                };
                console.log(JSON.stringify(requestJSON));
                this.props.addPackage(JSON.stringify(requestJSON));
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
                      weight:this.state.weight,
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
                      height: this.state.height,
                      width:this.state.width,
                      length:this.state.length,
                  }
                  console.log(JSON.stringify(requestJSON));
                  this.props.addPackage(JSON.stringify(requestJSON));
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
  			value: 'CM',
  		}, {
  			value: 'INCH',
  		}, {
  			value: 'M',
  		}];
      let dataW = [{
  			value: 'Kg',
  		}, {
  			value: 'gram',
  		}
  		];
        return(
         <View style={{flex:1,backgroundColor:'#615ECD'}}>
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
                        formHorizontal={false}
                        buttonColor={'white'}
                        labelColor={'white'}
                        style={{backgroundColor: 'transparent', padding:0, flex:1 }}
                      />
                    </View>

                  <View style={{flex:.6,paddingHorizontal:'10%'}}>
    								<View style={{flex:.6,justifyContent:'center'}}>
    									<Item>
                      	<Icon active name='straighten'size={20} color='white' style={{ backgroundColor: 'transparent' }} />
    										<Input placeholder='Package Title' placeholderTextColor='white' onChangeText={(text) => this.setState({title:text})} textColor='white'style={{color:'white'}} />
    									</Item>
    								</View>
    								<View style={{flex:.6,flexDirection:'row'}}>
    									<View style={{flex:.7,paddingHorizontal:'2%'}}>
    										<Item>
                          <Icon active name='straighten'size={20} color='white' style={{ backgroundColor: 'transparent' }} />
    											<Input placeholder='Length' placeholderTextColor='white' keyboardType='numeric' style={{color:'white'}} onChangeText={(text) => this.setState({length:text})}/>
    										</Item>
    									</View>
    									<View style={{flex:.3,borderBottomColor:'white'}}>
    						        <Dropdown
                          value={data[0].value.toString()}
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
    											<Input placeholder='Height' placeholderTextColor='white' keyboardType='numeric'style={{color:'white'}} onChangeText={(text) => this.setState({height:text})}/>
    										</Item>
    									</View>
    									<View style={{flex:.3}}>
                        <Dropdown
                          value={data[0].value.toString()}
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
    											<Input placeholder='Width' placeholderTextColor='white' keyboardType='numeric' style={{color:'white'}} onChangeText={(text) => this.setState({width:text})}/>
    										</Item>
    									</View>
    									<View style={{flex:.3}}>

    										<Dropdown
                          value={data[0].value.toString()}
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
    											<Input placeholder='Weight' placeholderTextColor='white' keyboardType='numeric'style={{color:'white'}} onChangeText={(text) => this.setState({weight:text})}/>
    										</Item>
    									</View>
    									<View style={{flex:.3}}>
                        <Dropdown
                          value={dataW[0].value.toString()}
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
    										<Input placeholder='Price Detail' placeholderTextColor='white' keyboardType='numeric'style={{color:'white'}} onChangeText={(text) => this.setState({price:text})}/>
    									</Item>
    								</View>
                    <View style={{flex:.6}}>
    									<Item>

    										<Icon active name='quantity'size={20} color='white' style={{ backgroundColor: 'transparent' }} />
    										<Input placeholder='Quantity' placeholderTextColor='white' keyboardType='numeric'style={{color:'white'}} onChangeText={(text) => this.setState({quantity:text})}/>
    									</Item>
    								</View>
    								<View style={{flex:.6}}>
    									<Item>

    										<Item>


    											<Input placeholder='Discription Of Package..' placeholderTextColor='white'style={{color:'white'}} multiline={true} onChangeText={(text) => this.setState({description:text})}/>
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
