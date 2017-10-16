import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View, TouchableOpacity, ScrollView, Image, Dimensions, styles
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Header, Content, Thumbnail, Form, Item, Label, Input, Card, CardItem, Right, Left, Body, Center } from 'native-base';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import Actions from 'react-native-router-flux';
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
export default class Test extends Component {
	constructor(props) {
		super();
		this.state = {
			Dimensions: '45cm x 25cm',
			Weight: '2.3Kg',
			Text: 'this is simple Dummy text.it can be change by the use Demand.thankyou and enhoy thbe services by PackageDeleivery App.',
			Location: '123 6th st. Malbourne,fl 32904',
			Destination: '4 goldFeild Rd. Honolulu,HI 96815',
			Price: '$57'
		};
	}
	render() {
		return (

			<Container style={{ flex: 1, paddingTop: '5%',paddingHorizontal:'3%',backgroundColor:'white'}}>
        <Content>
          <Card style={{ flex: .5, borderRadius: 10,padding:'3%' }}>
  					<View style={{ flex: .33, flexDirection: 'row' }}>
  						<View style={{ flex: .3, alignItems: 'center', justifyContent: 'center' }}>
  							<Thumbnail
  								source=
  									{{ uri: 'https://i.pinimg.com/736x/d8/cd/96/d8cd965dc305ea0642bf78db9dcea2a3--flower-girl-crown-flower-girls.jpg' }} />
  						</View>
  						<View style={{ flex: .5}}>
  							<View style={{ flex: .33, flexDirection: 'row' }}>
  								<Text style={{ color: 'black', fontSize: WINDOW_HEIGHT * 0.025 }}>Box Package</Text>
  							</View>
  							<View style={{ flex: .33, flexDirection: 'row' }}>
  								<Icon name="straighten" size={20} color='grey' style={{ backgroundColor: 'transparent' }} />
  								<Text style={{ color: 'grey', fontSize: WINDOW_HEIGHT * 0.022 }}> {this.state.Dimensions}</Text>
  							</View>
  							<View style={{ flex: .33, flexDirection: 'row' }}>
  								<Icon name="scanner" size={21} color='grey' style={{ backgroundColor: 'transparent', marginBottom: '2%' }} />
  								<Text style={{ fontSize: WINDOW_HEIGHT * 0.022, color: 'grey' }}> {this.state.Weight}</Text>
  							</View>
  						</View>
  						<View style={{ flex: .2, justifyContent: 'center' }}>
  							<Text style={{ fontSize: 23, color: 'red' }}> {this.state.Price}</Text>
  						</View>
  					</View>
  					<View style={{ flex: .32,padding:10,flexDirection:'row'}}>
  						<Text style={{ fontSize: WINDOW_HEIGHT * 0.022, color: 'grey' }}> {this.state.Text}</Text>
  					</View>
  					<View style={{ flex: .35, flexDirection: 'row' }}>
  						<View style={{ flex: .1, alignItems: 'center' }}>
  							<Icon name="adjust" size={20} color='green' style={{ backgroundColor: 'transparent' }} />
  							<Icon name="lens" size={8} color='grey' style={{ backgroundColor: 'transparent' }} />
  							<Icon name="lens" size={8} color='grey' style={{ backgroundColor: 'transparent' }} />
  							<Icon name="lens" size={8} color='grey' style={{ backgroundColor: 'transparent' }} />
  							<Icon name="location-on" size={20} color='red' style={{ backgroundColor: 'transparent' }} />
  						</View>
  						<View style={{ flex: .9 }}>
  							<View style={{ flex: .5 }}>
  								<Text style={{ fontSize: WINDOW_HEIGHT * 0.022, color: 'black' }}> {this.state.Location}</Text>
  							</View>
  							<View style={{ flex: .5, justifyContent: 'center',paddingTop:10  }}>
  								<Text style={{ fontSize: WINDOW_HEIGHT * 0.022, color: 'black'}}> {this.state.Destination}</Text>
  							</View>
  						</View>
  					</View>
  				</Card>
  				<View style={{ flex: .2, justifyContent: 'center', paddingVertical: '3%' }}>
  					<Button rounded
  						title='Accept Offer'
  						backgroundColor='#6643d8'
  					/>
  				</View>
  				<View style={{ flex: .2 }}>
  					<Card style={{ borderRadius: 10 }}>
  						<View style={{ flex: .15, paddingLeft: '5%' }}>
  							<Text style={{ fontSize: WINDOW_HEIGHT * 0.022, color: 'black', fontWeight: 'bold', marginTop: '4%' }}>Post an Offer</Text>
  						</View>
  						<View style={{ flex: .8, justifyContent: 'center', paddingHorizontal: 10,paddingBottom:10 }}>
  							<Form >
  								<Item floatingLabel style={{borderBottomWidth:1,borderBottomColor:'black'}} >
  									<Label style={{ color: 'black' }}>Price..</Label>
                      <Input
                        onChangeText={(text) => alert(text)}
                      />
  								</Item>
  							</Form>
  						</View>
  					</Card>
  				</View>
  				<View style={{ flex: .2, marginVertical: '3%' }}>
  					<Button rounded
  						title='Send Offer'
  						backgroundColor="#2F3F4A"
  					/>
  				</View>
        </Content>

			</Container>


		);
	}
}
