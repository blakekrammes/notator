import * as actions from '../actions';

const initialState = {
	pitch: undefined,
	sheetMusic: undefined,
	keyCode: undefined,
	augmentationDotPressed: false,
	writtenNotes: [],
	sixteenthNoteCount: 0
};

export const singerReducer = (state = initialState, action) => {
	if (action.type === actions.CHANGE_PITCH) {
		return Object.assign({}, state, {
			pitch: action.pitch
		});
	}
	else if (action.type === actions.CHANGE_SHEET_MUSIC) {
		return Object.assign({}, state, {
			sheetMusic: action.sheetMusic
		});
	}
	else if (action.type === actions.CHANGE_CURRENT_KEYCODE) {
		return Object.assign({}, state, {
			keyCode: action.keyCode
		});
	}
	else if (action.type === actions.TOGGLE_AUGMENTATION_STATE) {
		return Object.assign({}, state, {
			augmentationDotPressed: action.augmentationState
		});
	}
	else if (action.type === actions.CHANGE_SIXTEENTH_NOTE_COUNT) {
		return Object.assign({}, state, {
			sixteenthNoteCount: action.count
		});
	}
	return state;
};