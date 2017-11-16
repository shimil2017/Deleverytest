import { LOGOUT } from '../actions/LoginAction';
import { MY_PACKAGES_LIST_SUCCESS, MY_PACKAGES_LIST_FAIL, MY_PULL_TO_REFRESH_PACKAGE, MY_PACKAGES_START_LOADING } from '../actions/MyPackagesListActions';
const INITIAL_STATE = { packagesListResponse: {}, isLoading: true, pullToRefreshPackages: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case MY_PACKAGES_LIST_SUCCESS:
      return {
        ...state,
        packagesListResponse: action.payload,
        isLoading: false,
        pullToRefreshPackages: false
      };
    case MY_PACKAGES_LIST_FAIL:
      return { ...INITIAL_STATE, isLoading: false, pullToRefreshPackages: false };
    case MY_PULL_TO_REFRESH_PACKAGE:
      return { ...state, isLoading: false, pullToRefreshPackages: true };
    case LOGOUT:
      return { ...state, packagesListResponse: {} };
    case MY_PACKAGES_START_LOADING:
      return { ...state, isLoading: true };
    default:
      return state;
  }
}
