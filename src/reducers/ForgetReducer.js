import { FORGOT_SUCCESS, FORGOT_FAIL, LOADING_FORGOT } from '../actions/ForgetAction';
const INITIAL_STATE = { forgetResponse: {}, isLoading: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FORGOT_SUCCESS:
      return { ...state, isLoading: false };
    case FORGOT_FAIL:
      return { ...INITIAL_STATE, isLoading: false };
    case LOADING_FORGOT:
      return { ...INITIAL_STATE, isLoading: true };
    default:
      return state;
  }
}
