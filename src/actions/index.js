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

export const TOGGLE_AUGMENTATION_STATE = 'TOGGLE_AUGMENTATION_STATE';
export const toggleAugmentationState = augmentationState => ({
	type: TOGGLE_AUGMENTATION_STATE,
	augmentationState
});

export const CHANGE_SIXTEENTH_NOTE_COUNT = 'CHANGE_SIXTEENTH_NOTE_COUNT';
export const changeSixteenthNoteCount = count => ({
	type: CHANGE_SIXTEENTH_NOTE_COUNT,
	count
});