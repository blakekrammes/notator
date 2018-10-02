import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';

import {singerReducer} from './reducers';

export default createStore(
		combineReducers({
			form: formReducer,
			singer: singerReducer
		}),
		applyMiddleware(thunk)
);
