import { UPDATE_DEAL_SUCCESS, UPDATE_DEAL_FAIL, LOADING_UPDATE_DEAL } from '../actions/TravelerActions';
const INITIAL_STATE = { updateStatusSucces: {}, isLoading: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_DEAL_SUCCESS:
      alert(action.payload.message)
      return {
        ...state,
        updateStatusSucces: action.payload,
        isLoading: false,
      };
    case UPDATE_DEAL_FAIL:
      return { ...INITIAL_STATE, isLoading: false
      };
    case LOADING_UPDATE_DEAL:
      return { ...state, isLoading: true };
    default:
      return state;
  }
}
