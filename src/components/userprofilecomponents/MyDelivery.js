import React, { Component } from 'react'
import { View, Text, TextInput, FlatList, ScrollView, AsyncStorage, RefreshControl, TouchableOpacity, Image, KeyboardAvoidingView, ActivityIndicator, ImageBackground, Dimensions, StyleSheet } from 'react-native';
import { Button, FormInput } from 'react-native-elements';
import { List, ListItem, Card, Spinner, Thumbnail  } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getMyDeliveryList, myDeliveryStartLoading, pullToRefreshDeliveryList } from '../../actions/MyDeliveryActions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
const mapStateToProps = ({ MyDeliveryReducer, LoginReducer, SignUpReducer  }) => {

  return {
    deliveryListResponse: MyDeliveryReducer.deliveryListResponse,
    loading: MyDeliveryReducer.isLoading,
    isRegistered: SignUpReducer.isRegistered,
    loggedIn: LoginReducer.loggedIn,
    pullToRefreshDelivery: MyDeliveryReducer.pullToRefreshDelivery
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getMyDeliveryList,  myDeliveryStartLoading, pullToRefreshDeliveryList }, dispatch);

};
class MyDelivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }
  componentDidMount(){
    try {
      const value = AsyncStorage.getItem('user_id',(err, result) => {
        this.props.myDeliveryStartLoading();
        this.props.getMyDeliveryList(result);
        });
    } catch (error) {
      // Error retrieving data
      console.log("Error getting Token",error);
    }
  }
  componentWillReceiveProps(nextProps){
    if ((nextProps.isRegistered !== this.props.isRegistered && nextProps.isRegistered ===true)
        ||(nextProps.loggedIn !== this.props.loggedIn && nextProps.loggedIn ===true)
  ) {
      try {
        const value = AsyncStorage.getItem('user_id',(err, result) => {
          console.log("Loading for Traveld");
          this.props.myDeliveryStartLoading();
          this.props.getMyDeliveryList(result);
          });
      } catch (error) {
        // Error retrieving data
        console.log("Error getting Token",error);
      }
    }
  }
  _onRefresh() {
    //this.setState({refreshing: true});
    this.props.pullToRefreshDeliveryList();
    try {
      const value = AsyncStorage.getItem('user_id',(err, result) => {
        this.props.getMyDeliveryList(result);
        });
    } catch (error) {
      // Error retrieving data
      console.log("Error getting Token",error);
    }
  }
  onRowClick(item){

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
 _keyExtractor = (item, index) => item._id;
  render() {
    console.log("NEW DATA", this.props.deliveryListResponse)
    if (this.props.loading) {
      return(
        <ActivityIndicator
          size='large'
          color='#3f51b5' animating={this.props.loading}
          style={{ position:'absolute', alignItems: 'center', alignSelf: 'center' }}
        />
      )
    }
if (this.props.deliveryListResponse.data !== undefined && (this.props.deliveryListResponse.data === null || this.props.deliveryListResponse.data.length === 0)) {
  return(
  <Text>No successful delivery</Text>
  )
}
    else{
      return (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.props.pullToRefreshDelivery}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
            keyExtractor={this._keyExtractor}
            data={this.props.deliveryListResponse}
            renderItem={({item}) =>
            <TouchableOpacity onPress={()=> this.onRowClick(item)}>
             <Card style={{flex:.4,borderRadius:10,marginBottom:7,backgroundColor:"white",borderWidth:1.5,borderColor:'#CCD1D1'}}>
               <View style={{flex:.50,flexDirection:'row'}}>

                   <View style={{flex:.3,justifyContent:'center',alignItems:'center',marginTop:10}}>
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

               </View>
               <View style={{flex:.50,flexDirection:'row',marginTop:10}}>
                 <View style={{flex:.1,alignItems:'center'}}>
                   <Icon name="date-range" size={25} color='grey' style={{backgroundColor:'transparent'}} />
                 </View>
                 <Text style={{marginLeft:10,flex:.4}}>{this.getDate(item.startDate)}</Text>
                 <Text style={{marginLeft:10,flex:.1}}>to</Text>
                <View style={{flex:.1,alignItems:'center'}}>
                  <Icon name="date-range" size={25} color='grey' style={{backgroundColor:'transparent'}} />
                </View>
                <Text style={{marginLeft:10,flex:.4}}>{this.getDate(item.endDate)}</Text>
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
                       <Text style={{fontWeight:'bold',fontSize:14.5}}>{item.source}</Text>
                       <Text style={{fontWeight:'bold',fontSize:14.5,marginTop:40}}>{item.destination}</Text>
                   </View>

               </View>
            </Card>
          </TouchableOpacity>
          }/>
    );
    }

  }
}
export default connect(mapStateToProps,mapDispatchToProps )( MyDelivery);
