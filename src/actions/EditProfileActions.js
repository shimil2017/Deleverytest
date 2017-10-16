import { Actions } from 'react-native-router-flux';
import { EDIT_PROFILE } from '../constant/index';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_FAIL = 'EDIT_PROFILE_FAIL';
export const LOADING_STARTED_EDIT_PROFILE = 'LOADING_STARTED_EDIT_PROFILE';

export const editProfile = (email, password, gender, firstName, lastName, phoneNo, image) => {
  return function (dispatch) {
    const data = {
        "first_name": firstName,
         "last_name": lastName,
         "email": email,
         "password": password,
         "gender": gender,
         "phone_no": phoneNo,
         "image": image,
};
    var request = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    };
    console.log('Request',SIGN_UP,JSON.stringify(data));
    fetch(SIGN_UP, request)
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
        }else {
          dispatch({
            type: EDIT_PROFILE_SUCCESS,
            payload: responseJson,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        dispatch({
          type: EDIT_PROFILE_FAIL,
        });
      });
  };
};

export const loadingStartedEditProfile = () => {
  return {
    type: LOADING_STARTED_EDIT_PROFILE,

  };
};
