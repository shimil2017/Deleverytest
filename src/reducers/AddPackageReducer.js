import { ADD_PACKAGE_SUCCESS, ADD_PACKAGE_FAIL, LOADING_ADD_PACKAGE, ADD_TRAVEL_PLAN_SUCCESS, ADD_TRAVEL_FAIL } from '../actions/AddPackageActions';
import { Actions } from 'react-native-router-flux';
const INITIAL_STATE = { addPackageResponse: {}, isLoading: false, addTravelPlanResponse: {} };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_PACKAGE_SUCCESS:
      console.log("SUCESS");
      Actions.pop();
      Actions.pop();
      Actions.TravelersList({ package_id: action.payload.data._id, budget: action.payload.data.budget });
      return { ...state, isLoading: false };
    case ADD_PACKAGE_FAIL:
      console.log("FAIL");
      return { ...INITIAL_STATE, isLoading: false };
    case LOADING_ADD_PACKAGE:
      console.log("START");
      return { ...INITIAL_STATE, isLoading: true };
    case ADD_TRAVEL_PLAN_SUCCESS:
      Actions.pop();
      Actions.pop();
      Actions.PackagesList({ traveller_plan_id: action.payload.data.id });
      return { ...INITIAL_STATE, isLoading: false, addTravelPlanResponse: action.payload };
    case ADD_TRAVEL_FAIL:
      return { ...INITIAL_STATE, isLoading: false, addTravelPlanResponse: {} };
    default:
      return state;
  }
};
