import {addNote, deleteNote, pressAugmentationDot, releaseAugmentationDot, changeSixteenthNoteCount, changeSheetMusic, isListeningToStore} from './actions';
import store from './store';

export let currentState, timeSignature, writtenNotes, sixteenthNoteCount, 
		pitch, clef, key, baseNoteValue, augmentationDotPressed, storeListeningProperty;

// dispatching actions
let dispatch = store.dispatch;

export function handleStateChange() {
	if (storeListeningProperty === true) {
		return;
	}
	currentState = store.getState().notator;
	timeSignature = currentState.timeSignature;
	writtenNotes = currentState.writtenNotes;
	sixteenthNoteCount = currentState.sixteenthNoteCount;
	pitch = currentState.pitch;
	clef = currentState.clef;
	baseNoteValue = currentState.baseNoteValue;
	key = currentState.key;
	augmentationDotPressed = currentState.augmentationDotPressed;
	console.log(currentState.timeSignature)
}

export let pressKey = (e) => {

	if (storeListeningProperty === undefined || storeListeningProperty === false) {
		dispatch(isListeningToStore());
	}

	// delete handling for notes
	if (e.keyCode === 68 && writtenNotes.length >= 1) {
			
		let length = writtenNotes.length;

		//if last entry was a barline
		if (writtenNotes[length - 1] === '|') {
			if (timeSignature === '4/4') {
				dispatch(changeSixteenthNoteCount(16));
			}
			else if (timeSignature === '3/4' || timeSignature === '6/8') {
				dispatch(changeSixteenthNoteCount(12));
			}
			else if (timeSignature === '2/4') {
				dispatch(changeSixteenthNoteCount(8));
			}
		}

		//if last entry was a sixteenth note
		else if (writtenNotes[length - 1].includes('/4')) {
			dispatch(changeSixteenthNoteCount(sixteenthNoteCount - 1));
		}
		//if last entry was a eighth note
		else if (writtenNotes[length - 1].includes('/2')) {
			dispatch(changeSixteenthNoteCount(sixteenthNoteCount - 2));
		}
		//if last entry was a dotted eighth note
		else if (writtenNotes[length - 1].includes('3//')) {
			dispatch(changeSixteenthNoteCount(sixteenthNoteCount - 3));
		}
		//if last entry was a dotted quarter note
		else if (writtenNotes[length - 1].includes('3/')) {
			dispatch(changeSixteenthNoteCount(sixteenthNoteCount - 6));
		}
		//if last entry was a half note
		else if (writtenNotes[length - 1].includes('2')) {
			dispatch(changeSixteenthNoteCount(sixteenthNoteCount - 8));
		}
		//if last entry was a dotted half note
		else if (writtenNotes[length - 1].includes('3') && !writtenNotes[length - 1].includes('/')) {
			dispatch(changeSixteenthNoteCount(sixteenthNoteCount - 12));
		}
		//if last entry was a whole note
		else if (writtenNotes[length - 1].includes('4')) {
			dispatch(changeSixteenthNoteCount(sixteenthNoteCount - 16));
		}
		//if last entry was a quarter note
		else {
			dispatch(changeSixteenthNoteCount(sixteenthNoteCount - 4));
		}
		dispatch(deleteNote());
	}

	if (pitch === undefined || pitch === '0') {
		return;
	}

	let note = pitch;
	
	const suitableKeyCodes = [81, 69, 72, 87, 83, 190, 68];

	if (e.keyCode === 190) {
		dispatch(pressAugmentationDot());
	}

	if (suitableKeyCodes.includes(e.keyCode)) {

	let filteredNote;

	if (note[1] !== '#') {

		let noteInt = parseInt(note[1], 10);

		//really high pitches (C7 - TBD)
		if (noteInt === 7) {
			filteredNote = `${note[0].toLowerCase()}''`;
		}
		//high pitches (C6 - B6)
		else if (noteInt === 6) {
			filteredNote = `${note[0].toLowerCase()}'`;
		}
		//mid-high pitches (C5 - B5)
		else if (noteInt === 5) {
			filteredNote = note[0].toLowerCase();
		}
		//lower pitches (C3 - B3)
		else if (noteInt === 3) {
			//commas are used to designate lower octave
			let lowNote = `${note[0]},`;
			filteredNote = `${lowNote}`;
		}
		//low pitches (C2 – B2)
		else if (noteInt === 2) {
			//commas are used to designate lower octave
			let lowNote = `${note[0]},,`;
			filteredNote = lowNote;
		}
		//very low pitches (C1 – B1)
		else if (noteInt === 1) {
			//commas are used to designate lower octave
			let lowNote = `${note[0]},,,`;
			filteredNote = lowNote;
		}
		//mid-range pitches (C4 - B4)
		else {
			filteredNote = note[0];
		}

		let musicString = writtenNotes.toString();

		let currentMeasure = musicString.substr(musicString.lastIndexOf('|'), musicString.length);

		if (currentMeasure.includes(`^${note[0]},,,`)
			|| currentMeasure.includes(`^${note[0]},,`)
			|| currentMeasure.includes(`^${note[0]},`)
			|| currentMeasure.includes(`^${note[0].toLowerCase()}''`)
			|| currentMeasure.includes(`^${note[0].toLowerCase()}'`)
			|| currentMeasure.includes(`^${note[0].toLowerCase()}`)
			|| currentMeasure.includes(`^${note[0]}`)) {

			let stringSinceLastSharp = currentMeasure.substr(currentMeasure.lastIndexOf('^'), currentMeasure.length);
			// checks if a natural was stated before in the measure
			if (stringSinceLastSharp.includes(`=${note[0]},,,`)
				|| stringSinceLastSharp.includes(`=${note[0]},,`)
				|| stringSinceLastSharp.includes(`=${note[0]},`)
				|| stringSinceLastSharp.includes(`=${note[0].toLowerCase()}''`)
				|| stringSinceLastSharp.includes(`=${note[0].toLowerCase()}'`)
				|| stringSinceLastSharp.includes(`=${note[0].toLowerCase()}`)
				|| stringSinceLastSharp.includes(`=${note[0]}`)) {
			}
			else {
				filteredNote = `=${filteredNote}`;
			}
		}
	}

	else if (note[1] === '#') {

		let regexOfHash = /#/;
		let noHashNote = note.replace(regexOfHash, '');
		let noHashNoteInt = parseInt(noHashNote[1], 10);

		//very high pitches (C7 - TBD)
		if (noHashNoteInt === 7) {
			filteredNote = `^${noHashNote[0].toLowerCase()}''`;
		}
		//high pitches (C6 - B6)
		else if (noHashNoteInt === 6) {
			filteredNote = `^${noHashNote[0].toLowerCase()}'`;
		}
		//mid-high pitches (C5 to B5)
		else if (noHashNoteInt === 5) {
			filteredNote = `^${noHashNote[0].toLowerCase()}`;
		}
		//lower pitches (C3 - B3)
		else if (noHashNoteInt === 3) {
			//commas are used to designate lower octave
			let lowNote = `${noHashNote[0]},`;
			filteredNote = `^${lowNote}`;
			// console.log(filteredNote)
		}
		//low pitches (C2 – B2)
		else if (noHashNoteInt === 2) {
			let lowNote = `${noHashNote[0]},,`;
			filteredNote = `^${lowNote}`;
		}
		//very low pitches (C1 – B1)
		else if (noHashNoteInt === 1) {
			let lowNote = `${noHashNote[0]},,,`;
			filteredNote = `^${lowNote}`;
		}
		//mid-range pitches (C4 - B4)
		else {
			filteredNote = `^${noHashNote[0]}`;
		} 
	}

		//dotted notes
		if (augmentationDotPressed === true && e.keyCode !== 190) {

			//dotted half
			if (e.keyCode === 72) {
				writeABCNotation(`${filteredNote}3`);
			}
			//dotted quarter
			else if (e.keyCode === 81) {
				writeABCNotation(`${filteredNote}3/`);
			}
			//dotted eighth
			else if (e.keyCode === 69) {
				writeABCNotation(`${filteredNote}3//`);
			}
		}

		//non-dotted notes
		
		//whole note 
		else if (e.keyCode === 87) {
			writeABCNotation(`${filteredNote}4`);
		}

		//half note
		else if (e.keyCode === 72) {
			writeABCNotation(`${filteredNote}2`);
		}

		//quarter note
		else if (e.keyCode === 81) {
			writeABCNotation(`${filteredNote}`);
		}

		//eighth note
		else if (e.keyCode === 69) {
			writeABCNotation(`${filteredNote}/2`);
		}

		//sixteenth note
		else if (e.keyCode === 83) {
			writeABCNotation(`${filteredNote}/4`);
		}
	} 
}

