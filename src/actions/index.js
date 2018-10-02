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


export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const createUserSuccess = newUser => ({
	type: CREATE_USER_SUCCESS,
	newUser
});


export const createUser = (protoUser) => dispatch => {

	return fetch('https://still-wave-85687.herokuapp.com/users', {
		method: 'post',
		body: JSON.stringify(protoUser),
		headers: {
		    'Content-Type': 'application/json'
		}
	})
	.then(function(res) {
		if (!res.ok) {
			return Promise.reject(res.statusText);
		}
		return res.json();
	})
	.then(function(user) {
		dispatch(createUserSuccess(user));
	})
	.catch(function(err) {
		console.error(err);
	})
}

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const fetchUsersSuccess = users => ({
	type: FETCH_USERS_SUCCESS,
	users
});

export const fetchUsers = () => dispatch => {
	return fetch('https://still-wave-85687.herokuapp.com/users')
	.then(res => {
		if (!res.ok) {
			return Promise.reject(res.statusText);
		}
		return res.json();
	})
	.then(users => {
		dispatch(fetchUsersSuccess(users));
	})
	.catch(err => {
		console.error(err);
	})
};


