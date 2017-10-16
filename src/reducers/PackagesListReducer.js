import { PACKAGES_LIST_SUCCESS, PACKAGES_LIST_FAIL, PULL_TO_REFRESH_PACKAGE } from '../actions/PackagesListActions';
const INITIAL_STATE = { packagesListResponse: {}, isLoading: true, pullToRefreshPackages: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case PACKAGES_LIST_SUCCESS:
      return {
        ...state,
        packagesListResponse: action.payload,
        isLoading: false,
        pullToRefreshPackages: false
      };
    case PACKAGES_LIST_FAIL:
      return { ...INITIAL_STATE, isLoading: false, pullToRefreshPackages: false
      };
    case PULL_TO_REFRESH_PACKAGE:
      return { ...state, isLoading: false, pullToRefreshPackages: true };
    default:
      return state;
  }
}
