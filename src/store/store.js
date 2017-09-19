import LoginReducer from '../reducers/LoginReducer';
import SignUpReducer from '../reducers/SignUpReducer';
import ForgetReducer from '../reducers/ForgetReducer';
import AddPackageReducer from '../reducers/AddPackageReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  LoginReducer: LoginReducer,
	SignUpReducer: SignUpReducer,
	ForgetReducer: ForgetReducer,
	AddPackageReducer: AddPackageReducer,
});

export default reducers;
