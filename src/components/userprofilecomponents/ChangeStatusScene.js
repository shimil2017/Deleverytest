import React, { Component } from 'react'
import { View, Text, TextInput, ScrollView, TouchableOpacity, AsyncStorage, Image, KeyboardAvoidingVie, Dimensions, ActivityIndicator, ImageBackground } from 'react-native';
import { FormInput, SocialIcon } from 'react-native-elements';
import { Card, Button, Container, Spinner, Thumbnail, Form, Item, Input, Label, Content } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StarRating from 'react-native-star-rating';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import { updateDealStatus, updateDealLoading } from '../../actions/ChangeStatusActions';
import { getMyTravelPlanList, myPlanStartLoading } from '../../actions/MyTravelPlansListActions';
import { getMyPackagesList, myPackageStartLoading } from '../../actions/MyPackagesListActions';
const window = Dimensions.get('window');

const mapStateToProps = ({ UpdateDealReducer }) => {
  return {
    loading: UpdateDealReducer.isLoading
  };
};
  const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateDealStatus, updateDealLoading,getMyTravelPlanList, myPlanStartLoading, getMyPackagesList, myPackageStartLoading  }, dispatch)
}
class ChangeStatusScene extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '', selectedIndex: null, selectedValue: '', data:[], showRatingBar: false, starCount:0 }
  }
  componentDidMount() {
    if (this.props.packageDetails.is_delivered !== undefined && this.props.packageDetails.is_delivered !== null) {
      var value= this.props.packageDetails.is_delivered ===0?'':
      this.props.packageDetails.is_delivered ===1?'Picked up':
      this.props.packageDetails.is_delivered ===2?'on the way':
          this.props.packageDetails.is_delivered ===3?'Delivered Successfully':
          this.props.packageDetails.is_delivered ===4?'Successfully Received':
          this.props.packageDetails.is_delivered ===5? 'Not Successfully Received':''
      this.setState({selectedValue: value});
    }
    if (this.props.via === 1 ) {
      var data = [
        {
          value: 'Successfully Received'
        },
        {
          value: 'Not Successfully Received'
        }
      ]
      this.setState({data: data})
    } else {
      var data = [
        {
          value: 'Picked up'
        },
        {
          value: 'on the way'
        },
        {
          value: 'Delivered Successfully'
        }
      ]
      this.setState({data: data})
    }
  }
  componentWillUnmount() {
    if (this.props.via === 1) {
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
    else {
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

  }
  getDate(date) {
    var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
    var date = new Date(date);
    var monthIndex = date.getMonth();
    return date.getDate()+" "+monthNames[monthIndex]+" "+ date.getFullYear()
  }
  onSubmitClick() {
    if (this.state.selectedIndex === null) {
        alert("Please select status");
    } else {
      this.props.updateDealLoading();
      this.props.updateDealStatus(this.state.selectedIndex, this.props.packageDetails._id, this.props.travellerDetails._id, this.state.text, this.state.starCount, this.props.dealId );
    }
  }
  onStatusChange(data,index) {
    var newStatus = 0;
    if (data === 'Picked up') {
      newStatus = 1;
      this.setState({ showRatingBar: false },()=>console.log(this.state.showRatingBar))
    } else if (data === 'on the way') {
      newStatus = 2;
      this.setState({ showRatingBar: false },()=>console.log(this.state.showRatingBar))
    } else if (data === 'Delivered Successfully') {
      newStatus = 3;
      this.setState({ showRatingBar: false },()=>console.log(this.state.showRatingBar))
    } else if (data === 'Successfully Received') {
      newStatus = 4;
      this.setState({ showRatingBar: true },()=>console.log(this.state.showRatingBar))
    } else if (data === 'Not Successfully Received') {
      newStatus = 5;
      this.setState({ showRatingBar: true },()=>console.log(this.state.showRatingBar))
    }
    this.setState({ selectedIndex: newStatus},() => console.log(this.state.selectedIndex))
  }
  render() {
    return (
      <Container>
        <Spinner
        size='large'
        color='#3f51b5' animating={this.props.loading}
        style={{ position:'absolute', alignItems: 'center', alignSelf: 'center' }}
      />
        <Content style={{ flex: 1 }}>
          <Text style={{ margin: 10 }}>Traveller's Details</Text>
          <Card style={{flex:.4,borderRadius:10,marginBottom:7,backgroundColor:"white",borderWidth:1.5,borderColor:'#CCD1D1'}}>
            <View style={{flex:.50,flexDirection:'row'}}>

                <View style={{flex:.3,justifyContent:'center',alignItems:'center',marginTop:10}}>
                  <Spinner
                    color='#262626'
                    animating={true}
                    style={{alignSelf: "center", alignItems: "center",position: 'absolute', }} />
                  {
                    (this.props.travellerDetails.image!==undefined && this.props.travellerDetails.image !== '' && !this.props.travellerDetails.image.includes('http') )?
                    <Thumbnail
                      onLoadEnd={() => this.setState({isImageLoading:false})}
                      onLoadStart={()=> this.setState({isImageLoading:true})}
                      onLoad={() => this.setState({isImageLoading:false})}
                      large
                      source={{uri: "http://52.34.207.5:4106/"+this.props.travellerDetails.image }} />
                    :
                      (this.props.travellerDetails.image!==undefined && this.props.travellerDetails.image !== '' && this.props.travellerDetails.image.includes('http') )?
                      <Thumbnail
                        onLoadEnd={() => this.setState({isImageLoading:false})}
                        onLoadStart={()=> this.setState({isImageLoading:true})}
                        onLoad={() => this.setState({isImageLoading:false})}
                        large
                        source={{uri:this.props.travellerDetails.image }} />
                      :
                    <Thumbnail
                      onLoadEnd={() => this.setState({isImageLoading:false})}
                      onLoadStart={()=> this.setState({isImageLoading:true})}
                      onLoad={() => this.setState({isImageLoading:false})}
                      large
                      source={{uri: 'https://dummyimage.com/200x200/6e75e0/9bcccc.png&text=No+Image'}} />
                  }
                </View>

                <View style={{flex:.5,justifyContent:'center'}}>
                    <View style={{flex:.33,justifyContent:'center'}}>
                        <Text style={{color:'black',fontWeight:'bold',fontSize:20}}>{this.props.travellerDetails.traveller_name}</Text>
                        <View style={{flexDirection:'row'}}>
                          <Icon name="call" style={{margin:5}}></Icon>
                          {
                            (this.props.travellerDetails.phone_no === '')?
                            <Text>Not available</Text>
                            :
                            <Text>{this.props.travellerDetails.phone_no}</Text>
                          }

                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <Icon name="email" style={{margin:5}}></Icon>
                          {
                            (this.props.travellerDetails.email === '')?
                            <Text>Not available</Text>
                            :
                            <Text>{this.props.travellerDetails.email}</Text>
                          }

                        </View>

                  </View>

            </View>

            </View>
            <View style={{flex:.50,flexDirection:'row',marg:10}}>
              <View style={{flex:.1,alignItems:'center'}}>
                <Icon name="date-range" size={25} color='grey' style={{backgroundColor:'transparent'}} />
              </View>
              <Text style={{marginLeft:10,flex:.4}}>{this.getDate(this.props.travellerDetails.startDate)}</Text>
              <Text style={{marginLeft:10,flex:.1}}>to</Text>
             <View style={{flex:.1,alignItems:'center'}}>
               <Icon name="date-range" size={25} color='grey' style={{backgroundColor:'transparent'}} />
             </View>
             <Text style={{marginLeft:10,flex:.4}}>{this.getDate(this.props.travellerDetails.endDate)}</Text>
           </View>
            <View style={{flex:.50,flexDirection:'row',marginTop:5}}>
                <View style={{flex:.1,flexDirection:'column'}}>
                    <View style={{flex:.2,alignItems:'center'}}>
                        <Icon name="adjust" size={25} color='green' style={{backgroundColor:'transparent'}} />
                    </View>
                    <View style={{flex:.5,alignItems:'center',justifyContent:'space-around'}}>
                        <Icon name="lens" size={10} color='#DADADA' style={{backgroundColor:'transparent'}} />
                        <Icon name="lens" size={10} color='#DCDCDC' style={{backgroundColor:'transparent'}} />
                        <Icon name="lens" size={10} color='grey' style={{backgroundColor:'transparent'}} />
                    </View>
                    <View style={{flex:.4,alignItems:'center'}}>
                        <Icon name="location-on" size={25} color='red' style={{backgroundColor:'transparent'}} />
                    </View>
                </View>
                <View style={{flex:.7}}>
                    <Text style={{fontWeight:'bold',fontSize:14.5}}>{this.props.travellerDetails.source}</Text>
                    <Text style={{fontWeight:'bold',fontSize:14.5,marginTop:40}}>{this.props.travellerDetails.destination}</Text>
                </View>

            </View>
         </Card>
         <Text style={{ margin: 10 }}>Package Details</Text>
          <Card style={{flex:.4,borderRadius:10,backgroundColor:"white",borderWidth:1.5,borderColor:'#CCD1D1'}}>
            <View  style={{flex:.50,flexDirection:'row'}}>
                <View style={{flex:.3,justifyContent:'center',alignItems:'center', marginTop:10}}>
                  <Spinner
                    color='#262626'
                    animating={true}
                    style={{alignSelf: "center", alignItems: "center",position: 'absolute', }} />
                  {
                    (this.props.packageDetails.image !== '' && !this.props.packageDetails.image.includes('http') )?
                    <Thumbnail
                      onLoadEnd={() => this.setState({isImageLoading:false})}
                      onLoadStart={()=> this.setState({isImageLoading:true})}
                      onLoad={() => this.setState({isImageLoading:false})}
                      large
                      source={{uri: 'http://52.34.207.5:4106/images/upload/'+this.props.packageDetails.image}} />
                    :
                    <Thumbnail
                      onLoadEnd={() => this.setState({isImageLoading:false})}
                      onLoadStart={()=> this.setState({isImageLoading:true})}
                      onLoad={() => this.setState({isImageLoading:false})}
                      large
                      source={{uri: 'https://dummyimage.com/200x200/6e75e0/9bcccc.png&text=No+Image'}} />
                  }

                </View>
              <View style={{flex:.5,justifyContent:'center'}}>
                  <View style={{flex:.33,justifyContent:'center'}}>
                    <Text style={{color:'black',fontWeight:'bold',fontSize:20}}>{this.props.packageDetails.package_name}</Text>
                  </View>
                  <View style={{flex:.33,justifyContent:'center',flexDirection:'row'}}>
                    <View style={{flex:.15,justifyContent:'center'}}>
                       <Icon name="straighten" size={25} color='grey' style={{backgroundColor:'transparent'}} />
                    </View>
                    <View style={{flex:.8,justifyContent:'center'}}>
                       <Text style={{fontSize:16}}>{this.props.packageDetails.length}X{this.props.packageDetails.width}X{this.props.packageDetails.height}(m)</Text>
                    </View>
             </View>
                 <View style={{flex:.33,justifyContent:'center',flexDirection:'row'}}>
                   <View style={{flex:.15,justifyContent:'center'}}>
                     <Icon name="scanner" size={25} color='grey' style={{backgroundColor:'transparent'}} />
                   </View>
                   <View style={{flex:.8,justifyContent:'center'}}>
                     <Text style={{fontSize:16}}>{this.props.packageDetails.weight}kg</Text>
                  </View>
                </View>
              </View>
              <View style={{flex:.2,justifyContent:'center'}}>
                <Text style={{fontSize:30,color:'red'}}>${this.props.packageDetails.budget}</Text>
              </View>
          </View>
          <View style={{marginTop: 10}}>
            <View style={{flexDirection:'row'}}>
              <Icon name="account-circle" style={{margin:5}}></Icon>
              {
                (this.props.packageDetails.user_name === '')?
                <Text>Not available</Text>
                :
                <Text style={{fontWeight:'bold'}}>{this.props.packageDetails.user_name}</Text>
              }

            </View>
            <View style={{flexDirection:'row'}}>
              <Icon name="call" style={{margin:5}}></Icon>
              {
                (this.props.packageDetails.phone_no === '')?
                <Text>Not available</Text>
                :
                <Text>{this.props.packageDetails.phone_no}</Text>
              }

            </View>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="email" style={{margin:5}}></Icon>
              {
                (this.props.packageDetails.email === '')?
                <Text>Not available</Text>
                :
                <Text>{this.props.packageDetails.email}</Text>
              }

            </View>
          </View>
          <View style={{flex:.50,flexDirection:'row'}}>
              <View style={{flex:.1,flexDirection:'column'}}>
                  <View style={{flex:.2,alignItems:'center'}}>
                      <Icon name="adjust" size={25} color='green' style={{backgroundColor:'transparent'}} />
                  </View>
                  <View style={{flex:.5,alignItems:'center',justifyContent:'space-around'}}>
                     <Icon name="lens" size={10} color='#DADADA' style={{backgroundColor:'transparent'}} />
                     <Icon name="lens" size={10} color='#DCDCDC' style={{backgroundColor:'transparent'}} />
                     <Icon name="lens" size={10} color='grey' style={{backgroundColor:'transparent'}} />
                  </View>
                  <View style={{flex:.4,alignItems:'center'}}>
                      <Icon name="location-on" size={25} color='red' style={{backgroundColor:'transparent'}} />
                  </View>
              </View>
              <View style={{flex:.7}}>
                  <Text style={{fontWeight:'bold',fontSize:14.5}}>{this.props.packageDetails.source}</Text>
                  <Text style={{fontWeight:'bold',fontSize:14.5,marginTop:40}}>{this.props.packageDetails.destination}</Text>
              </View>

          </View>
          </Card>
          <Card style={{ flex: .5, flexDirection: 'column', padding: 5, margin: 5, backgroundColor: 'white' }} >
            {
              (this.props.packageDetails.last_comment !==undefined && this.props.packageDetails.last_comment !==null && this.props.packageDetails.last_comment !=='')?
              <Text>Last comment from Buyer :{this.props.packageDetails.last_comment}</Text>
              :
              (this.props.travellerDetails.last_comment !==undefined && this.props.travellerDetails.last_comment !==null && this.props.travellerDetails.last_comment !=='')?
              <Text> Last comment from Traveller :{this.props.travellerDetails.last_comment}</Text>
              :
              null
            }

            <View style={{ marginTop: 30, flex: 0.3, flexDirection: 'row', paddingBottom: 10, alignItems: "center", alignSelf: "center" }}>
              <Dropdown
                ref="drop"
                containerStyle={{ width: 1.7 * window.width / 2 }}
                label="Change Tracking Status"
                data={this.state.data}
                value={this.state.selectedValue}
                onChangeText={(data,index)=> this.onStatusChange(data, index)}
              />
            </View>

            <View style={{ flex: .7, flexDirection: 'column', paddingHorizontal: 20 }}>
              <TextInput
                style={{ height: 70, borderColor: 'gray', borderWidth: 1, fontSize: 18,padding:20,borderRadius:10 }}
                onChangeText={(text) => this.setState({ text: text })}
                value={this.state.text}
                placeholder='comment box'
                multiline={true}
              />
            {
              (this.state.showRatingBar)?
              <View style={{flex:0.20,margin:5,flexDirection:'row'}}>
                <StarRating
                  disabled={false}
                  starSize={20}
                  maxStars={5}
                  starColor="#ffa500"
                  rating={this.state.starCount}
                  selectedStar={(rating) => this.setState({starCount:rating})}
                  halfStarEnabled={true}
                />
            </View>
            :
            null
            }


              <Button onPress={() => this.onSubmitClick()} block dark style={{ marginTop: 90 }}><Text style={{ color: 'white', size: 30 }}>Submit </Text></Button>
            </View>
          </Card>
        </Content>
      </Container>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps )(ChangeStatusScene);
