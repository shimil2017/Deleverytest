import { TRAVELER_LIST_SUCCESS, TRAVELER_LIST_FAIL, PULL_TO_REFRESH_TRAVELERS } from '../actions/TravelerActions';
const INITIAL_STATE = { travelersListResponse: {}, isLoading: true, pullToRefreshTravelers: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case TRAVELER_LIST_SUCCESS:
      return {
        ...state,
        travelersListResponse: action.payload,
        isLoading: false,
        pullToRefreshTravelers: false
      };
    case TRAVELER_LIST_FAIL:
      return { ...INITIAL_STATE, isLoading: false, pullToRefresh: false
      };
    case PULL_TO_REFRESH_TRAVELERS:
      return { ...state, isLoading: false, pullToRefreshTravelers: true };
    default:
      return state;
  }
}
