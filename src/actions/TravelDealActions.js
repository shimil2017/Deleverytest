import { Actions } from 'react-native-router-flux';
export const TRAVELE_DEAL_SUCCESS = 'TRAVELE_DEAL_success';
export const TRAVELE_DEAL_FAIL = 'TRAVELE_DEAL_fail';
export const PUT_DEAL_SUCCESS = 'PUT_DEAL_SUCCESS';
export const PUT_DEAL_FAIL = 'PUT_DEAL_FAIL';
export const SAVE_PAYMENT_SUCCESS = 'SAVE_PAYMENT_SUCCESS';
export const SAVE_PAYMENT_FAIL = 'SAVE_PAYMENT_FAIL';

export const LOADING_ADD_DEAL = 'LOADING_ADD_DEAL';
import { TRAVEL_DEAL_STATUS, SAVE_PAYMENTS } from '../constant/index';
/* eslint no-undef: "error"*/
/* eslint-env browser*/
export const postTravelDealStatus = (requstJSON) => {
  return function (dispatch) {
    var request = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: requstJSON,
    };
    console.log('Request',TRAVEL_DEAL_STATUS, request);
    fetch(TRAVEL_DEAL_STATUS, request)
      .then(function (response) {
        console.log(response);
        if (response.status !== 200) {
          throw new Error(response.json());
        }
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.status != 200) {
          throw new Error(responseJson.message);
        } else {
          dispatch({
            type: TRAVELE_DEAL_SUCCESS,
            payload: responseJson,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        dispatch({
          type: TRAVELE_DEAL_FAIL,
        });
      });
  };
};


export const putTravelDealStatus = (requstJSON, deal_id) => {
  return function (dispatch) {
    var request = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: requstJSON,
    };
    console.log('Request',TRAVEL_DEAL_STATUS+"/"+deal_id, request);
    fetch(TRAVEL_DEAL_STATUS+"/"+deal_id, request)
      .then(function (response) {
        console.log(response);
        if (response.status !== 200) {
          throw new Error(response.json());
        }
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.status != 200) {
          throw new Error(responseJson.message);
        } else {
          dispatch({
            type: PUT_DEAL_SUCCESS,
            payload: responseJson,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        dispatch({
          type: PUT_DEAL_FAIL,
        });
      });
  };
};

export const savePaymentStatus = (requstJSON) => {
  return function (dispatch) {
    var request = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: requstJSON,
    };
    console.log('Request',SAVE_PAYMENTS, request);
    fetch(SAVE_PAYMENTS, request)
      .then(function (response) {
        console.log(response);
        if (response.status !== 200) {
          throw new Error(response.json());
        }
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.status != 200) {
          throw new Error(responseJson.message);
        } else {
          dispatch({
            type: SAVE_PAYMENT_SUCCESS,
            payload: responseJson,
          });
          Actions.pop();
          Actions.pop();
          Actions.pop();
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        dispatch({
          type: SAVE_PAYMENT_FAIL,
        });
      });
  };
};
export const loadingAddDealStarted = () => {
  return {
    type: LOADING_ADD_DEAL,
  };
};
