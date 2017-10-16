import React, { Component } from 'react'
import { View,Text,TextInput,ScrollView,TouchableOpacity,RefreshControl,AsyncStorage,Image,Picker, ActivityIndicator, FlatList } from 'react-native';
import { Button,FormInput } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { List, ListItem, Card ,Thumbnail, Tab, Tabs, Spinner  } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTravelerList, pullToRefreshTravelerList, getTravelerListExplore } from '../actions/TravelerActions';
import { getPackagesList, pullToRefreshPackagesList, getPackagesListExplore } from '../actions/PackagesListActions';
import { Actions } from 'react-native-router-flux';
import StarRating from 'react-native-star-rating';
import { getMyPackagesList } from '../actions/MyPackagesListActions';
import { getMyTravelPlanList } from '../actions/MyTravelPlansListActions';
const mapStateToProps = ({
  TravelersListReducer,
  PackagesListReducer,
  MyPackagesListReducer,
  LoginReducer,
  SignUpReducer,
  MyTravelPlanListReducer
}) => {

  return {
    travelersListResponse: TravelersListReducer.travelersListResponse,
    loading: TravelersListReducer.isLoading,
    packagesListResponse: PackagesListReducer.packagesListResponse,
    pullToRefreshTravelers: TravelersListReducer.pullToRefreshTravelers,
    pullToRefreshPackages: PackagesListReducer.pullToRefreshPackages,
    loggedIn: LoginReducer.loggedIn,
    isRegistered: SignUpReducer.isRegistered,
    myTravelersListResponse: MyTravelPlanListReducer.travelersListResponse,
    myPackagesListResponse: MyPackagesListReducer.packagesListResponse,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
     getTravelerList,
     getPackagesList,
     pullToRefreshTravelerList,
     pullToRefreshPackagesList,
     getMyPackagesList,
     getMyTravelPlanList,
     getTravelerListExplore,
     getPackagesListExplore
   }, dispatch);

};
class Events extends Component{
  constructor(props) {
    super(props);
    this.state={
      refreshing: false,
      isImageLoading: true,
      data: [
        {value: 'Travelers'}, { value: 'Packages' }],
        selected: 'Travelers',
        travelPlans:[
      ],
      packages:[],
      selectedPackage: '',
      selectedTravelPlan:'',
      selectedPackageIndex:null,
      selectedTravelPlanIndex: null,
    };

    try {
      const value = AsyncStorage.getItem('user_id',(err, result) => {
        if (result !== undefined && result !== null && result !== '') {
          console.log("LOGIN");
          this.props.getMyPackagesList(result);
          this.props.getMyTravelPlanList(result);
          this.props.getTravelerListExplore(result);
          this.props.getPackagesListExplore(result);
        }
        else {
          console.log("LOGIOUT");
          this.props.getTravelerList();
          this.props.getPackagesList();
        }
        });
    } catch (error) {
      // Error retrieving data
      console.log("Error getting Token",error);
    }

    if (this.props.myTravelersListResponse !== null && this.props.myTravelersListResponse.data !== undefined) {
      console.log("HOoooooooooooo");
      var list = this.state.travelPlans;
      this.props.myTravelersListResponse.data.map((data, index) =>{
        console.log("Iiiiiiiii",data.source);

        list.push({value:data.source+' to '+data.destination});
      });
      console.log("Up[dated=====]", list);
        this.setState({travelPlans: list},()=>console.log("Updated"));
    }
    if (this.props.myPackagesListResponse !== null && this.props.myPackagesListResponse.data !== undefined) {
      for (var i = 0; i < this.props.myPackagesListResponse.data.length; i++) {
        var list = this.state.packages;
        list.push({value:this.props.myPackagesListResponse.data[i].package_name});
        this.setState({packages: list},() => console.log("Updated"));
      }
    }
  }
    componentWillReceiveProps(nextProps) {
      if (nextProps.loggedIn !== this.props.loggedIn || nextProps.isRegistered !== this.props.isRegistered) {
        try {
          const value = AsyncStorage.getItem('user_id',(err, result) => {
            if (result !== undefined && result !== null && result !== '') {

              this.props.getTravelerListExplore(result);
              this.props.getPackagesListExplore(result);
            }else {
              this.setState({travelPlans:[],packages:[]},() => console.log("Claered"));
              this.props.getTravelerList();
              this.props.getPackagesList();
            }
            });
        } catch (error) {
          // Error retrieving data
          console.log("Error getting Token",error);
        }
      }
      console.log("=================Xxxxxxxx");
      if (nextProps.myPackagesListResponse !== this.props.myPackagesListResponse) {
            console.log("Changed=================Xxxxxxxx", );
            if (nextProps.myPackagesListResponse.data !== undefined && nextProps.myPackagesListResponse.data !== null) {
              for (var i = 0; i < nextProps.myPackagesListResponse.data.length; i++) {
                console.log(i);
                var list = this.state.packages;
                list.push({value:nextProps.myPackagesListResponse.data[i].package_name});
                this.setState({packages: list},() => console.log("Updated"));
              }
            }
      }
      if (nextProps.myTravelersListResponse !== this.props.myTravelersListResponse) {

        if (nextProps.myTravelersListResponse.data !== undefined && nextProps.myTravelersListResponse.data !== null) {
            nextProps.myTravelersListResponse.data.map((data, index) =>{
              console.log("Changed===========LLLLL", );
              var list = this.state.travelPlans;
              list.push({value: data.source+' to '+data.destination});
              this.setState({travelPlans: list},()=>console.log("Updated"));
            });
          }

      }
    }
  _onRefresh() {
    //this.setState({refreshing: true});
      this.props.pullToRefreshTravelerList();
    try {
      const value = AsyncStorage.getItem('user_id',(err, result) => {
        if (result !== undefined && result !== null && result !== '') {

          this.props.getTravelerListExplore(result);

        }
        else {
          this.props.getTravelerList();

        }
        });
    } catch (error) {
      // Error retrieving data
      console.log("Error getting Token",error);
    }
  }
  _onRefreshPackages() {
    //this.setState({refreshing: true});
    this.props.pullToRefreshPackagesList();
    try {
      const value = AsyncStorage.getItem('user_id',(err, result) => {
        if (result !== undefined && result !== null && result !== '') {

          this.props.getPackagesListExplore(result);

        }
        else {
            this.props.getPackagesList();

        }
        });
    } catch (error) {
      // Error retrieving data
      console.log("Error getting Token",error);
    }
  }
  _keyExtractor = (item, index) => item._id;
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
  onPressTravelerList(item){
    if (this.state.selectedPackageIndex === null) {
      alert("Please choose your package from dropdown to proceed.");
    }else {
      Actions.TravelDealScreen({
        item: item,package_id:this.props.myPackagesListResponse.data[this.state.selectedPackageIndex]._id, traveller_plan_id: item._id
      })
    }
  }
  onPressPackagesList(item){
    if (this.state.travelPlans === null) {
      alert("Please choose your TravelPlan from dropdown to proceed.");
    }else {
      Actions.TravelDealScreen({
        item: item,package_id:item._id, traveller_plan_id: this.props.myTravelersListResponse.data[this.state.selectedTravelPlanIndex]._id
      })
    }
  }
   render() {
     const selectText = 'Chose your Package';
     const dataArray = this.state.packages;

     if (this.props.loading) {
       return(
         <ActivityIndicator
           size='large'
           color='#3f51b5' animating={this.props.loading}
           style={{ position:'absolute', alignItems: 'center', alignSelf: 'center' }}
         />
       )
     }
    return(
      <Tabs  tabBarUnderlineStyle={{ backgroundColor:'white'}}>
        <Tab
          tabStyle={{backgroundColor:'#6945D1'}}
          activeTextStyle={{color: 'white'}}
          textStyle={{color: 'white',}}
          heading="Travelers"
          activeTabStyle={{borderRightWidth: 1, borderColor: '#6945D1', backgroundColor:'#6945D1'}}>
        <View style={{flex:1}}>
          <View>
            {
              ((this.state.packages === null || this.state.packages.length === 0) )?
              <Text style={{margin:10}}>Please add a travel plan to send request to below Packages</Text>
              :
              <Dropdown
                style={{margin:5}}
                selectedItemColor="red"
                onChangeText={(data,index)=> this.setState({selectedPackage:data,selectedPackageIndex:index},() => console.log(this.state.selectedPackageIndex))}
                label={selectText}
                data={dataArray}
             />
            }

          </View>
          {
            ((this.props.travelersListResponse.data!==undefined)&&( this.props.travelersListResponse.data === null || this.props.travelersListResponse.data.length ===0))?
              <Text> There is no traveler around.</Text>
              :
              <FlatList
                refreshControl={
              <RefreshControl
                refreshing={this.props.pullToRefreshTravelers}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
                keyExtractor={this._keyExtractor}
                data={this.props.travelersListResponse.data}
                renderItem={({item}) =>
                <TouchableOpacity onPress={()=> this.onPressTravelerList(item)}>
                 <Card style={{flex:.4,borderRadius:10,marginBottom:7,backgroundColor:"white",borderWidth:1.5,borderColor:'#CCD1D1'}}>
                   <View style={{flex:.50,flexDirection:'row'}}>

                       <View style={{flex:.3,justifyContent:'center',alignItems:'center', marginTop:10}}>
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
                         <Text style={{fontSize:30,color:'red'}}>${item.budget}</Text>
                       </View>
                   </View>
                   <View style={{flex:.50,flexDirection:'row',marginTop:10}}>
                     <View style={{flex:.2,alignItems:'center'}}>
                       <Icon name="date-range" size={25} color='grey' style={{backgroundColor:'transparent'}} />
                     </View>
                     <Text style={{marginLeft:10}}>{this.getDate(item.startDate)}</Text>
                    <View style={{flex:.2,alignItems:'center'}}>
                      <Icon name="date-range" size={25} color='grey' style={{backgroundColor:'transparent'}} />
                    </View>
                    <Text style={{marginLeft:10}}>{this.getDate(item.endDate)}</Text>
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
          }

        </View>


    </Tab>
    <Tab
      activeTextStyle={{color: 'white'}}
      tabStyle={{backgroundColor:'#6945D1'}}
      textStyle={{color: 'white'}}
      heading="Packages"
      activeTabStyle={{borderRightWidth: 1, backgroundColor:'#6945D1',borderColor: '#ddd'}}>
      <View style={{flex:1}}>
        {
          (this.state.travelPlans === null || this.state.travelPlans.length === 0)?
          <Text style={{margin:10}}>Please add a package to send offer.</Text>
          :
          <Dropdown
            style={{margin:5}}
            selectedItemColor="red"
            onChangeText={(data,index)=> this.setState({selectedTravelPlan:data,selectedTravelPlanIndex: index})}
            label='Choose your travel plan'
            data={this.state.travelPlans}
         />
        }
        {
          ((this.props.packagesListResponse.data!==undefined)&&(this.props.packagesListResponse.data === null || this.props.packagesListResponse.data.length === 0))?
            <Text> There is no package avaiable</Text>
            :
            <FlatList
              refreshControl={
            <RefreshControl
              refreshing={this.props.pullToRefreshPackages}
              onRefresh={this._onRefreshPackages.bind(this)}
            />
          }
              keyExtractor={this._keyExtractor}
              data={this.props.packagesListResponse.data}
              renderItem={({item}) =>
              <TouchableOpacity onPress={()=> this.onPressPackagesList(item)}>
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
                       <TouchableOpacity>
                      <Icon name="keyboard-arrow-right" size={40} color='#6945D1' style={{backgroundColor:'transparent'}} />
                      </TouchableOpacity>
                  </View>
                </View>
              </Card>
              </TouchableOpacity>

            }/>
        }

      </View>

    </Tab>
  </Tabs>
    )
  }
}
export default connect(mapStateToProps,mapDispatchToProps )(Events); ;
