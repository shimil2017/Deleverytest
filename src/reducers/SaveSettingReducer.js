import { SAVE_SETTING_SUCCESS, SAVE_SETTING_FAIL, SETTING_LOADER } from '../actions/SaveSetting';
const INITIAL_STATE = { saveSetting: {}, isLoading: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SAVE_SETTING_SUCCESS:
      return { ...state, isLoading: false };
    case SAVE_SETTING_FAIL:
      return { ...INITIAL_STATE, isLoading: false };
    case SETTING_LOADER:
      return { ...INITIAL_STATE, isLoading: true };
    default:
      return state;
  }
}
