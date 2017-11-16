import { Actions } from 'react-native-router-flux';
import { TRAVELE_DEAL_SUCCESS, TRAVELE_DEAL_FAIL, LOADING_ADD_DEAL, PUT_DEAL_SUCCESS, PUT_DEAL_FAIL, SAVE_PAYMENT_FAIL, SAVE_PAYMENT_SUCCESS } from '../actions/TravelDealActions';

const INITIAL_STATE = { addDealResponse: {}, updateDealResponse: {}, isLoading: false, savePaymentResp:{}, isPayment: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case TRAVELE_DEAL_SUCCESS:

      Actions.pop();
      alert(action.payload.message);
      return { ...state, isLoading: false, addDealResponse: action.payload, savePaymentResp: {}, isPayment: false  };
    case TRAVELE_DEAL_FAIL:
      console.log('FAIL');
      Actions.pop();
      alert(action.payload.message);
      return { ...INITIAL_STATE, isLoading: false };
    case LOADING_ADD_DEAL:
      console.log('START');
      return { ...INITIAL_STATE, isLoading: true };
    case PUT_DEAL_SUCCESS:
    if (action.payload.paymentResponse.paymentApprovalUrl !== undefined && action.payload.paymentResponse.paymentApprovalUrl !==null) {
      Actions.PaymentWebView({ url: action.payload.paymentResponse.paymentApprovalUrl,
        deal_id: action.payload.dealDetails });
    }else {
      Actions.pop();
      Actions.pop();

    }
      return { ...state, updateDealResponse: action.payload, isLoading: false };
    case PUT_DEAL_FAIL:
      return { ...state, isLoading: false };
    case SAVE_PAYMENT_SUCCESS:
      return { ...state, isLoading: false, savePaymentResp: action.payload, isPayment: true };
    case SAVE_PAYMENT_FAIL:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
