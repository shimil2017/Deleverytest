import { ADD_PACKAGE_SUCCESS, ADD_PACKAGE_FAIL, LOADING_ADD_PACKAGE } from '../actions/AddPackageActions';
const INITIAL_STATE = { addPackageResponse: {}, isLoading: false };

export default function (state = INITIAL_STATE, action){
  switch (action.type) {
    case ADD_PACKAGE_SUCCESS:
    return { ...state, isLoading: false };
    case ADD_PACKAGE_FAIL:
      return { ...INITIAL_STATE, isLoading: false
        };
    case LOADING_ADD_PACKAGE:
      return { ...INITIAL_STATE, isLoading: true
        };
    default:
      return state;
  }
};
