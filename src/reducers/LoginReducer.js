import { AsyncStorage } from 'react-native';
import { LOGIN_SUCCESS, LOGIN_FAIL, LOADING_STARTED } from '../actions/LoginAction';
const INITIAL_STATE = { loggedIn: false, loginResponse: {}, loading: false };
import { Actions } from 'react-native-router-flux'
export default function (state = INITIAL_STATE, action){
  switch (action.type){
    case LOGIN_SUCCESS:
    try {
      AsyncStorage.setItem('user_id', action.payload.data._id);
    } catch (error) {
      // Error saving data
      console.log('Saving user_id Error', error);
    }
    Actions.pop();
    Actions.drawer();
      return { ...state,
        loginResponse: action.payload,
        loggedIn: true, loading: false};
        break;
  case LOGIN_FAIL:
    return { ...INITIAL_STATE, loggedIn: false, loading: false};
    break;
  case LOADING_STARTED:
    return { ...INITIAL_STATE, loggedIn: false, loading: true};
    break;
  default:
    return state;
  }
}
