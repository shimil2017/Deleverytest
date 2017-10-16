export const MY_PACKAGES_LIST_SUCCESS = 'MY_PACKAGES_LIST_SUCCESS';
export const MY_PACKAGES_LIST_FAIL = 'MY_PACKAGES_LIST_FAIL';
export const MY_PULL_TO_REFRESH_PACKAGE = 'MY_PULL_TO_REFRESH_PACKAGE';
export const MY_PACKAGES_START_LOADING = 'MY_PACKAGES_START_LOADING';
import { My_PACKAGES } from '../constant/index';
/* eslint no-undef: "error"*/
/* eslint-env browser*/
export const getMyPackagesList = (user_id) => {
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
    console.log("Request",My_PACKAGES,JSON.stringify(data),My_PACKAGES);
    fetch(My_PACKAGES, request)
      .then(function (response) {

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
            type: MY_PACKAGES_LIST_SUCCESS,
            payload: responseJson,
          });
        }
      })
      .catch((error) => {
        alert(error);
        dispatch({
          type: MY_PACKAGES_LIST_FAIL,
        });
      });
  };
};

export const myPackageStartLoading = () => {
  return {
    type: MY_PACKAGES_START_LOADING,
  };
};
export const pullToRefreshMyPackagesList = () => {
  return {
    type: MY_PULL_TO_REFRESH_PACKAGE,
  };
};
