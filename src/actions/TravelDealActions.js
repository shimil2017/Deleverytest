import { Actions } from 'react-native-router-flux';
export const TRAVELE_DEAL_SUCCESS = 'TRAVELE_DEAL_success';
export const TRAVELE_DEAL_FAIL = 'TRAVELE_DEAL_fail';
export const LOADING_ADD_DEAL = 'LOADING_ADD_DEAL';
import { TRAVEL_DEAL_STATUS } from '../constant/index';
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
        if (responseJson.messageId != 200) {
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

export const loadingAddDealStarted = () => {
  return {
    type: LOADING_ADD_DEAL,
  };
};
