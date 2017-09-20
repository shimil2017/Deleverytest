import React, { Component } from 'react'
import { Button,FormInput } from 'react-native-elements';
var ImagePicker = require('react-native-image-picker');
import {ScrollView,View,TouchableOpacity,Text,Image,StyleSheet,PixelRatio, ActivityIndicator, AsyncStorage} from 'react-native'
import { addPackage, loadingStarted } from '../actions/AddPackageActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
var options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

const mapStateToProps = ({ AddPackageReducer }) => {
  return {
    addPackageResponse: AddPackageReducer.addPackageResponse,
    loading: AddPackageReducer.isLoading,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addPackage, loadingStarted }, dispatch)

}
class ParcelDetailScreen extends Component{
    constructor(props){
        super(props)
        this.state={
          description: '',
          length: '',
          weight:'',
          dimension:'',
          quantity:'',
          price:'',
          avatarSource:null,
          base64:''
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
             console.log("base64--",base64Strng.uri);
             this.setState({ base64:base64Strng.uri })

            this.setState({
              avatarSource: source
            });
          }
        });
      }
      submit(){
        if(this.state.description==='')
          alert("Please enter description")
        else if(this.state.length==='')
          alert("Please enter length")
        else if(this.state.weight==='')
          alert("Please enter weight")
        else if(this.state.dimension==='')
          alert("Please enter dimension")
        else if(this.state.quantity==='')
          alert("Please enter quantity")
        else if(this.state.price==='')
          alert("Please enter price")
        else
        {
          this.props.loadingStarted();
          try {
            const value = AsyncStorage.getItem('user_id',(err, result) => {

                const requestJSON = {
                    image: this.state.base64,
                    package_name:"",
                    weight:this.state.weight,
                    source:this.props.startAddress,
                    destination:this.props.endAddress,
                    startDate:"2016-05-18T16:00:00Z",
                    endDate:"2016-05-18T16:00:00Z",
                    user_id: result,
                    budget:340,
                    description:"HP4,blue color",
                    quantity:this.state.quantity,
                    picked_up:"true",
                    delivered_to_traveller:"false",
                    source_lat:this.props.originLatitude,
                    source_long:this.props.originLongitude,
                    destination_lat:this.props.destinationLatitude,
                    destination_long:this.props.destinationLongitude,
                    pick_lat:89.758779,
                    pick_long:67.4574,
                    height:this.state.height,
                    width:this.state.width,
                    length:"22"
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
    render(){
        return(
          <ScrollView style={{backgroundColor:'lightgrey',padding:20}}>
              <View style={{alignItems:'center'}}>
                <Text style={{fontWeight:'bold'}}>Upload Image:</Text>
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} style={[styles.avatar, {alignItems:'center'}]}>
                    <View style={[styles.avatar, styles.avatarContainer, {alignItems:'center',backgroundColor:'grey'}]}>
                    { this.state.avatarSource === null ? <Text style={{backgroundColor:'transparent'}}>Select a Photo</Text> :
                        <Image style={styles.avatar} source={this.state.avatarSource} />
                    }
                    </View>
                </TouchableOpacity>
                </View>
                <Text style={{fontWeight:'bold'}}>Parcel Information:</Text>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <View style={{marginTop:20,flex:0.5}}>
                          <View style={{flex:0.5,paddingLeft:20}}>
                            <Text>Length(m):</Text>
                          </View>
                          <View style={{flex:0.5}}>
                            <FormInput
                            onChangeText={(text) => this.setState({length:text})}
                            placeholder='Length'
                            placeholderTextColor='#d9d9d9'
                            style={{color:'black',width:window.width-50}}
                            containerStyle={{borderColor:'grey',backgroundColor:'#F5FCFF'}}
                            keyboardType='numeric'
                            />
                          </View>
                        </View>
                        <View style={{marginTop:20,flex:0.5}}>
                          <View style={{flex:0.5,paddingLeft:20}}>
                            <Text>Height(m):</Text>
                          </View>
                          <View style={{flex:0.5}}>
                            <FormInput
                            onChangeText={(text) => this.setState({dimension:text})}
                            placeholder='Height'
                            placeholderTextColor='#d9d9d9'
                            style={{color:'black',width:window.width-40}}
                            containerStyle={{borderColor:'grey',backgroundColor:'#F5FCFF'}}
                            keyboardType='numeric'
                            />
                          </View>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={{marginTop:20,flex:0.5}}>
                          <View style={{flex:0.5,paddingLeft:20}}>
                            <Text>Weight(kg):</Text>
                          </View>
                          <View style={{flex:0.5}}>
                            <FormInput
                            onChangeText={(text) => this.setState({weight:text})}
                            placeholder='Weight'
                            placeholderTextColor='#d9d9d9'
                            style={{color:'black',width:window.width-40}}
                            containerStyle={{borderColor:'grey',backgroundColor:'#F5FCFF'}}
                            keyboardType='numeric'
                            />
                          </View>
                        </View>
                        <View style={{marginTop:20,flex:0.5}}>
                          <View style={{flex:0.5,paddingLeft:20}}>
                            <Text>Quantity:</Text>
                          </View>
                          <View style={{flex:0.5}}>
                            <FormInput
                            onChangeText={(text) => this.setState({quantity:text})}
                            placeholder='Quantity'
                            placeholderTextColor='#d9d9d9'
                            style={{color:'black',width:window.width-40}}
                            containerStyle={{borderColor:'grey',backgroundColor:'#F5FCFF'}}
                            keyboardType='numeric'
                            />
                          </View>
                        </View>
                    </View> 
                    <View style={styles.row}>
                        <View style={{marginTop:20,flex:1}}>
                          <View style={{flex:0.5,paddingLeft:20}}>
                            <Text>Price($):</Text>
                          </View>
                          <View style={{flex:0.5}}>
                            <FormInput
                            onChangeText={(text) => this.setState({price:text})}
                            placeholder='Price'
                            placeholderTextColor='#d9d9d9'
                            style={{color:'black',width:window.width-40}}
                            containerStyle={{borderColor:'grey',backgroundColor:'#F5FCFF'}}
                            keyboardType='numeric'
                            />
                          </View>
                        </View>  
                    </View>
                </View>
                <View style={{marginTop:20}}>
                    <Text style={{fontWeight:'bold'}}>Add description of parcel:</Text>
                    <View style={{marginTop:20}}>
                        <FormInput
                            onChangeText={(text) => this.setState({description:text})}
                            placeholder='Description'
                            placeholderTextColor='#d9d9d9'
                            style={{color:'black',width:window.width-40,height:60}}
                            containerStyle={{borderColor:'grey',backgroundColor:'#F5FCFF'}}
                            multiline={true}
                        />
                    </View>
                </View>
                <View style={{justifyContent:'center',marginTop:20}}>
                    <Button
                    raised
                    buttonStyle={{backgroundColor: '#e62e00', borderRadius:5}}
                    textStyle={{textAlign: 'center',fontWeight:'500'}}
                    title={`Submit`}
                    onPress={()=>this.submit()}
                    />
                </View>
              </ScrollView>
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
