import { LOGOUT } from '../actions/LoginAction';
import { MY_TRAVELER_LIST_SUCCESS, MY_TRAVELER_LIST_FAIL, MY_PULL_TO_REFRESH_TRAVELERS, MY_PLAN_START_LOADING } from '../actions/MyTravelPlansListActions';
const INITIAL_STATE = { travelersListResponse: {}, isLoading: true, pullToRefreshTravelers: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case MY_TRAVELER_LIST_SUCCESS:
      return {
        ...state,
        travelersListResponse: action.payload,
        isLoading: false,
        pullToRefreshTravelers: false
      };
    case MY_TRAVELER_LIST_FAIL:
      return { ...INITIAL_STATE, isLoading: false, pullToRefresh: false };
    case MY_PULL_TO_REFRESH_TRAVELERS:
      return { ...state, isLoading: false, pullToRefreshTravelers: true };
    case LOGOUT:
      return { ...state, travelersListResponse: {} };
    case MY_PLAN_START_LOADING:
      return { ...state, isLoading: true };
    default:
      return state;
  }
}
