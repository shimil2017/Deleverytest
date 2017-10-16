import { PICK_POINTS_ADD, PICK_POINTS_REMOVE } from '../actions/PickupActions';
const INITIAL_STATE = { pickupAddress: null };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case PICK_POINTS_ADD:
      return { ...state, pickupAddress: action.payload };
    case PICK_POINTS_REMOVE:
      return { ...INITIAL_STATE, pickupAddress: null
      };
    default:
      return state;
  }
}
