import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Dimensions,
	Image,
	Platform,
	FlatList,ScrollView
} from 'react-native';
import {
	MKIconToggle,
} from 'react-native-material-kit';
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

export default class AddCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			addcard: {}
		};
	}

	// componentWillReceiveProps(nextProps) {
	//     alert()

	//     console.log("saurabh",nextProps.cardDetails);
	//     // this.setState({
	//     //   doctor: nextProps.data.name,
	//     //   address: nextProps.data.address
	//     // })
	// }

	componentWillMount(){
		if(this.props.cardDetails)
		{
			this.setState({addcard: this.props.cardDetails });
		}

	}


	render(){
		console.log(this.state.addcard);
		return(
			<View style={{flex:1}}>


					<Text>{this.state.addcard.Card_no}</Text>
					<Text>{this.state.addcard.exp_Month}</Text>
					<Text>{this.state.addcard.exp_Year}</Text>
					<Text>{this.state.addcard.ccv}</Text>
			
				<View style={{flex:.7}}>

				</View>
			</View>

		);
	}
}
