import React, { Component } from 'react'
import { View,Text,TextInput,ScrollView,TouchableOpacity,AsyncStorage, Image,Picker, ActivityIndicator, FlatList } from 'react-native';
import { Button,FormInput } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { List, ListItem, Card, Spinner, Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTravelerList } from '../../actions/TravelerActions';
import { getMyPackagesList, myPackageStartLoading } from '../../actions/MyPackagesListActions';
import { Actions } from 'react-native-router-flux';
const mapStateToProps = ({ TravelersListReducer, MyPackagesListReducer, LoginReducer, SignUpReducer }) => {

  return {
    travelersListResponse: TravelersListReducer.travelersListResponse,
    loading: MyPackagesListReducer.isLoading,
    packagesListResponse: MyPackagesListReducer.packagesListResponse,
    isRegistered: SignUpReducer.isRegistered,
    loggedIn: LoginReducer.loggedIn,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getTravelerList, getMyPackagesList, myPackageStartLoading }, dispatch);

};
class MyPackagesList extends Component{
  constructor(props) {
    super(props);
    this.state={
      data: [
        {value: 'Travelers'}, { value: 'Packages' }],
        selected: 'Travelers'
    };
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
  componentWillReceiveProps(nextProps){
    if ((nextProps.isRegistered !== this.props.isRegistered && nextProps.isRegistered ===true)
        ||(nextProps.loggedIn !== this.props.loggedIn && nextProps.loggedIn ===true)
  ) {
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

  }
  onRowClick(item){
    if (item.deals.length > 0) {
      Actions.MyPackagesRequest({ data: item.deals });
    }else {
      alert('No Requests received on your package till now.')
    }
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
     if (this.props.packagesListResponse.data !== undefined && (this.props.packagesListResponse.data === null || this.props.packagesListResponse.data.length ===0)) {
     return(
       <TouchableOpacity style={{alignSelf:'center',alignItems:'center',marginTop:40}} onPress={() => Actions.PostPackageScreen()}>
         <Text>
           Please add your Package.
         </Text>
       </TouchableOpacity>
     )
     }
    return(
      <View style={{flex:1,}}>
        <FlatList
          keyExtractor={this._keyExtractor}
          data={this.props.packagesListResponse.data}
          renderItem={({item}) =>
          <TouchableOpacity onPress={()=> alert('under development')}>
            <Card style={{flex:.4,borderRadius:10,backgroundColor:"white",borderWidth:1.5,borderColor:'#CCD1D1'}}>
              <View  style={{flex:.50,flexDirection:'row'}}>
                  <View style={{flex:.3,justifyContent:'center',alignItems:'center', marginTop:10}}>
                    <Spinner
                      color='#262626'
                      animating={true}
                      style={{alignSelf: "center", alignItems: "center",position: 'absolute', }} />
                    {
                      (item.image !== '')?
                      <Thumbnail
                        onLoadEnd={() => this.setState({isImageLoading:false})}
                        onLoadStart={()=> this.setState({isImageLoading:true})}
                        onLoad={() => this.setState({isImageLoading:false})}
                        large
                        source={{uri: 'http://52.39.212.226:4106/images/upload/'+item.image}} />
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
                      <Text style={{color:'black',fontWeight:'bold',fontSize:20}}>{item.package_name}</Text>
                    </View>
                    <View style={{flex:.33,justifyContent:'center',flexDirection:'row'}}>
                      <View style={{flex:.15,justifyContent:'center'}}>
                         <Icon name="straighten" size={25} color='grey' style={{backgroundColor:'transparent'}} />
                      </View>
                      <View style={{flex:.8,justifyContent:'center'}}>
                         <Text style={{fontSize:16}}>{item.length}X{item.width}X{item.height}(m)</Text>
                      </View>
               </View>
                   <View style={{flex:.33,justifyContent:'center',flexDirection:'row'}}>
                     <View style={{flex:.15,justifyContent:'center'}}>
                       <Icon name="scanner" size={25} color='grey' style={{backgroundColor:'transparent'}} />
                     </View>
                     <View style={{flex:.8,justifyContent:'center'}}>
                       <Text style={{fontSize:16}}>{item.weight}kg</Text>
                    </View>
                  </View>
                </View>
                <View style={{flex:.2,justifyContent:'center'}}>
                  <Text style={{fontSize:30,color:'red'}}>${item.budget}</Text>
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
                  {
                    (item.deals.length > 0)?
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
      </View>
    )
  }
}
export default connect(mapStateToProps,mapDispatchToProps )(MyPackagesList); ;
