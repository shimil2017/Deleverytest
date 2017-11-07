import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import { LOGIN_SUCCESS, LOGIN_FAIL, LOADING_STARTED, LOGOUT } from '../actions/LoginAction';
import { SIGN_UP_SUCCESS } from '../actions/SignUpActions';
import { EDIT_PROFILE_SUCCESS } from '../actions/EditProfileActions';
import { SAVE_SETTING_SUCCESS } from '../actions/SaveSetting';
const INITIAL_STATE = { loggedIn: false, loginResponse: {}, loading: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    alert("Hi "+action.payload.data.first_name+", Welcome to Package Delivery App.")
      try {
        AsyncStorage.setItem('user_id', action.payload.data._id);
      } catch (error) {
        // Error saving data
        console.log('Saving user_id Error', error);
      }
      Actions.pop();
      console.log('Login Respo', action.payload.data);
      return { ...state,
        loginResponse: action.payload.data,
        loggedIn: true,
        loading: false
      };
    case SAVE_SETTING_SUCCESS:
      console.log('SAVE Respo', action.payload.data);
      return { ...state,
        loginResponse: action.payload.data,
      };
    case LOGIN_FAIL:
      return { ...INITIAL_STATE, loggedIn: false, loading: false };
    case LOADING_STARTED:
      return { ...INITIAL_STATE, loggedIn: false, loading: true };
    case LOGOUT:
      try {
        AsyncStorage.setItem('user_id', "");
      } catch (error) {
        // Error saving data
        console.log('Saving user_id Error', error);
      }
      alert('You are Successfully logged out.');
      return { ...state, loginResponse: {}, loggedIn: false, loading: false };
    case EDIT_PROFILE_SUCCESS:
      // try {
      //   AsyncStorage.setItem('user_id', action.payload.data._id);
      // } catch (error) {
      //   // Error saving data
      //   console.log('EDIT Saving user_id Error', error);
      // }
      console.log('EDIT Respo', action.payload.data);
      return { ...state,
        loginResponse: action.payload.data,
        loggedIn: true,
        loading: false
      };
    case SIGN_UP_SUCCESS:
      try {
        AsyncStorage.setItem('user_id', action.payload.data._id);
      } catch (error) {
        // Error saving data
        console.log('Saving user_id Error', error);
      }
      console.log('Login Respo', action.payload.data);
      return { ...state,
        loginResponse: action.payload.data,
        loggedIn: true,
        loading: false
      };
    default:
      return state;
  }
}
