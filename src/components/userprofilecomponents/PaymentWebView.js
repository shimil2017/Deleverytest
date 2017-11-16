import React, { Component } from 'react';
import { WebView, View, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { savePaymentStatus } from '../../actions/TravelDealActions';
const mapStateToProps = ({ TravelDealReducer }) => {
  return {
    savePaymentResp: TravelDealReducer.savePaymentResp,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ savePaymentStatus }, dispatch);
};
class PaymentWebView extends Component{
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
    };
  }
  onPayment(navEvent) {
    console.log("WebView Events",navEvent, this.props.deal_id);
    if (navEvent !== undefined && navEvent !==null) {
      //success case
      if (navEvent.url !== undefined && navEvent.url !== null && navEvent.url === 'http://172.24.5.36:4106/success') {
        alert("Succes");
        this.setState({ isLoading: true });
        const request={
          "deal_id": this.props.deal_id
        }
        this.props.savePaymentStatus(JSON.stringify(request));
      }
    }
  }
  render() {
    return (

      <View style={{ flex: 1 }}>
        <ActivityIndicator animating={this.state.isLoading} />
        <WebView
          onLoadStart={()=> this.setState({isLoading: true})}
          onLoadEnd={()=> this.setState({isLoading: false})}
          source={{ uri: this.props.url}}
          style={{ flex: 1 }}
          onNavigationStateChange={(navEvent)=> this.onPayment(navEvent)}
        />
    </View>
    );
  }
}
export default connect(mapStateToProps,mapDispatchToProps )(PaymentWebView);
