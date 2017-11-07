import { SAVE_SETTING } from '../constant/index';
export const SAVE_SETTING_SUCCESS = 'SAVE_SETTING_SUCCESS';
export const SAVE_SETTING_FAIL = 'SAVE_SETTING_FAIL';
export const SETTING_LOADER = 'SETTING_LOADER';

export const saveSetting = (requestJson, userId ) => {
return function (dispatch) {

    const request = {
      method: 'PUT',
      body: requestJson,
      headers: { 'Content-Type': 'application/json' },
    }
    console.log('REQUEST', SAVE_SETTING+"/"+userId, requestJson);
    fetch(SAVE_SETTING+"/"+userId, request)
      .then(function (response) {
        console.log(response);
        // if (response.status !== 200) {
        //   throw new Error(response.json());
        // }
        return response.json();
        })
      .then((responseJson) => {
        if (responseJson.messageId != 200) {
          throw new Error(responseJson.message);
        } else {
          alert(responseJson.message);
          dispatch({
            type: SAVE_SETTING_SUCCESS,
            payload: responseJson,
          });
        }
})
.catch((error) => {
          console.log( "Error Forgot", error.message);
          alert(error.message);
          dispatch({
            type: SAVE_SETTING_FAIL,
          });
        });
    };
  };

  export const loadingSetting = () => {
    return {
      type: SETTING_LOADER,
    };
  };
