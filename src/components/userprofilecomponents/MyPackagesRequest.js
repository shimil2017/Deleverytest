import React, { Component } from 'react'
import { View, Text, TextInput, ScrollView, TouchableOpacity, AsyncStorage, Image, Picker, ActivityIndicator, FlatList } from 'react-native';
import { Button,FormInput } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { List, ListItem, Card, Spinner, Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

export default class MyPackagesRequest extends Component {
  constructor(props) {
    super(props);

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
    return (
        <FlatList
          keyExtractor={this._keyExtractor}
          data={this.props.data}
          renderItem={({item}) =>
          <TouchableOpacity onPress={()=>alert("under development")}>
           <Card style={{flex:.4,borderRadius:10,marginBottom:7,backgroundColor:"white",borderWidth:1.5,borderColor:'#CCD1D1'}}>
             <View style={{flex:.50,flexDirection:'row'}}>

                 <View style={{flex:.3,justifyContent:'center',alignItems:'center',marginTop:10}}>
                   <Spinner
                     color='#262626'
                     animating={true}
                     style={{alignSelf: "center", alignItems: "center",position: 'absolute', }} />
                   {
                     (item.travellerData.image !== '' )?
                     <Thumbnail
                       onLoadEnd={() => this.setState({isImageLoading:false})}
                       onLoadStart={()=> this.setState({isImageLoading:true})}
                       onLoad={() => this.setState({isImageLoading:false})}
                       large
                       source={{uri: item.travellerData.image }} />
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
                         <Text style={{color:'black',fontWeight:'bold',fontSize:20}}>{item.travellerData.traveller_name}</Text>
                     </View>

                 </View>

             </View>
             <View style={{flex:.50,flexDirection:'row',marginTop:10}}>
               <View style={{flex:.1,alignItems:'center'}}>
                 <Icon name="date-range" size={25} color='grey' style={{backgroundColor:'transparent'}} />
               </View>
               <Text style={{marginLeft:10,flex:.4}}>{this.getDate(item.travellerData.startDate)}</Text>
               <Text style={{marginLeft:10,flex:.1}}>to</Text>
              <View style={{flex:.1,alignItems:'center'}}>
                <Icon name="date-range" size={25} color='grey' style={{backgroundColor:'transparent'}} />
              </View>
              <Text style={{marginLeft:10,flex:.4}}>{this.getDate(item.travellerData.endDate)}</Text>
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
                     <Text style={{fontWeight:'bold',fontSize:14.5}}>{item.travellerData.source}</Text>
                     <Text style={{fontWeight:'bold',fontSize:14.5,marginTop:40}}>{item.travellerData.destination}</Text>
                 </View>
                 <View style={{flex:.2}}>
                   {
                     (item.deals.length >0)?
                     <View style={{flexDirection:'row'}}>
                       <Icon name="notifications" size={25} color='#6945D1' style={{backgroundColor:'transparent'}} />
                       <Text style={{fontSize:18,color:'red',}}>{item.deals.length}</Text>
                     </View>
                     :null
                   }
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
