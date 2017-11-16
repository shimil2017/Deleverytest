import React, { Component } from 'react';
import { AppRegistry,WebView,View } from 'react-native';
import App from './src/app';

export default class Test extends Component{
  render() {
    return (
      <View style={{flex:1}}>
      <WebView
        source={{uri: 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_ap-payment&paykey=AP-04929223LY332481Y'}}
        style={{flex:1}}
         onMessage={(event)=> console.log("sdajsdajdhjgd"+event.nativeEvent.data)}
         onNavigationStateChange={(navEvent)=> console.log('navEvent.jsEvaluationValue',navEvent)}

      />
    </View>
    );
  }
}

AppRegistry.registerComponent('PackageDeliveryApp', () => App);
