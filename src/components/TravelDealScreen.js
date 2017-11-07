import React, { Component } from 'react'
import { View, Text, TextInput, ScrollView, TouchableOpacity, AsyncStorage, Image, KeyboardAvoidingVie, Dimensions, ActivityIndicator, ImageBackground } from 'react-native';
import { FormInput, SocialIcon } from 'react-native-elements';
import { Card, Button, Container, Spinner, Thumbnail, Form, Item, Input, Label, Content } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StarRating from 'react-native-star-rating';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { postTravelDealStatus, loadingAddDealStarted } from '../actions/TravelDealActions';
const window = Dimensions.get('window');
const mapStateToProps = ({ TravelDealReducer }) => {

  return {
    addDealResponse: TravelDealReducer.addDealResponse,
    loading: TravelDealReducer.isLoading,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ postTravelDealStatus, loadingAddDealStarted }, dispatch);

};

class TravelDealScreen extends Component {
  constructor(props){
    super(props);
    console.log("PACKAGE ID ",this.props.package_id,"TRAVEL PLAN ID",this.props.traveller_plan_id);
    console.log("TNAME",this.props.item.traveller_name,"PNAME",this.props.item.package_name);
  }
  onClickDeal(status,budget){
   try {
     this.props.loadingAddDealStarted();
     const value = AsyncStorage.getItem('user_id',(err, result) => {

         const requestJSON = {
           'status':status,
           "budget" : budget,
           "traveller_plan_id" : this.props.traveller_plan_id,
           "package_id" : this.props.package_id,
           "user_id" : result,
           "is_req_to_traveller":this.props.is_req_to_traveller,
           "is_req_to_package":this.props.is_req_to_package,
         }
         console.log("DEALS REQUEST--",JSON.stringify(requestJSON));
         this.props.postTravelDealStatus(JSON.stringify(requestJSON));
       });
   } catch (error) {
     // Error retrieving data
     console.log("Error getting Token",error);
   }
  }
  getDate(date){
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
    render(){
      const name = (this.props.item.traveller_name === undefined) ?  this.props.item.package_name: this.props.item.traveller_name ;
      return (
        <Container>
        <Content style={{flex:1}}>
          <Card style={{flex:.4,borderRadius:10,marginBottom:7,backgroundColor:"white",borderWidth:1.5,borderColor:'#CCD1D1'}}>
            <View style={{flex:.50,flexDirection:'row'}}>

                <View style={{flex:.3,justifyContent:'center',alignItems:'center', marginTop:10}}>
                  <Spinner
                    color='#262626'
                    animating={true}
                    style={{alignSelf: "center", alignItems: "center",position: 'absolute', }} />
                  {
                    (this.props.item.image !== '' )?
                    <Thumbnail
                      onLoadEnd={() => this.setState({isImageLoading:false})}
                      onLoadStart={()=> this.setState({isImageLoading:true})}
                      onLoad={() => this.setState({isImageLoading:false})}
                      large
                      source={{uri: this.props.item.image }} />
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
                        <Text style={{color:'black',fontWeight:'bold',fontSize:20}}>{this.props.item.traveller_name}</Text>
                          <View style={{flex:0.20,margin:5,flexDirection:'row'}}>
                            <StarRating
                              disabled={true}
                              starSize={20}
                              maxStars={5}
                              rating={5}
                              starColor="#ffa500"
                            />
                        </View>
                    </View>

                </View>
                <View style={{flex:.2,justifyContent:'center'}}>
                  <Text style={{fontSize:30,color:'red'}}>${this.props.item.budget}</Text>
                </View>
            </View>
            <View style={{flex:.50,flexDirection:'row',marginTop:10}}>
              <View style={{flex:.2,alignItems:'center'}}>
                <Icon name="date-range" size={25} color='grey' style={{backgroundColor:'transparent'}} />
              </View>
              <Text style={{marginLeft:10}}>{this.getDate(this.props.item.startDate)}</Text>
             <View style={{flex:.2,alignItems:'center'}}>
               <Icon name="date-range" size={25} color='grey' style={{backgroundColor:'transparent'}} />
             </View>
             <Text style={{marginLeft:10}}>{this.getDate(this.props.item.endDate)}</Text>
           </View>
            <View style={{flex:.50,flexDirection:'row',marginTop:10}}>
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
                    <Text style={{fontWeight:'bold',fontSize:14.5,width:window.width-10}}>{this.props.item.source}</Text>
                    <Text style={{fontWeight:'bold',fontSize:14.5,marginTop:20,width:window.width-10}}>{this.props.item.destination}</Text>
                </View>

            </View>
         </Card>
         <Card style={{flex:.5,flexDirection:'column',padding:5,margin:5,backgroundColor:'white'}} >
            <View style={{marginTop:30,flex:0.3,flexDirection:'row',paddingBottom:10,alignItems:"center",alignSelf:"center"}}>
            <Button onPress={()=> this.onClickDeal(1,this.props.item.budget)} block primary style={{flex:.5,margin:5}}>
              {
                  (this.props.via ===1 )?
                  <Text style={{color:'white'}}>Send Offer</Text>
                  :
                  <Text style={{color:'white'}}>Accept Offer</Text>
                }


              </Button>
            <Button onPress={()=> this.onClickDeal(2,this.props.item.budget)} block danger style={{flex:.5,margin:5}}><Text style={{color:'white'}}> Decline Offer </Text></Button>
            </View>
            {
              (this.props.via === 2)?
             <View style={{flex:.7,flexDirection:'column'}}>
               <Text style={{marginLeft:10,color:'green',fontSize:18,fontWeight:"bold"}}>Post new offer($)</Text>
               <FormInput
               onChangeText={(text) => this.setState({price:text})}
               placeholder='Price'
               placeholderTextColor='#d9d9d9'
               style={{color:'black',height:50}}
               containerStyle={{borderColor:'black',backgroundColor:'#F5FCFF'}}
               keyboardType='numeric'
               />
             <Button onPress={()=> this.onClickDeal(3,this.state.price)} block dark style={{marginTop:20}}><Text style={{color:'white'}}> Send Updated Offer </Text></Button>
             </View>
             :
             null
            }

          </Card>
          <Spinner color='#3f51b5' animating={this.props.loading}
            style={{ alignSelf:'center',position:'absolute', marginTop: window.height/2-100, left: window.width/2-35 }}
          />
      </Content>
</Container>
      );
    }
}

export default connect(mapStateToProps,mapDispatchToProps )(TravelDealScreen);