let writeABCNotation = (noteToBeWritten) => {

	let notesToDisplay;

	if (noteToBeWritten === undefined) {
		return;
	}

	//if deleted note
	else if (noteToBeWritten === '') {
		notesToDisplay = writtenNotes.join('');
	}

	//if whole note 
	else if (noteToBeWritten.includes('4') && !noteToBeWritten.includes('/')) {
		if (timeSignature === '4/4') {
			if (sixteenthNoteCount !== 0 && sixteenthNoteCount !== 16) {
				alert('There is not enough room for a whole note in this measure.');
				return;
			}
			else if (sixteenthNoteCount === 16) {
				if (writtenNotes[writtenNotes.length - 1] !== '|') {
					writtenNotes.push('|');
			}
				dispatch(changeSixteenthNoteCount(0));
			}
			dispatch(addNote(noteToBeWritten));
			notesToDisplay = writtenNotes.join('');
			dispatch(changeSixteenthNoteCount(sixteenthNoteCount + 16));
		}
		else if (timeSignature === '2/4' || timeSignature === '3/4' || timeSignature.includes('/8')) {
			alert('There is not enough room for a whole note in this measure.');
			return;
		}
	}

	//if dotted half
	else if (noteToBeWritten.includes('3') && !noteToBeWritten.includes('/')) {
		if (timeSignature === '4/4') {
			if (sixteenthNoteCount > 4 && sixteenthNoteCount < 16) {
				alert('There is not enough room for a dotted half note in this measure.');
				return;
			}
			else if (sixteenthNoteCount === 16) {
				if (writtenNotes[writtenNotes.length - 1] !== '|') {
					writtenNotes.push('|');
				}
				dispatch(changeSixteenthNoteCount(0));
			}
		}
		else if (timeSignature === '3/4' || timeSignature === '6/8') {
			if (sixteenthNoteCount !== 0 && sixteenthNoteCount !== 12) { 
				alert('There is not enough room for a dotted half note in this measure.');
				return;
			}
			else if (sixteenthNoteCount === 12) {
				if (writtenNotes[writtenNotes.length - 1] !== '|') {
					writtenNotes.push('|');
				}
				dispatch(changeSixteenthNoteCount(0));
			}
		}
		else if (timeSignature === '2/4') {
			alert('There is not enough room for a dotted half note in this measure.');
			return;
		}
		dispatch(addNote(noteToBeWritten));
		notesToDisplay = writtenNotes.join('');
		dispatch(changeSixteenthNoteCount(sixteenthNoteCount + 12));
	}

	//if half note
	else if (noteToBeWritten.includes('2') && !noteToBeWritten.includes('/')) {

		if (timeSignature === '4/4') {
			if (sixteenthNoteCount > 8 && sixteenthNoteCount < 16) { 
				alert('There is not enough room for a half note in this measure.'); 
				return;
			}
			else if (sixteenthNoteCount === 16) {
				if (writtenNotes[writtenNotes.length - 1] !== '|') {
					writtenNotes.push('|');
				}
				dispatch(changeSixteenthNoteCount(0));
			}
		}
		else if (timeSignature === '3/4' || timeSignature === '6/8') {
			if (sixteenthNoteCount > 4 && sixteenthNoteCount < 12) { 
				alert('There is not enough room for a half note in this measure.');
				return;
			}
			else if (sixteenthNoteCount === 12) {
				if (writtenNotes[writtenNotes.length - 1] !== '|') {
					writtenNotes.push('|');
				}
				dispatch(changeSixteenthNoteCount(0));
			}
		}
		else if (timeSignature === '2/4') {
			if (sixteenthNoteCount > 0 && sixteenthNoteCount < 8) { 
				alert('There is not enough room for a half note in this measure.');
				return;
			}
			else if (sixteenthNoteCount === 8) {
				if (writtenNotes[writtenNotes.length - 1] !== '|') {
					writtenNotes.push('|');
				}
				dispatch(changeSixteenthNoteCount(0));
			}
		}
		// if not at the end of a measure or if there's enough room in the measure
		dispatch(addNote(noteToBeWritten));
		notesToDisplay = writtenNotes.join('');
		dispatch(changeSixteenthNoteCount(sixteenthNoteCount + 8));
	}

	//if dotted quarter
	else if (noteToBeWritten.includes('3/') && !noteToBeWritten.includes('//')) {
		if (timeSignature === '4/4') {
			if (sixteenthNoteCount > 10 && sixteenthNoteCount < 16) { 
				alert('There is not enough room for a dotted quarter note in this measure.');
				return;
			}
			else if (sixteenthNoteCount === 16) {
				if (writtenNotes[writtenNotes.length - 1] !== '|') {
					writtenNotes.push('|');
				}
				dispatch(changeSixteenthNoteCount(0));
			}
		}
		else if (timeSignature === '3/4' || timeSignature === '6/8') {
			if (sixteenthNoteCount > 6 && sixteenthNoteCount < 12) { 
				alert('There is not enough room for a dotted quarter note in this measure.');
				return;
			}
			else if (sixteenthNoteCount === 12) {
				if (writtenNotes[writtenNotes.length - 1] !== '|') {
					writtenNotes.push('|');
				}
				dispatch(changeSixteenthNoteCount(0));
			}
		}
		else if (timeSignature === '2/4') {
			if (sixteenthNoteCount > 2 && sixteenthNoteCount < 8) { 
				alert('There is not enough room for a dotted quarter note in this measure.');
				return;
			}
			else if (sixteenthNoteCount === 8) {
				if (writtenNotes[writtenNotes.length - 1] !== '|') {
					writtenNotes.push('|');
				}
				dispatch(changeSixteenthNoteCount(0));
			}
		}
		dispatch(addNote(noteToBeWritten));
		notesToDisplay = writtenNotes.join('');
		dispatch(changeSixteenthNoteCount(sixteenthNoteCount + 6));
	}

	//if dotted eighth
	else if (noteToBeWritten.includes('3//')) {
		if (timeSignature === '4/4') {
			if (sixteenthNoteCount > 13 && sixteenthNoteCount < 16) { 
				alert('There is not enough room for a dotted eighth note in this measure.');
				return;
			}
			else if (sixteenthNoteCount === 16) {
				if (writtenNotes[writtenNotes.length - 1] !== '|') {
					writtenNotes.push('|');
				}	      
			dispatch(changeSixteenthNoteCount(0));
			}
		}
		else if (timeSignature === '3/4' || timeSignature === '6/8') {
			if (sixteenthNoteCount > 9 && sixteenthNoteCount < 12) { 
				alert('There is not enough room for a dotted eighth note in this measure.');
				return;
			}
			else if (sixteenthNoteCount === 12) {
				if (writtenNotes[writtenNotes.length - 1] !== '|') {
					writtenNotes.push('|');
				}	      
			dispatch(changeSixteenthNoteCount(0));
			}
		}
		else if (timeSignature === '2/4') {
			if (sixteenthNoteCount > 5 && sixteenthNoteCount < 8) { 
				alert('There is not enough room for a dotted eighth note in this measure.');
				return;
			}
			else if (sixteenthNoteCount === 8) {
				if (writtenNotes[writtenNotes.length - 1] !== '|') {
					writtenNotes.push('|');
				}
				dispatch(changeSixteenthNoteCount(0));
			}
		}
		dispatch(addNote(noteToBeWritten));
		notesToDisplay = writtenNotes.join('');
		dispatch(changeSixteenthNoteCount(sixteenthNoteCount + 3));
	}

	//if eighth note
	else if (noteToBeWritten.includes('/2')) {
		if (timeSignature === '4/4') {
			if (sixteenthNoteCount > 14 && sixteenthNoteCount < 16) { 
				alert('There is not enough room for an eighth note in this measure.');
				return;
			}
			else if (sixteenthNoteCount === 16) {
				if (writtenNotes[writtenNotes.length - 1] !== '|') {
					writtenNotes.push('|');
				}
				dispatch(changeSixteenthNoteCount(0));
			}
		}
		else if (timeSignature === '3/4' || timeSignature === '6/8') {
			if (sixteenthNoteCount > 10 && sixteenthNoteCount < 12) { 
				alert('There is not enough room for an eighth note in this measure.');
				return;
			}
			else if (sixteenthNoteCount === 12) {
				if (writtenNotes[writtenNotes.length - 1] !== '|') {
					writtenNotes.push('|');
				}
				dispatch(changeSixteenthNoteCount(0));
			}
		}
		else if (timeSignature === '2/4') {
			if (sixteenthNoteCount > 6 && sixteenthNoteCount < 8) { 
				alert('There is not enough room for an eighth note in this measure.');
				return;
			}
			else if (sixteenthNoteCount === 8) {
				if (writtenNotes[writtenNotes.length - 1] !== '|') {
					writtenNotes.push('|');
				}
				dispatch(changeSixteenthNoteCount(0));
			}
		}
		dispatch(addNote(noteToBeWritten));
		notesToDisplay = writtenNotes.join('');
		dispatch(changeSixteenthNoteCount(sixteenthNoteCount + 2));
	}

	//if sixteenth note
	else if (noteToBeWritten.includes('/4')) {
		if (timeSignature === '4/4') {
			if (sixteenthNoteCount > 15 && sixteenthNoteCount < 16) { 
				alert('There is not enough room for a sixteenth note in this measure.');
				return;
			}
			else if (sixteenthNoteCount === 16) {
				if (writtenNotes[writtenNotes.length - 1] !== '|') {
					writtenNotes.push('|');
				}
				dispatch(changeSixteenthNoteCount(0));
			}
		}
		else if (timeSignature === '3/4' || timeSignature === '6/8') {
			if (sixteenthNoteCount > 11 && sixteenthNoteCount < 12) {
				alert('There is not enough room for a sixteenth note in this measure.'); 
				return;
			}
			else if (sixteenthNoteCount === 12) {
				if (writtenNotes[writtenNotes.length - 1] !== '|') {
					writtenNotes.push('|');
				}
				dispatch(changeSixteenthNoteCount(0));
			}
		}
		else if (timeSignature === '2/4') {
			if (sixteenthNoteCount > 7 && sixteenthNoteCount < 8) {
				alert('There is not enough room for a sixteenth note in this measure.'); 
				return;
			}
			else if (sixteenthNoteCount === 8) {
				if (writtenNotes[writtenNotes.length - 1] !== '|') {
					writtenNotes.push('|');
				}
				dispatch(changeSixteenthNoteCount(0));
			}
		}
		dispatch(addNote(noteToBeWritten));
		notesToDisplay = writtenNotes.join('');
		dispatch(changeSixteenthNoteCount(sixteenthNoteCount + 1));
	}

	//if quarter note
	else {
		if (timeSignature === '4/4') {
			if (sixteenthNoteCount > 12 && sixteenthNoteCount < 16) { 
				alert('There is not enough room for a quarter note in this measure.');
				return;
			}
			else if (sixteenthNoteCount === 16) {
				if (writtenNotes[writtenNotes.length - 1] !== '|') {
					writtenNotes.push('|');
				}
				dispatch(changeSixteenthNoteCount(0));
			}
		}
		else if (timeSignature === '3/4' || timeSignature === '6/8') {
			if (sixteenthNoteCount > 8 && sixteenthNoteCount < 12) {
				alert('There is not enough room for a quarter note in this measure.'); 
				return;
			}
			else if (sixteenthNoteCount === 12) {
				if (writtenNotes[writtenNotes.length - 1] !== '|') {
					writtenNotes.push('|');
				}
				dispatch(changeSixteenthNoteCount(0));
			}
		}
		else if (timeSignature === '2/4') {
			if (sixteenthNoteCount > 4 && sixteenthNoteCount < 8) { 
				alert('There is not enough room for a quarter note in this measure.');
				return;
			}
			else if (sixteenthNoteCount === 8) {
				if (writtenNotes[writtenNotes.length - 1] !== '|') {
					writtenNotes.push('|');
				}
				dispatch(changeSixteenthNoteCount(0));
			}
		}
		dispatch(addNote(noteToBeWritten));
		notesToDisplay = writtenNotes.join('');
		dispatch(changeSixteenthNoteCount(sixteenthNoteCount + 4));
	}
	
	let music = 
	"T: Composition\n" +
	`M: ${timeSignature}\n` +
	`L: ${baseNoteValue}\n` +
	`K: ${key} clef=${clef}\n` +
	`${notesToDisplay}`;
	
	dispatch(changeSheetMusic(music));

}

export let releaseKey = (e) => {
	if (augmentationDotPressed === true) {
		dispatch(releaseAugmentationDot());
	}
}



