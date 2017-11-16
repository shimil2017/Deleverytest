export const MY_TRAVELER_LIST_SUCCESS = 'MY_TRAVELER_LIST_SUCCESS';
export const MY_TRAVELER_LIST_FAIL = 'MY_TRAVELER_LIST_FAIL';
export const MY_PULL_TO_REFRESH_TRAVELERS = 'MY_PULL_TO_REFRESH_TRAVELERS';
export const MY_PLAN_START_LOADING = 'MY_PLAN_START_LOADING';
export const UPDATE_LOCATION_SUCCESS = 'UPDATE_LOCATION_SUCCESS';
export const UPDATE_LOCATION_FAIL = 'UPDATE_LOCATION_FAIL';
export const TOTAL_COUNT_SUCCESS = 'TOTAL_COUNT_SUCCESS';
export const TOTAL_COUNT_FAIL = 'TOTAL_COUNT_FAIL';
import { My_TRAVEL_PLAN, UPDATE_LOCATION, TOTAL_COUNT } from '../constant/index';
/* eslint no-undef: "error"*/
/* eslint-env browser*/
export const getMyTravelPlanList = (user_id) => {
  return function (dispatch) {
    var data ={
      "user_id":user_id
    };
    var request = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    };
    console.log("REQUEST",My_TRAVEL_PLAN,JSON.stringify(data),My_TRAVEL_PLAN);
    fetch(My_TRAVEL_PLAN, request)
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
            type: MY_TRAVELER_LIST_SUCCESS,
            payload: responseJson,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        dispatch({
          type: My_TRAVELER_LIST_FAIL,
        });
      });
  };
};
export const updateLocation = (user_id, lastUpdatedLong, lastUpdatedLat) => {
  return function (dispatch) {
    var data ={
      "user_id": user_id,
      "lastUpdatedLat": lastUpdatedLat,
      "lastUpdatedLong": lastUpdatedLong
    };
    var request = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(data)
    };
    console.log("REQUEST",UPDATE_LOCATION+"/"+user_id,JSON.stringify(data));
    fetch(UPDATE_LOCATION+"/"+user_id, request)
      .then(function (response) {
        console.log("Update=====",response, response.status);
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
            type: UPDATE_LOCATION_SUCCESS,
            payload: responseJson,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: UPDATE_LOCATION_FAIL,
        });
      });
  };
};
export const totalCount = (user_id) => {
  return function (dispatch) {
    var data ={
      "user_id": user_id,
    };
    var request = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    };
    console.log('Total Count ', request);
    fetch(TOTAL_COUNT, request)
      .then(function (response) {
        console.log('Counts', response, response.status);
        if (response.status != 200) {
          throw new Error(response.json());
        }
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.status != 200) {
          throw new Error(responseJson.message);
        } else {
          dispatch({
            type: TOTAL_COUNT_SUCCESS,
            payload: responseJson,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: TOTAL_COUNT_FAIL,
        });
      });
  };
};

export const myPlanStartLoading = () => {
  return {
    type: MY_PLAN_START_LOADING,
  };
};
export const pullToRefreshTravelerList = () => {
  return {
    type: MY_PULL_TO_REFRESH_TRAVELERS,
  };
};
