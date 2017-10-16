import * as React from "react";
import { Actions } from 'react-native-router-flux';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input-fullpage";
import { Modal, AppRegistry, StyleSheet, Text, View, PanResponder, TouchableOpacity, Image, Button, ScrollView } from 'react-native';
// const s = StyleSheet.create({
//     container: {
//         backgroundColor: "white ",
//         marginTop: 60,
//     },
//     label: {
//         color: "black",
//         fontSize: 12,
//     },
//     input: {
//         fontSize: 16,
//         color: "black",
//     },
// });
const USE_LITE_CREDIT_CARD_INPUT = false;
class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            authToken: null,
            Card_no: '',
            exp_Month: '',
            exp_Year: '',
            ccv: '',
            pay_btn: 'false'
        };
        this._onChange = this._onChange.bind(this);
        this.onclick = this.onclick.bind(this);
    }
    _onChange(formData) {
        /* eslint no-console: 0 */
        console.log("dkdik", formData);
        let exp = formData.values.expiry
        let exp2 = formData.values.expiry
        let exp_Month = exp.slice(0, 2);
        let exp_Year = exp2.slice(3, 5);
        console.log("i need=======>>>>>>>", exp_Year);
        console.log("i need=======>>>>>>>month", exp_Month);

        this.setState({ Card_no: formData.values.number, exp_Month: exp_Month, exp_Year: exp_Year, ccv: formData.values.cvc });
        if (formData.status.expiry == 'valid' && formData.status.number == 'valid' && formData.status.cvc == 'valid') {
            this.setState({ pay_btn: 'false' })
        }

    };
    _onFocus = field => {
        /* eslint no-console: 0 */
        console.log(field);
    };
    pay() {
        var cardDetails = {
            "card[number]": this.state.Card_no,
            "card[exp_month]": this.state.exp_Month,
            "card[exp_year]": this.state.exp_Year,
            "card[cvc]": this.state.ccv,
        };
        var formBody = [];
        for (var property in cardDetails) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(cardDetails[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch('https://api.stripe.com/v1/tokens', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + 'pk_test_izELAdzUe48OscJrrCKSDOzg'
            },
            body: formBody
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('here are tokens', responseJson)
                this.setState({authToken:responseJson})
            })
            .catch((error) => {
                console.error(error);
            });
          
    }
    onclick(){
        let cardDetails = {};
        console.log("thissss", this.state);
        cardDetails.Card_no = this.state.Card_no;
        cardDetails.exp_Month = this.state.exp_Month;
        cardDetails.exp_Year = this.state.exp_Year;
        cardDetails.ccv = this.state.ccv;
        Actions.AddCard({cardDetails: cardDetails});
    }
    render() {
        return (
            <View >
                {USE_LITE_CREDIT_CARD_INPUT ?
                    (<LiteCreditCardInput
                        autoFocus
                        inputStyle={s.input}
                        validColor={"black"}
                        invalidColor={"red"}
                        placeholderColor={"darkgray"}
                        onFocus={this._onFocus.bind(this)}
                        onChange={this._onChange} />) :
                    (<CreditCardInput
                        autoFocus
                        requiresName
                        requiresCVC
                        requiresPostalCode

                        validColor={"black"}
                        invalidColor={"red"}
                        placeholderColor={"darkgray"}
                        onFocus={this._onFocus.bind(this)}
                        onChange={this._onChange} />)
                }
                
                <Button
                onPress={this.onclick}
                    title="Add Card"

                />
                <ScrollView>
                    {this.state.authToken ? <Text>{JSON.stringify(this.state.authToken)}</Text> : null}
                </ScrollView>
            </View>
        );
    }
}
export default Payment;
