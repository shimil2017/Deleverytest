import LoginReducer from '../reducers/LoginReducer';
import SignUpReducer from '../reducers/SignUpReducer';
import ForgetReducer from '../reducers/ForgetReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
	LoginReducer: LoginReducer,
	SignUpReducer: SignUpReducer,
	ForgetReducer: ForgetReducer,
});

export default reducers;
