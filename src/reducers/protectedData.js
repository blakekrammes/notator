import {
	FETCH_COMPOSITIONS_SUCCESS,
	FETCH_COMPOSITIONS_ERROR,
	DELETE_COMPOSITION_SUCCESS
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
	else if (action.type === DELETE_COMPOSITION_SUCCESS) {
		return Object.assign({}, state, {
			data: {
				compositions: state.data.compositions.filter(item => action.id !== item.id)
			}
		});
	}
	return state;
}