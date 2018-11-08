export const CHANGE_PITCH = 'CHANGE_PITCH';
export const changePitch = pitch => ({
	type: CHANGE_PITCH,
	pitch
});

export const CHANGE_SHEET_MUSIC = 'CHANGE_SHEET_MUSIC';
export const changeSheetMusic = sheetMusic => ({
	type: CHANGE_SHEET_MUSIC,
	sheetMusic
});

export const CHANGE_CURRENT_KEYCODE = 'CHANGE_CURRENT_KEYCODE';
export const changeCurrentKeycode = keyCode => ({
	type: CHANGE_CURRENT_KEYCODE,
	keyCode
});

export const PRESS_AUGMENTATION_DOT = 'PRESS_AUGMENTATION_DOT';
export const pressAugmentationDot = () => ({
	type: PRESS_AUGMENTATION_DOT
});

export const RELEASE_AUGMENTATION_DOT = 'RELEASE_AUGMENTATION_DOT';
export const releaseAugmentationDot = () => ({
	type: RELEASE_AUGMENTATION_DOT
});

export const ADD_NOTE = 'ADD_NOTE';
export const addNote = note => ({
	type: ADD_NOTE,
	note
});

export const DELETE_NOTE = 'DELETE_NOTE';
export const deleteNote = () => ({
	type: DELETE_NOTE
});

export const CHANGE_SIXTEENTH_NOTE_COUNT = 'CHANGE_SIXTEENTH_NOTE_COUNT';
export const changeSixteenthNoteCount = count => ({
	type: CHANGE_SIXTEENTH_NOTE_COUNT,
	count
});

export const CHANGE_CLEF = 'CHANGE_CLEF';
export const changeClef = clef => ({
	type: CHANGE_CLEF,
	clef
});

export const UPDATE_MUSIC = 'UPDATE_MUSIC';
export const updateMusic = () => ({
	type: UPDATE_MUSIC
});

export const SAVE_DEMO_NOTATION = 'SAVE_DEMO_NOTATION';
export const saveDemoNotation = notation => ({
	type: SAVE_DEMO_NOTATION,
	notation
});

export const DELETE_DEMO_NOTATION = 'DELETE_DEMO_NOTATION';
export const deleteDemoNotation = title => ({
	type: DELETE_DEMO_NOTATION,
	title
});

// export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
// export const fetchUsersSuccess = users => ({
// 	type: FETCH_USERS_SUCCESS,
// 	users
// });

// const notatorServerURL = 'https://notatorserver.herokuapp.com'

// export const fetchUsers = () => dispatch => {
// 	return fetch(`${notatorServerURL}/users`)
// 	.then(res => {
// 		if (!res.ok) {
// 			return Promise.reject(res.statusText);
// 		}
// 		return res.json();
// 	})
// 	.then(users => {
// 		dispatch(fetchUsersSuccess(users));
// 	})
// 	.catch(err => {
// 		console.error(err);
// 	})
// };


