import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { LOGOUT } from '../actions/LoginAction';
import { SIGN_UP_SUCCESS, SIGN_UP_FAIL, LOADING_STARTED } from '../actions/SignUpActions';
const INITIAL_STATE = { registerResponse: {}, loading: false, isRegistered: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
    alert("Hi "+action.payload.data.first_name+", Welcome to Package Delivery App.")
      try {
        console.log(action.payload);
        AsyncStorage.setItem('user_id', action.payload.data._id);

      } catch (error) {
        // Error saving data

        console.log('Saving user_id Error', error);
      }
      Actions.pop();
      Actions.pop();
      return { ...state,
        registerResponse: action.payload.data,
        isRegistered: true,
        loading: false };
    case SIGN_UP_FAIL:

      return { ...state, loading: false, isRegistered: false };
    case LOADING_STARTED:
      return { ...state, loading: true };
    case LOGOUT:
      try {
        console.log(action.payload);
        AsyncStorage.setItem('user_id', '');
      } catch (error) {
        // Error saving data
        console.log('Saving user_id Error', error);
      }
      return { ...state, registerResponse: {}, isRegistered: false, loading: false };
    default:
      return state;
  }
};
