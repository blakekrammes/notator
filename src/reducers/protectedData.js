import {
	FETCH_COMPOSITIONS_SUCCESS,
	FETCH_COMPOSITIONS_ERROR
} from '../actions/protectedData';

const initialState = {
	data: '',
	error: null
};

export default function reducer(state = initialState, action) {
	if (action.type === FETCH_COMPOSITIONS_SUCCESS) {
		return Object.assign({}, state, {
			data: action.data,
			error: null
		});
	}
	else if (action.type === FETCH_COMPOSITIONS_ERROR) {
		return Object.assign({}, state, {
			error: action.error
		});
	}
	return state;
}