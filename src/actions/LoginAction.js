import { Actions } from 'react-native-router-flux';
export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_FAIL = 'login_fail';
export const LOADING_STARTED = 'loading_started';
export const LOGOUT = "logout";

import { LOGIN,LOGIN_FB } from '../constant/index';
/* eslint no-undef: "error"*/
/* eslint-env browser*/
export const login = (email, password, loginType) => {
  return function (dispatch) {
    var data = {
         "email":email,
         "password":password,
         "loginType":loginType
       }
    var request = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    };
    console.log('Request', LOGIN, JSON.stringify(data));
    fetch(LOGIN, request)
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
            type: LOGIN_SUCCESS,
            payload: responseJson,
          });
        }

      })
      .catch((error) => {
        console.log(error);
        alert(error);
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };
};
export const loginFB = (first_name,last_name,email,facebook_id,image, gender) => {
  return function (dispatch) {
    var data = {
        "first_name":first_name,
        "last_name":last_name,
        "email":email,
        "facebook_id":facebook_id,
        "loginType":"2",
        "image":image,
        "gender": gender,
       }
    var request = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    };
    console.log('FBRequest',LOGIN_FB,JSON.stringify(data));
    fetch(LOGIN_FB, request)
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
            type: LOGIN_SUCCESS,
            payload: responseJson,
          });
        }

      })
      .catch((error) => {
        console.log(error);
        alert(error);
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };
};
export const loadingStarted = () => {
  return {
    type: LOADING_STARTED,
  };
};
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
