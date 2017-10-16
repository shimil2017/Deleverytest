import { POST_PACKAGE, ADD_TRAVEL_PLAN } from '../constant/index';
export const ADD_PACKAGE_SUCCESS = 'ADD_PACKAGE_success';
export const ADD_PACKAGE_FAIL = 'ADD_PACKAGE_fail';
export const LOADING_ADD_PACKAGE = 'loading_ADD_PACKAGE';
export const ADD_TRAVEL_PLAN_SUCCESS = 'add_travel_success';
export const ADD_TRAVEL_FAIL = 'add_travel_fail';

export const addPackage = (requestJSON) => {
  console.log('ADDPACKAGE');
  return function (dispatch) {
    const request = {
      method: 'POST',
      body: requestJSON,
      headers: {
        'Content-Type': 'application/json'
      },
    }
    console.log('REQUEST',POST_PACKAGE,request);
    fetch(POST_PACKAGE, request)
      .then(function (response) {
        console.log("REsponse",response);
        if (response.status !== 200) {
          throw new Error(response.json());
        }
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.messageId != 200) {
          throw new Error(responseJson.message);
}
        else {
          alert(responseJson.message);
          dispatch({
            type: ADD_PACKAGE_SUCCESS,
            payload: responseJson,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        dispatch({
          type: ADD_PACKAGE_FAIL,
        });
      });
  };
};
export const addTravelPlan = (requestJSON) => {
  console.log('ADDTravel');
  return function (dispatch) {
    const request = {
      method: 'POST',
      body: requestJSON,
      headers: {
        'Content-Type': 'application/json'
      },
    }
    console.log('REQUEST', ADD_TRAVEL_PLAN, request);
    fetch(ADD_TRAVEL_PLAN, request)
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
          alert(responseJson.message);
          dispatch({
            type: ADD_TRAVEL_PLAN_SUCCESS,
            payload: responseJson,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        dispatch({
          type: ADD_TRAVEL_FAIL,
        });
      });
  };
};
export const loadingAddPackageStarted = () => {
  return {
    type: LOADING_ADD_PACKAGE,
  };
};
