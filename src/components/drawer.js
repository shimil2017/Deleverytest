import React, { Component } from 'react'
import { View,Text,TextInput,ScrollView,TouchableOpacity,Image,StyleSheet } from 'react-native';
import { Button,FormInput } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Drawer extends Component{

    constructor(props){
      super(props)
      this.state={
        isBuyer: false,
        isTraveler: false,
        buyerIcon: 'expand-more',
        travelerIcon:'expand-more'
      }
  }
  expandBuyer(){
    if (this.state.isBuyer === true) {
      this.setState({isBuyer: false,isTraveler:false,buyerIcon:'expand-more',travelerIcon:'expand-more'})
    }else {
      this.setState({isBuyer: true,isTraveler:false,buyerIcon:'expand-less',travelerIcon:'expand-more'})
    }
  }
  expandTraveler(){
    if (this.state.isTraveler === true) {
      this.setState({isBuyer: false,isTraveler:false,travelerIcon:'expand-more',buyerIcon:'expand-more'})
    }else {
      this.setState({isBuyer: false,isTraveler:true,travelerIcon:'expand-less',buyerIcon:'expand-more'})
    }
  }
  render(){
    return(
      <View style={styles.container}>
          <View style={styles.element}>
            <View style={styles.icon}>
              <Icon name="call-to-action" size={25} color='#606060' style={{backgroundColor:'transparent'}} />
            </View>
            <View style={styles.textarea}>
            <TouchableOpacity onPress={()=>alert("profile")}>
              <Text style={styles.text}>My Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.element}>
            <View style={styles.icon}>
              <Icon name={this.state.buyerIcon} size={30} color='#606060' style={{backgroundColor:'transparent'}} />
            </View>
            <View style={styles.textarea}>
            <TouchableOpacity onPress={()=> this.expandBuyer()}>
              <Text style={styles.text}>Buyer</Text>
              </TouchableOpacity>
            </View>
          </View>
          {
            (this.state.isBuyer === true )?

              <View style={{flex:.11,flexDirection:'row',marginLeft:20}}>
                <View style={styles.icon}>
                  <Icon name="view-quilt" size={25} color='#606060' style={{backgroundColor:'transparent'}} />
                </View>
                <View style={styles.textarea}>
                <TouchableOpacity onPress={()=>alert("post")}>
                  <Text style={styles.text}>My Current Posts</Text>
                </TouchableOpacity>
                </View>
              </View>
              :
              <View></View>
          }
          {
            (this.state.isBuyer === true )?

            <View style={{flex:.11,flexDirection:'row',marginLeft:20}}>
              <View style={styles.icon}>
                <Icon name="history" size={25} color='#606060' style={{backgroundColor:'transparent'}} />
              </View>
              <View style={styles.textarea}>
              <TouchableOpacity onPress={()=>alert("pre")}>
                <Text style={styles.text}>Previous Posts</Text>
                </TouchableOpacity>
              </View>
            </View>
              :
              <View></View>
          }
          <View style={styles.element}>
            <View style={styles.icon}>
              <Icon name={this.state.travelerIcon} size={30} color='#606060' style={{backgroundColor:'transparent'}} />
            </View>
            <View style={styles.textarea}>
            <TouchableOpacity onPress={()=> this.expandTraveler()}>
              <Text style={styles.text}>Traveler</Text>
              </TouchableOpacity>
            </View>
          </View>
          {
            (this.state.isTraveler === true )?
              <View style={{flex:.11,flexDirection:'row',marginLeft:20}}>
                <View style={styles.icon}>
                  <Icon name="date-range" size={25} color='#606060' style={{backgroundColor:'transparent'}} />
                </View>
                <View style={styles.textarea}>
                <TouchableOpacity onPress={()=>alert("manage")}>
                  <Text style={styles.text}>Manage Availability</Text>
                  </TouchableOpacity>
                </View>
              </View>
          :
              <View></View>
         }
         {
           (this.state.isTraveler === true )?
             <View style={{flex:.11,flexDirection:'row',marginLeft:20}}>
               <View style={styles.icon}>
                 <Icon name="reply" size={25} color='#606060' style={{backgroundColor:'transparent'}} />
               </View>
               <View style={styles.textarea}>
               <TouchableOpacity onPress={()=>alert("deliver")}>
                 <Text style={styles.text}>Delivery Requests</Text>
                 </TouchableOpacity>
               </View>
             </View>
         :
             <View></View>
        }
        {
          (this.state.isTraveler === true )?
            <View style={{flex:.11,flexDirection:'row',marginLeft:20}}>
              <View style={styles.icon}>
                <Icon name="reply" size={25} color='#606060' style={{backgroundColor:'transparent'}} />
              </View>
              <View style={styles.textarea}>
              <TouchableOpacity onPress={()=>alert("deliver")}>
                <Text style={styles.text}>Successful Delivery</Text>
                </TouchableOpacity>
              </View>
            </View>
        :
            <View></View>
        }
          <View style={styles.element}>
            <View style={styles.icon}>
              <Icon name="notifications" size={25} color='#606060' style={{backgroundColor:'transparent'}} />
            </View>
            <View style={styles.textarea}>
            <TouchableOpacity onPress={()=>alert("notifs")}>
              <Text style={styles.text}>Notifications</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.element}>
            <View style={styles.icon}>
              <Icon name="help" size={25} color='#606060' style={{backgroundColor:'transparent'}} />
            </View>
            <View style={styles.textarea}>
            <TouchableOpacity onPress={()=>alert("help")}>
              <Text style={styles.text}>Help</Text>
              </TouchableOpacity>
            </View>
            </View>
            <View style={styles.element}>
              <View style={styles.icon}>
                <Icon name="file-upload" size={25} color='#606060' style={{backgroundColor:'transparent'}} />
              </View>
              <View style={styles.textarea}>
              <TouchableOpacity onPress={()=>alert("logout")}>
                <Text style={styles.text}>LogOut</Text>
                </TouchableOpacity>
              </View>
            </View>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  container :{
    flex:1
  },
  element :{
    flex:.1,
    flexDirection:'row'
  },
  icon :{
    flex:.2,
    justifyContent:'flex-end',
    alignItems:'center'
  },
  textarea :{
    flex:.8,
    justifyContent:'flex-end',
  },
  text :{
    fontSize:17,
    fontWeight:'bold',
    color:'#606060'
  }
})
