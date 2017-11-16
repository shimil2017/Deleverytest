import { Actions } from 'react-native-router-flux';
import { EDIT_PROFILE } from '../constant/index';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_FAIL = 'EDIT_PROFILE_FAIL';
export const LOADING_STARTED_EDIT_PROFILE = 'LOADING_STARTED_EDIT_PROFILE';

export const editProfile = (result, email, gender, firstName, lastName, phoneNo, image, paypalId) => {
  return function (dispatch) {
    const data = {
         "_id": result,
         "first_name": firstName,
         "last_name": lastName,
         "email": email,
         "gender": gender,
         "phone_no": phoneNo,
         "image": image,
         "paypalId": paypalId
};
    var request = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(data)
    };
    console.log('Request',EDIT_PROFILE,JSON.stringify(data));
    fetch(EDIT_PROFILE, request)
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
          Actions.pop();
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
