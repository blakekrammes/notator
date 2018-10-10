import * as actions from '../actions';

let musicTemplate = 
	  "T: Composition\n" +
	  "M: 4/4\n" +
	  "L: 2/8\n" +
	  "K: CMaj clef=treble\n" +
	  `|`;

const initialState = {
	pitch: undefined,
	sheetMusic: musicTemplate,
	keyCode: undefined,
	augmentationDotPressed: false,
	writtenNotes: ['|'],
	sixteenthNoteCount: 0,
	clef: 'treble',
	dimensions: {
		width: window.innerWidth,
		height: window.innerHeight
	}
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
	else if (action.type === actions.PRESS_AUGMENTATION_DOT) {
		return Object.assign({}, state, {
			augmentationDotPressed: true
		});
	}
	else if (action.type === actions.RELEASE_AUGMENTATION_DOT) {
		return Object.assign({}, state, {
			augmentationDotPressed: false
		});
	}
	else if (action.type === actions.ADD_NOTE) {
		return Object.assign({}, state, {
			writtenNotes: [...state.writtenNotes, action.note]
		});
	}
	else if (action.type === actions.DELETE_NOTE) {
		if (state.writtenNotes.length === 1) {
			return state;
		}
		let slicedNotes = state.writtenNotes.slice(0, state.writtenNotes.length - 1);
		let slicedNotesString = slicedNotes.join('');
		let updatedMusicTemplate = "T: Composition\n" +
								   "M: 4/4\n" +
								   "L: 2/8\n" +
								   `K: CMaj clef=${state.clef}\n` +
							  	   `${slicedNotesString}`;	
		return Object.assign({}, state, {
			writtenNotes: slicedNotes,
			sheetMusic: updatedMusicTemplate
		});
	}
	else if (action.type === actions.CHANGE_SIXTEENTH_NOTE_COUNT) {
		return Object.assign({}, state, {
			sixteenthNoteCount: action.count
		});
	}
	else if (action.type === actions.CHANGE_CLEF) {
		return Object.assign({}, state, {
			clef: action.clef
		});
	}
	else if (action.type === actions.UPDATE_MUSIC) {
		let notesString = state.writtenNotes.join('');
		let updatedMusicTemplate = "T: Composition\n" +
								   "M: 4/4\n" +
								   "L: 2/8\n" +
								   `K: CMaj clef=${state.clef}\n` +
							  	   `${notesString}`;
		return Object.assign({}, state, {
			sheetMusic: updatedMusicTemplate
		});
	}
	else if (action.type === actions.SET_DIMENSIONS) {
		return Object.assign({}, state, {
			dimensions: {
				width: action.width,
				height: action.height
			}
		});
	}
	return state;
};