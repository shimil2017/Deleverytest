import { Actions } from 'react-native-router-flux';
import { TRAVELE_DEAL_SUCCESS, TRAVELE_DEAL_FAIL, LOADING_ADD_DEAL } from '../actions/TravelDealActions';

const INITIAL_STATE = { addDealResponse: {}, isLoading: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case TRAVELE_DEAL_SUCCESS:

      Actions.pop();
      alert(action.payload.message);
      return { ...state, isLoading: false, addDealResponse: action.payload };
    case TRAVELE_DEAL_FAIL:
      console.log('FAIL');
      alert(action.payload.message);
      return { ...INITIAL_STATE, isLoading: false };
    case LOADING_ADD_DEAL:
      console.log('START');
      return { ...INITIAL_STATE, isLoading: true };
    default:
      return state;
  }
}
