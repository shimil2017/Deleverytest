import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Content, Thumbnail, Item, Input } from 'native-base';
import { Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
export default class AddPackage extends Component {
  handlePress() {
		alert('Package Added');
	}
	render() {
		let data = [{
			value: 'CM',
		}, {
			value: 'INCH',
		}, {
			value: 'M',
		}];
		return (
			<Container>
				<Content>
					<View style={{flex:1}}>
						<Image
							style={{width: WINDOW_WIDTH *1, height: WINDOW_HEIGHT *1}}
							source={{uri: 'https://iphonehdwallpapers.net/wp-content/cache/310095065c3a6f535fd696f7648534bc_w324_h576_sc.jpg'}}>
							<View style={{flex:.25}}>
								<Thumbnail large
									style={{ alignItems:'center',alignSelf:'center'}}
									source={{ uri: 'https://i.pinimg.com/736x/d8/cd/96/d8cd965dc305ea0642bf78db9dcea2a3--flower-girl-crown-flower-girls.jpg' }} >
								</Thumbnail>
							</View>
							<View style={{flex:.6,paddingHorizontal:'10%'}}>
								<View style={{flex:.6,justifyContent:'center'}}>

									<Item>
                  	<Icon active name='straighten'size={20} color='white' style={{ backgroundColor: 'transparent' }} />
										<Input placeholder='Package Title' placeholderTextColor='white' textColor='white'style={{color:'white'}} />
									</Item>
								</View>
								<View style={{flex:.6,flexDirection:'row'}}>
									<View style={{flex:.7,paddingHorizontal:'2%'}}>
										<Item>
                                   			<Icon active name='straighten'size={20} color='white' style={{ backgroundColor: 'transparent' }} />
											<Input placeholder='Length' placeholderTextColor='white' keyboardType='numeric' style={{color:'white'}}/>
										</Item>
									</View>
									<View style={{flex:.3,borderBottomColor:'white'}}>
						                 	<Dropdown
											label='CM'
											data={data}
											baseColor='white'
											textColor='red'
											labelHeight={19}
										/>
									</View>
								</View>
								<View style={{flex:.6,flexDirection:'row'}}>
									<View style={{flex:.7,paddingHorizontal:'2%'}}>
										<Item>

											<Icon active name='more-vert'size={20} color='white' style={{ backgroundColor: 'transparent' }} />
											<Input placeholder='Height' placeholderTextColor='white' keyboardType='numeric'style={{color:'white'}}/>
										</Item>
									</View>
									<View style={{flex:.3}}>
                                	<Dropdown
											label='CM'
											data={data}
											baseColor='white'
											textColor='red'
											labelHeight={19}
										/>
									</View>
								</View>
								<View style={{flex:.6,flexDirection:'row'}}>
									<View style={{flex:.7,paddingHorizontal:'2%'}}>
										<Item>

											<Icon active name='straighten'size={20} color='white' style={{ backgroundColor: 'transparent' }} />
											<Input placeholder='Width' placeholderTextColor='white' keyboardType='numeric' style={{color:'white'}}/>
										</Item>
									</View>
									<View style={{flex:.3}}>

										<Dropdown
											label='CM'
											data={data}
											baseColor='white'
											textColor='red'
											labelHeight={19}
										/>
									</View>
								</View>
								<View style={{flex:.6,flexDirection:'row'}}>
									<View style={{flex:.7,paddingHorizontal:'2%'}}>
										<Item>

											<Icon active name='markunread-mailbox'size={20} color='white' style={{ backgroundColor: 'transparent' }} />
											<Input placeholder='Weight' placeholderTextColor='white' keyboardType='numeric'style={{color:'white'}}/>
										</Item>
									</View>
									<View style={{flex:.3}}>
                                	<Dropdown
											label='KG'
											data={data}
											baseColor='white'
											textColor='red'
											labelHeight={19}
										/>
									</View>
								</View>
								<View style={{flex:.6}}>
									<Item>

										<Icon active name='attach-money'size={20} color='white' style={{ backgroundColor: 'transparent' }} />
										<Input placeholder='Price Detail' placeholderTextColor='white' keyboardType='numeric'style={{color:'white'}}/>
									</Item>
								</View>
								<View style={{flex:.6}}>
									<Item>
										<Item>
											<Input placeholder='Discription Of Package..' placeholderTextColor='white'style={{color:'white'}}/>
										</Item>
									</Item>
								</View>
							</View>
							<View style={{ flex: .2, marginHorizontal: '9%',paddingTop:'2%',flexDirection:'column',justifyContent:'center' }}>
								<Button rounded small
									onPress={()=>this.handlePress()}
									title='ADD PACKAGE'
									color='#6643d8'
									backgroundColor="white"
								/>
							</View>
						</Image>
					</View>
				</Content>
			</Container>
		);
	}
}
