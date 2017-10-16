import { Actions } from 'react-native-router-flux';
export const PACKAGES_LIST_SUCCESS = 'PACKAGES_LIST_success';
export const PACKAGES_LIST_FAIL = 'PACKAGES_LIST_fail';
export const PULL_TO_REFRESH_PACKAGE = 'PULL_TO_REFRESH_PACKAGE';
import { GET_PACKAGES_LIST, EXPLORE_PACKAGE } from '../constant/index';
/* eslint no-undef: "error"*/
/* eslint-env browser*/
export const getPackagesList = (email, password, loginType) => {
  return function (dispatch) {
    var request = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
    };
    console.log('Request',GET_PACKAGES_LIST,request);
    fetch(GET_PACKAGES_LIST, request)
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
            type: PACKAGES_LIST_SUCCESS,
            payload: responseJson,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        dispatch({
          type: PACKAGES_LIST_FAIL,
        });
      });
  };
};
export const getPackagesListExplore = (user_id) => {
  return function (dispatch) {
    var data = {
      "user_id": user_id,
    };
    var request = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
        body: JSON.stringify(data),
    };
    console.log('Request',EXPLORE_PACKAGE,request);
    fetch(EXPLORE_PACKAGE, request)
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
            type: PACKAGES_LIST_SUCCESS,
            payload: responseJson,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        dispatch({
          type: PACKAGES_LIST_FAIL,
        });
      });
  };
};
export const pullToRefreshPackagesList = () => {
  return {
    type: PULL_TO_REFRESH_PACKAGE,
  };
};
