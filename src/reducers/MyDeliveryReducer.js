import { LOGOUT } from '../actions/LoginAction';
import { MY_DELIVERY_LIST_SUCCESS, MY_DELIVERY_LIST_FAIL, MY_PULL_TO_REFRESH_DELIVERY, MY_PLAN_START_LOADING } from '../actions/MyDeliveryActions';
const INITIAL_STATE = { deliveryListResponse: {}, isLoading: true, pullToRefreshDelivery: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case MY_DELIVERY_LIST_SUCCESS:
      return {
        ...state,
        deliveryListResponse: action.payload,
        isLoading: false,
        pullToRefreshTravelers: false
      };
    case MY_DELIVERY_LIST_FAIL:
      return { ...INITIAL_STATE, isLoading: false, pullToRefreshDelivery: false };
    case MY_PULL_TO_REFRESH_DELIVERY:
      return { ...state, isLoading: false, pullToRefreshDelivery: true };
    case LOGOUT:
      return { ...state, DeliveryListResponse: {} };
    case MY_PLAN_START_LOADING:
      return { ...state, isLoading: true };
    default:
      return state;
  }
}
