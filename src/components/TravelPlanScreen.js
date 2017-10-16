/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { Button, Input, Item, Label, Container, Form, Content,  } from 'native-base';
import { Actions } from 'react-native-router-flux';
export default class TravelPlanScreen extends Component{
  constructor(props){
    super(props)
    this.state={
      selectedStartDate: null,
      selectedEndDate: null,
      budget: null
    };
    this.onDateChange = this.onDateChange.bind(this);
  //  this.onDayPress = this.onDayPress.bind(this);
  }
  onDateChange(date, type) {
    if (type === 'END_DATE') {
      this.setState({
        selectedEndDate: date,
      },() => {
              this.onSetDay(this.state.selected);
          });
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      },() => {
              this.onSetDay();
          });
    }
  }
  onSetDay(){
    console.log("selected dates ",this.state.selectedStartDate,"--",this.state.selectedEndDate);
  }
  onContinueClick(){
    if (this.state.selectedStartDate === null ) {
      alert("Please select a start date of travel plan.");
    }else if (this.state.selectedEndDate === null ) {
      alert("Please select an end date to travel plan.");
    }
    // else if (this.state.budget === null ) {
    //   alert("Please add budget.");
    // }
    else {
      Actions.PostPackageScreen({
         isTravelPlan: true,
         startDate: this.state.selectedStartDate,
         endDate: this.state.selectedEndDate,
         budget: this.state.budget
       });
    }
  }
  render(){
    var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
    const minDate = new Date();
    const { selectedStartDate, selectedEndDate } = this.state;
    console.log(minDate.getDate());
    const startDate  =  selectedStartDate ? selectedStartDate.getDate()+" "+monthNames[selectedStartDate.getMonth()]+" "+ selectedStartDate.getFullYear() : '';
    const endDate = selectedEndDate ? selectedEndDate.getDate()+" "+monthNames[selectedEndDate.getMonth()]+" "+ selectedEndDate.getFullYear() : '';

    var nextDate = new Date(selectedStartDate);
    var nextWeek = selectedStartDate?new Date(nextDate.getTime() + 7 * 24 * 60 * 60 * 1000):new Date(minDate.getTime() + 30 * 24 * 60 * 60 * 1000);

    return(
      <View style={{ flex: 1,flexDirection:'column' }}>
        <CalendarPicker

            selectedDayColor='#6945D1'
            selectedDayTextColor='white'
            maxDate={nextWeek}
            minDate={minDate}
            onDateChange={this.onDateChange}
            style={styles.calendar}
            allowRangeSelection={true}
        />

      <View style={{flex:.5,flexDirection:'column'}}>
          <Form >

            <Text style={{ fontSize: 15, color: 'red', marginTop: 10 }}>*Select dates in between you can travel(1 week interval)</Text>
            <Text style={{ fontSize: 15, marginTop: 10 }}>SELECTED START DATE: { startDate }</Text>
            <Text style={{ fontSize: 15, marginTop: 10 }}>SELECTED END DATE: { endDate }</Text>
          <Button
            rounded
            onPress={()=> this.onContinueClick()}
            style={{ width:300, marginTop: 10, justifyContent: 'center', alignItems:"center", alignSelf:"center"}}
            primary>
            <Text>Continue</Text>
          </Button>
          </Form>
        </View>

    </View>

    );
  }
}


const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350,
    flex: .5
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    flex: 1,
    backgroundColor: 'gray'
  }
});
