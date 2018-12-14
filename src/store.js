import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import {loadAuthToken} from './localStorage';
import authReducer from './reducers/auth';
import protectedDataReducer from './reducers/protectedData';
import {setAuthToken, refreshAuthToken} from './actions/auth';

import {notatorReducer} from './reducers';

const store = createStore(
		combineReducers({
			form: formReducer,
			auth: authReducer,
			protectedData: protectedDataReducer,
			notator: notatorReducer
		}),
		applyMiddleware(thunk)
);

// Hydrate the authToken from localStorage if it exists
const authToken = loadAuthToken();
if (authToken) {
	const token = authToken;
	store.dispatch(setAuthToken(token));
	store.dispatch(refreshAuthToken());
}

export default store;