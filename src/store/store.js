import LoginReducer from '../reducers/LoginReducer';
import SignUpReducer from '../reducers/SignUpReducer';
import ForgetReducer from '../reducers/ForgetReducer';
import AddPackageReducer from '../reducers/AddPackageReducer';
import TravelersListReducer from '../reducers/TravelersListReducer';
import PackagesListReducer from '../reducers/PackagesListReducer';
import TravelDealReducer from '../reducers/TravelDealReducer';
import MyTravelPlanListReducer from '../reducers/MyTravelPlanListReducer';
import MyPackagesListReducer from '../reducers/MyPackagesListReducer';
import PickUpReducer from '../reducers/PickUpReducer';
import EditProfileReducer from '../reducers/EditProfileReducer';
import SaveSettingReducer from '../reducers/SaveSettingReducer';
import MyPreviousPostReducer from '../reducers/MyPreviousPostReducer';
import MyDeliveryReducer from '../reducers/MyDeliveryReducer';
import UpdateDealReducer from '../reducers/UpdateDealReducer';

import { combineReducers } from 'redux';

const reducers = combineReducers({
    LoginReducer: LoginReducer,
  	SignUpReducer: SignUpReducer,
  	ForgetReducer: ForgetReducer,
  	AddPackageReducer: AddPackageReducer,
    TravelersListReducer: TravelersListReducer,
    PackagesListReducer: PackagesListReducer,
    TravelDealReducer: TravelDealReducer,
    MyTravelPlanListReducer: MyTravelPlanListReducer,
    MyPackagesListReducer: MyPackagesListReducer,
    PickUpReducer: PickUpReducer,
    EditProfileReducer: EditProfileReducer,
    SaveSettingReducer: SaveSettingReducer,
    MyDeliveryReducer: MyDeliveryReducer,
    MyPreviousPostReducer: MyPreviousPostReducer,
    UpdateDealReducer: UpdateDealReducer,
});

export default reducers;
