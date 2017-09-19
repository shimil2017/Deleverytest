import { POST_PACKAGE } from '../constant/index';
export const ADD_PACKAGE_SUCCESS = 'ADD_PACKAGE_success';
export const ADD_PACKAGE_FAIL = 'ADD_PACKAGE_fail';
export const LOADING_ADD_PACKAGE = 'loading_ADD_PACKAGE';

export const addPackage = (requestJSON) => {
  return function (dispatch) {
    const request = {
      method: 'POST',
      body: requestJSON,
      headers: {
        'Content-Type': 'application/json'
      },
    }
    fetch(POST_PACKAGE, request)
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
export const loadingStarted = () => {
  return {
    type: LOADING_ADD_PACKAGE,
  };
};
