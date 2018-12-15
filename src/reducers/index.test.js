import {notatorReducer} from './index';
import {
	changePitch, 
	changeSheetMusic, 
	pressAugmentationDot,
	releaseAugmentationDot,
	addNote,
	deleteNote,
	changeSixteenthNoteCount,
	changeClef,
	updateMusic
} from '../actions/index';


let musicTemplate = 
	  "T: Composition\n" +
	  "M: 4/4\n" +
	  "L: 2/8\n" +
	  "K: CMaj clef=treble\n" +
	  `|`;

describe('notatorReducer', () => {


	it('should set the initial state when nothing is passed', () => {
		const state = notatorReducer(undefined, {type: '__UNKNOWN'});
		expect(state).toEqual({
			pitch: undefined,
			sheetMusic: musicTemplate,
			keyCode: undefined,
			augmentationDotPressed: false,
			writtenNotes: ['|'],
			sixteenthNoteCount: 0,
			clef: 'treble',
			timeSignature: '4/4',
			baseNoteValue: '2/8',
			keySignature: 'CMaj',
			demoNotation: [
				{
					title: 'Mary Had a Little Lamb',
					music: 'edcd|eee2',
					clef: 'treble',
					timeSignature: '4/4',
					baseNoteValue: '2/8',
					keySignature: 'CMaj'
				},
				{
					title: 'Twinkle Twinkle',
					music: 'ccgg|aag2',
					clef: 'treble',
					timeSignature: '4/4',
					baseNoteValue: '2/8',
					keySignature: 'CMaj'
				},
				{
					title: 'Yankees',
					music:'ccde|cedg,',
					clef: 'treble',
					timeSignature: '4/4',
					baseNoteValue: '2/8',
					keySignature: 'CMaj'
				}
			]
		});
	});

	it('Should return the current state on an unknown action', () => {
        let currentState = {};
        const state = notatorReducer(currentState, {type: '__UNKNOWN'});
        expect(state).toBe(currentState);
    });

	describe('changePitch', () => {
		it('should change the pitch', () => {
			let state;
			let pitch = 'A4';
			state = notatorReducer(state, changePitch(pitch));
			expect(state.pitch).toEqual('A4');
		});
	});

	describe('changeSheetMusic', () => {
		it('should change the sheetMusic', () => {
			let state;
			let sheetMusic = '|ABCD|';
			state = notatorReducer(state, changeSheetMusic(sheetMusic));
			expect(state.sheetMusic).toEqual('|ABCD|');
		});
	});

	describe('pressAugmentationDot', () => {
		it('should change augmentationDotPressed boolean to true', () => {
			let state;
			state = notatorReducer(state, pressAugmentationDot());
			expect(state.augmentationDotPressed).toEqual(true);
		});
	});

	describe('releaseAugmentationDot', () => {
		it('should change augmentationDotPressed boolean to false', () => {
			let state;
			state = notatorReducer(state, releaseAugmentationDot());
			expect(state.augmentationDotPressed).toEqual(false);
		});
	});

	describe('addNote', () => {
		it('should add a note', () => {
			let state;
			let note = 'A';
			let noteTwo = 'B';
			state = notatorReducer(state, addNote(note));
			state = notatorReducer(state, addNote(noteTwo));
			expect(state.writtenNotes[1]).toEqual(note);
			expect(state.writtenNotes[2]).toEqual(noteTwo);
		});
	});

	describe('deleteNote', () => {
		it('should remove a note', () => {
			let state;
			let noteToBeAddedThenDeleted = 'C';
			state = notatorReducer(state, addNote(noteToBeAddedThenDeleted));
			state = notatorReducer(state, deleteNote());
			expect(state.writtenNotes[1]).toEqual(undefined);
		});
	});

	describe('changeSixteenthNoteCount', () => {
		it('should change the sixteenthNoteCount', () => {
			let state;
			let countToBeChangeTo = 16;
			state = notatorReducer(state, changeSixteenthNoteCount(countToBeChangeTo));
			expect(state.sixteenthNoteCount).toEqual(countToBeChangeTo);
		});
	});

	describe('changeClef', () => {
		it('should change the clef', () => {
			let state;
			let bassClef = 'bass';
			state = notatorReducer(state, changeClef(bassClef));
			expect(state.clef).toEqual(bassClef);
		});
	});

	describe('updateMusic', () => {
		it('should update the music', () => {
			let state;
			state = notatorReducer(state, addNote('c'));
			let updatedMusicTemplate = 
				  "T: Composition\n" +
				  "M: 4/4\n" +
				  "L: 2/8\n" +
				  "K: CMaj clef=treble\n" +
				  `${state.writtenNotes.join('')}`;
			state = notatorReducer(state, updateMusic());
			expect(state.sheetMusic).toEqual(updatedMusicTemplate);
		});
	});
});