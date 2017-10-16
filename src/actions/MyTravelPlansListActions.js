export const MY_TRAVELER_LIST_SUCCESS = 'MY_TRAVELER_LIST_SUCCESS';
export const MY_TRAVELER_LIST_FAIL = 'MY_TRAVELER_LIST_FAIL';
export const MY_PULL_TO_REFRESH_TRAVELERS = 'MY_PULL_TO_REFRESH_TRAVELERS';
export const MY_PLAN_START_LOADING = 'MY_PLAN_START_LOADING';
import { My_TRAVEL_PLAN } from '../constant/index';
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