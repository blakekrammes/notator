import * as actions from '../actions';

const initialState = {
	pitch: 0
};

export const whistlerReducer = (state = initialState, action) => {
	if (action.type === actions.CHANGE_PITCH) {
		return Object.assign({}, state, {
			pitch: action.pitch
		});
	}
	return state;
};