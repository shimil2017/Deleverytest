import { SIGN_UP } from '../constant/index';
import { Actions } from 'react-native-router-flux';
export const SIGN_UP_SUCCESS = 'signup_success';
export const SIGN_UP_FAIL = ' signup_fail';
export const LOADING_STARTED = 'loading_sign_up';
/* eslint no-undef: "error"*/
/* eslint-env browser*/
export const signUp = (email, password, gender, firstName, lastName, phoneNo, image) => {
  return function (dispatch) {
    var data = {
        "first_name":firstName,
         "last_name":lastName,
         "email":email,
         "password":password,
         "gender":gender,
         "phone_no":phoneNo,
         "image": image,
       }
    var request = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    };
    console.log('Request',SIGN_UP,JSON.stringify(data));
    fetch(SIGN_UP, request)
      .then(function (response) {
        console.log(response);
        if (response.status !== 200) {
          throw new Error(response.json());
        }
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.messageId != 200) {
          throw new Error(responseJson.message);
        }else {
          dispatch({
            type: SIGN_UP_SUCCESS,
            payload: responseJson,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        dispatch({
          type: SIGN_UP_FAIL,
        });
      });
  };
};

export const loadingStarted = () => {
  return {
    type: LOADING_STARTED,

  };
};
