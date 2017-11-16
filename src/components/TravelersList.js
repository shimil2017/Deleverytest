import React, { Component } from 'react'
import { View, Text, TextInput, FlatList, ScrollView, RefreshControl, TouchableOpacity,AsyncStorage, Image, KeyboardAvoidingView, ActivityIndicator, ImageBackground, Dimensions, StyleSheet } from 'react-native';
import { Button, FormInput } from 'react-native-elements';
import { List, ListItem, Card, Spinner, Thumbnail  } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTravelerList, getTravelerListExplore } from '../actions/TravelerActions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
const mapStateToProps = ({ TravelersListReducer }) => {

  return {
    travelersListResponse: TravelersListReducer.travelersListResponse,
    loading: TravelersListReducer.isLoading,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getTravelerList, getTravelerListExplore }, dispatch);

};
class TravelersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          name: 'Amy Farha',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          subtitle: 'Vice President',
          price:20,
          source:"Del",
          destination:"chandigarh",
        },
        {
          name: 'Chris Jackson',
          avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          subtitle: 'Vice Chairman',
          price:20,
          source:"Del",
          destination:"chandigarh",
        },

],
    };
    try {
      const value = AsyncStorage.getItem('user_id',(err, result) => {
        if (result !== undefined && result !== null && result !== '') {
          this.props.getTravelerListExplore(result);
        }

        });
    } catch (error) {
      // Error retrieving data
      console.log("Error getting Token",error);
    }
    //this.props.getTravelerList();
  }
 _keyExtractor = (item, index) => item._id;
  render() {
    if (this.props.loading) {
      return(
        <ActivityIndicator
          size='large'
          color='#3f51b5' animating={this.props.loading}
          style={{ position:'absolute', alignItems: 'center', alignSelf: 'center' }}
        />
      )
    }
    if (this.props.travelersListResponse.data === undefined || this.props.travelersListResponse.data === null || this.props.travelersListResponse.data.length ===0) {
      return(
        <Text> There is no Traveler arround right now!</Text>
      )
    }
    return (

          <FlatList
            keyExtractor={this._keyExtractor}
            data={this.props.travelersListResponse.data}
            renderItem={({item}) =>
            <TouchableOpacity onPress={()=> Actions.TravelDealScreen({
              item: item,package_id:this.props.package_id, traveller_plan_id: item._id,
              is_req_to_traveller:true,is_req_to_package:false, via: 1,
              budget: this.props.budget
            })}>
             <Card style={{flex:.4,borderRadius:10,marginBottom:7,backgroundColor:"white",borderWidth:1.5,borderColor:'#CCD1D1'}}>
               <View style={{flex:.50,flexDirection:'row'}} >

                   <View style={{flex:.3,justifyContent:'center',alignItems:'center'}}>
                     <Spinner
                       color='#262626'
                       animating={true}
                       style={{alignSelf: "center", alignItems: "center",position: 'absolute', }} />
                     {
                       (item.image !== '' )?
                       <Thumbnail
                         onLoadEnd={() => this.setState({isImageLoading:false})}
                         onLoadStart={()=> this.setState({isImageLoading:true})}
                         onLoad={() => this.setState({isImageLoading:false})}
                         large
                         source={{uri: item.image }} />
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
                           <Text style={{color:'black',fontWeight:'bold',fontSize:20}}>{item.traveller_name}</Text>
                       </View>

                   </View>
                   <View style={{flex:.2,justifyContent:'center'}}>
                     {
                       item.budget?
                       <Text style={{fontSize:30,color:'red'}}>${item.budget}</Text>
                       :
                       null
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
                       <Text style={{fontWeight:'bold',fontSize:14.5}}>{item.source}</Text>
                       <Text style={{fontWeight:'bold',fontSize:14.5,marginTop:40}}>{item.destination}</Text>
                   </View>
                   <View style={{flex:.2}}>
                     <TouchableOpacity>
                     <Icon name="keyboard-arrow-right" size={40} color='#6945D1' style={{backgroundColor:'transparent'}} />
                    </TouchableOpacity>
                 </View>
               </View>
            </Card>
          </TouchableOpacity>
          }/>
  );
  }
}
export default connect(mapStateToProps,mapDispatchToProps )(TravelersList); ;
