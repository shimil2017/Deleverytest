import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAIL, LOADING_STARTED_EDIT_PROFILE } from '../actions/EditProfileActions';

const INITIAL_STATE = { editProfileResponse: {}, loading: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EDIT_PROFILE_SUCCESS:
      try {
        console.log(action.payload);
      } catch (error) {
        // Error saving data
        console.log('EDITSaving user_id Error', error);
      }
      return { ...state,
        registerResponse: action.payload.data,
        isRegistered: true,
        loading: false };
    case EDIT_PROFILE_FAIL:

      return { ...state, loading: false, isRegistered: false };
    case LOADING_STARTED_EDIT_PROFILE:
      return { ...state, loading: true };
    default:
      return state;
  }
};
