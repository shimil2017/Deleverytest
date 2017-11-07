import { LOGOUT } from '../actions/LoginAction';
import { MY_PREVIOUS_START_LOADING,MY_PREVIOUSPOST_LIST_SUCCESS,MY_PREVIOUSPOST_LIST_FAIL,MY_PREVIOUSPOST_PULLTOREFRESH} from '../actions/MyPreviousPostActions';
const INITIAL_STATE={previousListResponse:{}, isLoading: true, pulltorefresh: false };
export default function (state= INITIAL_STATE, action) {
    switch(action.type) {
      case MY_PREVIOUSPOST_LIST_SUCCESS:
        return{
              ...state,
              previousListResponse:action.payload,
              isLoading:false,
              pulltorefresh:false
          };
        case MY_PREVIOUSPOST_LIST_FAIL:
          return{
              ...state,
              isLoading: true,
              pulltorefresh: false
          };
        case MY_PREVIOUSPOST_PULLTOREFRESH:
          return{
              ...state,
              isLoading:false,
              pulltorefresh:true
          };
        case MY_PREVIOUS_START_LOADING:
          return{
              ...state,
              isLoading:true,

          };
        default:
        return state;

        }
    }
