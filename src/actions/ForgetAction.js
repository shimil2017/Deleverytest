import { FORGOT_PASSWORD } from '../constant/index';
export const FORGOT_SUCCESS = 'forgot_success';
export const FORGOT_FAIL = 'forgot_fail';
export const LOADING_FORGOT = 'loading_forgot';

export const forget = (email) => {
return function (dispatch) {
    const data = { email: email };
    const request = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    }
    console.log('REQUEST', FORGOT_PASSWORD, request);
    fetch(FORGOT_PASSWORD, request)
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
            type: FORGOT_SUCCESS,
            payload: responseJson,
          });
        }
})
.catch((error) => {
          console.log(error);
          alert(error);
          dispatch({
            type: FORGOT_FAIL,
          });
        });
    };
  };
  export const loadingStarted = () => {
    return {
      type: LOADING_FORGOT,
    };
  };
