import { AsyncStorage } from 'react-native';
import { SIGN_UP_SUCCESS, SIGN_UP_FAIL, LOADING_STARTED } from '../actions/SignUpActions';
const INITIAL_STATE = { registerResponse: {}, loading: false };
import { Actions } from 'react-native-router-flux';
/* eslint no-mixed-spaces-and-tabs: "error"*/
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case SIGN_UP_SUCCESS:
      try {
        console.log(action.payload);
        AsyncStorage.setItem('user_id', action.payload.data.id);
        Actions.pop();
        Actions.drawer();
      } catch (error) {
        // Error saving data
        console.log('Saving user_id Error', error);
      }
      return { ...state,
        registerResponse: action.payload,
        loading: false };
    case SIGN_UP_FAIL:

      return { ...state, loading: false };
    case LOADING_STARTED:
      return { ...state, loading: true };
    default:
      return state;
  }
};
