import * as actions from '../actions';

const initialState = {
	pitch: undefined
};

export const singerReducer = (state = initialState, action) => {
	if (action.type === actions.CHANGE_PITCH) {
		return Object.assign({}, state, {
			pitch: action.pitch
		});
	}
	return state;
};