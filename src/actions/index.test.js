import {
	CHANGE_PITCH,
	changePitch,
	CHANGE_SHEET_MUSIC,
	changeSheetMusic,
	PRESS_AUGMENTATION_DOT,
	pressAugmentationDot,
	RELEASE_AUGMENTATION_DOT,
	releaseAugmentationDot,
	ADD_NOTE,
	addNote,
	DELETE_NOTE,
	deleteNote,
	CHANGE_SIXTEENTH_NOTE_COUNT,
	changeSixteenthNoteCount,
	CHANGE_CLEF,
	changeClef,
	UPDATE_MUSIC,
	updateMusic
} from './index';

describe('changePitch', () => {
	it('should return the action', () => {
		const pitch = 'C4';
		const action = changePitch(pitch);
		expect(action.type).toEqual(CHANGE_PITCH);
		expect(action.pitch).toEqual(pitch);
	});
});

describe('changeSheetMusic', () => {
	it('should return the action', () => {
		const sheetMusic = '|ABCD|';
		const action = changeSheetMusic(sheetMusic);
		expect(action.type).toEqual(CHANGE_SHEET_MUSIC);
		expect(action.sheetMusic).toEqual(sheetMusic);
	});
});

describe('pressAugmentationDot', () => {
	it('should return the action', () => {
		const action = pressAugmentationDot();
		expect(action.type).toEqual(PRESS_AUGMENTATION_DOT);
	});
});

describe('releaseAugmentationDot', () => {
	it('should return the action', () => {
		const action = releaseAugmentationDot();
		expect(action.type).toEqual(RELEASE_AUGMENTATION_DOT);
	});
});

describe('addNote', () => {
	it('should return the action', () => {
		const note = 'A2';
		const action = addNote(note);
		expect(action.type).toEqual(ADD_NOTE);
		expect(action.note).toEqual(note);
	});
});

describe('deleteNote', () => {
	it('should return the action', () => {
		const action = deleteNote();
		expect(action.type).toEqual(DELETE_NOTE);
	});
});

describe('changeSixteenthNoteCount', () => {
	it('should return the action', () => {
		const sixteenthNoteCount = 8;
		const action = changeSixteenthNoteCount(sixteenthNoteCount);
		expect(action.type).toEqual(CHANGE_SIXTEENTH_NOTE_COUNT);
		expect(action.count).toEqual(sixteenthNoteCount);
	});
});

describe('changeClef', () => {
	it('should return the action', () => {
		const clef = 'bass';
		const action = changeClef(clef);
		expect(action.type).toEqual(CHANGE_CLEF);
		expect(action.clef).toEqual(clef);
	});
});

describe('updateMusic', () => {
	it('should return the action', () => {
		const action = updateMusic();
		expect(action.type).toEqual(UPDATE_MUSIC);
	});
});








