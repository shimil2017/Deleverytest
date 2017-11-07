import { Actions } from 'react-native-router-flux';
export const TRAVELER_LIST_SUCCESS = 'lTRAVELER_LIST_success';
export const TRAVELER_LIST_FAIL = 'TRAVELER_LIST_fail';
export const PULL_TO_REFRESH_TRAVELERS = 'PULL_TO_REFRESH_TRAVELERS';
import { GET_TRAVELER_LIST, EXPLORE_TRAVEL } from '../constant/index';
/* eslint no-undef: "error"*/
/* eslint-env browser*/
export const getTravelerList = () => {
  return function (dispatch) {
    var request = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
    };
    console.log('Request',GET_TRAVELER_LIST, request);
    fetch(GET_TRAVELER_LIST, request)
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
            type: TRAVELER_LIST_SUCCESS,
            payload: responseJson,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        dispatch({
          type: TRAVELER_LIST_FAIL,
        });
      });
  };
};

export const getTravelerListExplore = (user_id,km,lat,lng) => {
  return function (dispatch) {
    var data = {
      "user_id": user_id,"km":km,"long":lng,"lat":lat
    };
    var request = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data),
    };
    console.log('Request',EXPLORE_TRAVEL, request);
    fetch(EXPLORE_TRAVEL, request)
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
            type: TRAVELER_LIST_SUCCESS,
            payload: responseJson,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        dispatch({
          type: TRAVELER_LIST_FAIL,
        });
      });
  };
};
export const pullToRefreshTravelerList = () => {
  return {
    type: PULL_TO_REFRESH_TRAVELERS,
  };
};
