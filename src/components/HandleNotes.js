import { Component } from 'react';
import { connect } from 'react-redux';
import { addNote, deleteNote, pressAugmentationDot, releaseAugmentationDot, changeSixteenthNoteCount, changeSheetMusic } from '../actions';

const suitableKeyCodes = [81, 69, 72, 87, 83, 190, 8];

export class HandleNotes extends Component {

	componentDidMount() {
		document.addEventListener('keydown', this.pressKey);
		document.addEventListener('keyup', this.releaseKey);
		// binding the ref for the parent component (Instructions) to access the pressKey method
		this.props.onRef(this);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.pressKey);
		document.removeEventListener('keyup', this.releaseKey);
		// unbinding the ref
		this.props.onRef(undefined);
	}

	pressKey = (e) => {
		// if the key pressed isn't in the list return so we don't get an error when trying to find the html class that matches the keyCode
		if (!suitableKeyCodes.includes(e.keyCode)) {
			return;
		}

		// highlight the css key if the event is a keypress and not a click
		// highlighting css keys for clicks is already handled with the :active css pseudo class
		if (!e.clickEvent) {
			switch(e.keyCode) {
				case 8:
				// react equivalent of document.querySelector()
				this.props.deleteKey.classList.add('keydown');
				break
				case 87:
				this.props.wholeNoteKey.classList.add('keydown');
				break
				case 72:
				this.props.halfNoteKey.classList.add('keydown');
				break
				case 81:
				this.props.quarterNoteKey.classList.add('keydown');
				break
				case 69:
				this.props.eighthNoteKey.classList.add('keydown');
				break
				case 83:
				this.props.sixteenthNoteKey.classList.add('keydown');
				break
				default:
				this.props.augmentationDotKey.classList.add('keydown');
				break
			}
		}

		// delete handling for notes
		if (e.keyCode === 8 && this.props.writtenNotes.length >= 1) {
			// keep FF from routing back a page 
			if (typeof e.preventDefault === 'function') {
				e.preventDefault();
			}
			let length = this.props.writtenNotes.length;

			//if last entry was a barline
			if (this.props.writtenNotes[length - 1] === '|') {
				if (this.props.timeSignature === '4/4') {
					this.props.dispatch(changeSixteenthNoteCount(16));
				}
				else if (this.props.timeSignature === '3/4' || this.props.timeSignature === '6/8') {
					this.props.dispatch(changeSixteenthNoteCount(12));
				}
				else if (this.props.timeSignature === '2/4') {
					this.props.dispatch(changeSixteenthNoteCount(8));
				}
			}

			//if last entry was a sixteenth note
			else if (this.props.writtenNotes[length - 1].includes('/4')) {
				this.props.dispatch(changeSixteenthNoteCount(this.props.sixteenthNoteCount - 1));
			}
			//if last entry was a eighth note
			else if (this.props.writtenNotes[length - 1].includes('/2')) {
				this.props.dispatch(changeSixteenthNoteCount(this.props.sixteenthNoteCount - 2));
			}
			//if last entry was a dotted eighth note
			else if (this.props.writtenNotes[length - 1].includes('3//')) {
				this.props.dispatch(changeSixteenthNoteCount(this.props.sixteenthNoteCount - 3));
			}
			//if last entry was a dotted quarter note
			else if (this.props.writtenNotes[length - 1].includes('3/')) {
				this.props.dispatch(changeSixteenthNoteCount(this.props.sixteenthNoteCount - 6));
			}
			//if last entry was a half note
			else if (this.props.writtenNotes[length - 1].includes('2')) {
				this.props.dispatch(changeSixteenthNoteCount(this.props.sixteenthNoteCount - 8));
			}
			//if last entry was a dotted half note
			else if (this.props.writtenNotes[length - 1].includes('3') && !this.props.writtenNotes[length - 1].includes('/')) {
				this.props.dispatch(changeSixteenthNoteCount(this.props.sixteenthNoteCount - 12));
			}
			//if last entry was a whole note
			else if (this.props.writtenNotes[length - 1].includes('4')) {
				this.props.dispatch(changeSixteenthNoteCount(this.props.sixteenthNoteCount - 16));
			}
			//if last entry was a quarter note
			else {
				this.props.dispatch(changeSixteenthNoteCount(this.props.sixteenthNoteCount - 4));
			}
			this.props.dispatch(deleteNote());
		}

		// if a note is not displaying 
		if (this.props.pitch === undefined || this.props.pitch === '0') {
			return;
		}

		let note = this.props.pitch;
		
		if (e.keyCode === 190 && !e.clickEvent) {
			this.props.dispatch(pressAugmentationDot());
		}

	let filteredNote;

	if (note[1] !== '#') {

		let noteInt = parseInt(note[1], 10);

		//really high this.props.pitches (C7 - TBD)
		if (noteInt === 7) {
			filteredNote = `${note[0].toLowerCase()}''`;
		}
		//high this.props.pitches (C6 - B6)
		else if (noteInt === 6) {
			filteredNote = `${note[0].toLowerCase()}'`;
		}
		//mid-high this.props.pitches (C5 - B5)
		else if (noteInt === 5) {
			filteredNote = note[0].toLowerCase();
		}
		//lower this.props.pitches (C3 - B3)
		else if (noteInt === 3) {
			//commas are used to designate lower octave
			let lowNote = `${note[0]},`;
			filteredNote = `${lowNote}`;
		}
		//low this.props.pitches (C2 – B2)
		else if (noteInt === 2) {
			//commas are used to designate lower octave
			let lowNote = `${note[0]},,`;
			filteredNote = lowNote;
		}
		//very low this.props.pitches (C1 – B1)
		else if (noteInt === 1) {
			//commas are used to designate lower octave
			let lowNote = `${note[0]},,,`;
			filteredNote = lowNote;
		}
		//mid-range this.props.pitches (C4 - B4)
		else {
			filteredNote = note[0];
		}

		let musicString = this.props.writtenNotes.toString();

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

		//very high this.props.pitches (C7 - TBD)
		if (noHashNoteInt === 7) {
			filteredNote = `^${noHashNote[0].toLowerCase()}''`;
		}
		//high this.props.pitches (C6 - B6)
		else if (noHashNoteInt === 6) {
			filteredNote = `^${noHashNote[0].toLowerCase()}'`;
		}
		//mid-high this.props.pitches (C5 to B5)
		else if (noHashNoteInt === 5) {
			filteredNote = `^${noHashNote[0].toLowerCase()}`;
		}
		//lower this.props.pitches (C3 - B3)
		else if (noHashNoteInt === 3) {
			//commas are used to designate lower octave
			let lowNote = `${noHashNote[0]},`;
			filteredNote = `^${lowNote}`;
		}
		//low this.props.pitches (C2 – B2)
		else if (noHashNoteInt === 2) {
			let lowNote = `${noHashNote[0]},,`;
			filteredNote = `^${lowNote}`;
		}
		//very low this.props.pitches (C1 – B1)
		else if (noHashNoteInt === 1) {
			let lowNote = `${noHashNote[0]},,,`;
			filteredNote = `^${lowNote}`;
		}
		//mid-range this.props.pitches (C4 - B4)
		else {
			filteredNote = `^${noHashNote[0]}`;
		} 
	}

		//dotted notes
		if (this.props.augmentationDotPressed === true && e.keyCode !== 190) {
			//dotted half
			if (e.keyCode === 72) {
				this.writeABCNotation(`${filteredNote}3`);
			}
			//dotted quarter
			else if (e.keyCode === 81) {
				this.writeABCNotation(`${filteredNote}3/`);
			}
			//dotted eighth
			else if (e.keyCode === 69) {
				this.writeABCNotation(`${filteredNote}3//`);
			}
		}

		//non-dotted notes
		
		//whole note 
		else if (e.keyCode === 87) {
			this.writeABCNotation(`${filteredNote}4`);
		}

		//half note
		else if (e.keyCode === 72) {
			this.writeABCNotation(`${filteredNote}2`);
		}

		//quarter note
		else if (e.keyCode === 81) {
			this.writeABCNotation(`${filteredNote}`);
		}

		//eighth note
		else if (e.keyCode === 69) {
			this.writeABCNotation(`${filteredNote}/2`);
		}

		//sixteenth note
		else if (e.keyCode === 83) {
			this.writeABCNotation(`${filteredNote}/4`);
		}
	}

	writeABCNotation = (noteToBeWritten) => {

		let notesToDisplay;

		if (noteToBeWritten === undefined) {
			return;
		}

		//if deleted note
		else if (noteToBeWritten === '') {
			notesToDisplay = this.props.writtenNotes.join('');
		}

		//if whole note 
		else if (noteToBeWritten.includes('4') && !noteToBeWritten.includes('/')) {
			if (this.props.timeSignature === '4/4') {
				if (this.props.sixteenthNoteCount !== 0 && this.props.sixteenthNoteCount !== 16) {
					alert('There is not enough room for a whole note in this measure.');
					return;
				}
				else if (this.props.sixteenthNoteCount === 16) {
					if (this.props.writtenNotes[this.props.writtenNotes.length - 1] !== '|') {
						this.props.writtenNotes.push('|');
				}
					this.props.dispatch(changeSixteenthNoteCount(0));
				}
				this.props.dispatch(addNote(noteToBeWritten));
				notesToDisplay = this.props.writtenNotes.join('');
				this.props.dispatch(changeSixteenthNoteCount(this.props.sixteenthNoteCount + 16));
			}
			else if (this.props.timeSignature === '2/4' || this.props.timeSignature === '3/4' || this.props.timeSignature.includes('/8')) {
				alert('There is not enough room for a whole note in this measure.');
				return;
			}
		}

		//if dotted half
		else if (noteToBeWritten.includes('3') && !noteToBeWritten.includes('/')) {
			if (this.props.timeSignature === '4/4') {
				if (this.props.sixteenthNoteCount > 4 && this.props.sixteenthNoteCount < 16) {
					alert('There is not enough room for a dotted half note in this measure.');
					return;
				}
				else if (this.props.sixteenthNoteCount === 16) {
					if (this.props.writtenNotes[this.props.writtenNotes.length - 1] !== '|') {
						this.props.writtenNotes.push('|');
					}
					this.props.dispatch(changeSixteenthNoteCount(0));
				}
			}
			else if (this.props.timeSignature === '3/4' || this.props.timeSignature === '6/8') {
				if (this.props.sixteenthNoteCount !== 0 && this.props.sixteenthNoteCount !== 12) { 
					alert('There is not enough room for a dotted half note in this measure.');
					return;
				}
				else if (this.props.sixteenthNoteCount === 12) {
					if (this.props.writtenNotes[this.props.writtenNotes.length - 1] !== '|') {
						this.props.writtenNotes.push('|');
					}
					this.props.dispatch(changeSixteenthNoteCount(0));
				}
			}
			else if (this.props.timeSignature === '2/4') {
				alert('There is not enough room for a dotted half note in this measure.');
				return;
			}
			this.props.dispatch(addNote(noteToBeWritten));
			notesToDisplay = this.props.writtenNotes.join('');
			this.props.dispatch(changeSixteenthNoteCount(this.props.sixteenthNoteCount + 12));
		}

		//if half note
		else if (noteToBeWritten.includes('2') && !noteToBeWritten.includes('/')) {

			if (this.props.timeSignature === '4/4') {
				if (this.props.sixteenthNoteCount > 8 && this.props.sixteenthNoteCount < 16) { 
					alert('There is not enough room for a half note in this measure.'); 
					return;
				}
				else if (this.props.sixteenthNoteCount === 16) {
					if (this.props.writtenNotes[this.props.writtenNotes.length - 1] !== '|') {
						this.props.writtenNotes.push('|');
					}
					this.props.dispatch(changeSixteenthNoteCount(0));
				}
			}
			else if (this.props.timeSignature === '3/4' || this.props.timeSignature === '6/8') {
				if (this.props.sixteenthNoteCount > 4 && this.props.sixteenthNoteCount < 12) { 
					alert('There is not enough room for a half note in this measure.');
					return;
				}
				else if (this.props.sixteenthNoteCount === 12) {
					if (this.props.writtenNotes[this.props.writtenNotes.length - 1] !== '|') {
						this.props.writtenNotes.push('|');
					}
					this.props.dispatch(changeSixteenthNoteCount(0));
				}
			}
			else if (this.props.timeSignature === '2/4') {
				if (this.props.sixteenthNoteCount > 0 && this.props.sixteenthNoteCount < 8) { 
					alert('There is not enough room for a half note in this measure.');
					return;
				}
				else if (this.props.sixteenthNoteCount === 8) {
					if (this.props.writtenNotes[this.props.writtenNotes.length - 1] !== '|') {
						this.props.writtenNotes.push('|');
					}
					this.props.dispatch(changeSixteenthNoteCount(0));
				}
			}
			// if not at the end of a measure or if there's enough room in the measure
			this.props.dispatch(addNote(noteToBeWritten));
			notesToDisplay = this.props.writtenNotes.join('');
			this.props.dispatch(changeSixteenthNoteCount(this.props.sixteenthNoteCount + 8));
		}

		//if dotted quarter
		else if (noteToBeWritten.includes('3/') && !noteToBeWritten.includes('//')) {
			if (this.props.timeSignature === '4/4') {
				if (this.props.sixteenthNoteCount > 10 && this.props.sixteenthNoteCount < 16) { 
					alert('There is not enough room for a dotted quarter note in this measure.');
					return;
				}
				else if (this.props.sixteenthNoteCount === 16) {
					if (this.props.writtenNotes[this.props.writtenNotes.length - 1] !== '|') {
						this.props.writtenNotes.push('|');
					}
					this.props.dispatch(changeSixteenthNoteCount(0));
				}
			}
			else if (this.props.timeSignature === '3/4' || this.props.timeSignature === '6/8') {
				if (this.props.sixteenthNoteCount > 6 && this.props.sixteenthNoteCount < 12) { 
					alert('There is not enough room for a dotted quarter note in this measure.');
					return;
				}
				else if (this.props.sixteenthNoteCount === 12) {
					if (this.props.writtenNotes[this.props.writtenNotes.length - 1] !== '|') {
						this.props.writtenNotes.push('|');
					}
					this.props.dispatch(changeSixteenthNoteCount(0));
				}
			}
			else if (this.props.timeSignature === '2/4') {
				if (this.props.sixteenthNoteCount > 2 && this.props.sixteenthNoteCount < 8) { 
					alert('There is not enough room for a dotted quarter note in this measure.');
					return;
				}
				else if (this.props.sixteenthNoteCount === 8) {
					if (this.props.writtenNotes[this.props.writtenNotes.length - 1] !== '|') {
						this.props.writtenNotes.push('|');
					}
					this.props.dispatch(changeSixteenthNoteCount(0));
				}
			}
			this.props.dispatch(addNote(noteToBeWritten));
			notesToDisplay = this.props.writtenNotes.join('');
			this.props.dispatch(changeSixteenthNoteCount(this.props.sixteenthNoteCount + 6));
		}

		//if dotted eighth
		else if (noteToBeWritten.includes('3//')) {
			if (this.props.timeSignature === '4/4') {
				if (this.props.sixteenthNoteCount > 13 && this.props.sixteenthNoteCount < 16) { 
					alert('There is not enough room for a dotted eighth note in this measure.');
					return;
				}
				else if (this.props.sixteenthNoteCount === 16) {
					if (this.props.writtenNotes[this.props.writtenNotes.length - 1] !== '|') {
						this.props.writtenNotes.push('|');
					}	      
				this.props.dispatch(changeSixteenthNoteCount(0));
				}
			}
			else if (this.props.timeSignature === '3/4' || this.props.timeSignature === '6/8') {
				if (this.props.sixteenthNoteCount > 9 && this.props.sixteenthNoteCount < 12) { 
					alert('There is not enough room for a dotted eighth note in this measure.');
					return;
				}
				else if (this.props.sixteenthNoteCount === 12) {
					if (this.props.writtenNotes[this.props.writtenNotes.length - 1] !== '|') {
						this.props.writtenNotes.push('|');
					}	      
				this.props.dispatch(changeSixteenthNoteCount(0));
				}
			}
			else if (this.props.timeSignature === '2/4') {
				if (this.props.sixteenthNoteCount > 5 && this.props.sixteenthNoteCount < 8) { 
					alert('There is not enough room for a dotted eighth note in this measure.');
					return;
				}
				else if (this.props.sixteenthNoteCount === 8) {
					if (this.props.writtenNotes[this.props.writtenNotes.length - 1] !== '|') {
						this.props.writtenNotes.push('|');
					}
					this.props.dispatch(changeSixteenthNoteCount(0));
				}
			}
			this.props.dispatch(addNote(noteToBeWritten));
			notesToDisplay = this.props.writtenNotes.join('');
			this.props.dispatch(changeSixteenthNoteCount(this.props.sixteenthNoteCount + 3));
		}

		//if eighth note
		else if (noteToBeWritten.includes('/2')) {
			if (this.props.timeSignature === '4/4') {
				if (this.props.sixteenthNoteCount > 14 && this.props.sixteenthNoteCount < 16) { 
					alert('There is not enough room for an eighth note in this measure.');
					return;
				}
				else if (this.props.sixteenthNoteCount === 16) {
					if (this.props.writtenNotes[this.props.writtenNotes.length - 1] !== '|') {
						this.props.writtenNotes.push('|');
					}
					this.props.dispatch(changeSixteenthNoteCount(0));
				}
			}
			else if (this.props.timeSignature === '3/4' || this.props.timeSignature === '6/8') {
				if (this.props.sixteenthNoteCount > 10 && this.props.sixteenthNoteCount < 12) { 
					alert('There is not enough room for an eighth note in this measure.');
					return;
				}
				else if (this.props.sixteenthNoteCount === 12) {
					if (this.props.writtenNotes[this.props.writtenNotes.length - 1] !== '|') {
						this.props.writtenNotes.push('|');
					}
					this.props.dispatch(changeSixteenthNoteCount(0));
				}
			}
			else if (this.props.timeSignature === '2/4') {
				if (this.props.sixteenthNoteCount > 6 && this.props.sixteenthNoteCount < 8) { 
					alert('There is not enough room for an eighth note in this measure.');
					return;
				}
				else if (this.props.sixteenthNoteCount === 8) {
					if (this.props.writtenNotes[this.props.writtenNotes.length - 1] !== '|') {
						this.props.writtenNotes.push('|');
					}
					this.props.dispatch(changeSixteenthNoteCount(0));
				}
			}
			this.props.dispatch(addNote(noteToBeWritten));
			notesToDisplay = this.props.writtenNotes.join('');
			this.props.dispatch(changeSixteenthNoteCount(this.props.sixteenthNoteCount + 2));
		}

		//if sixteenth note
		else if (noteToBeWritten.includes('/4')) {
			if (this.props.timeSignature === '4/4') {
				if (this.props.sixteenthNoteCount > 15 && this.props.sixteenthNoteCount < 16) { 
					alert('There is not enough room for a sixteenth note in this measure.');
					return;
				}
				else if (this.props.sixteenthNoteCount === 16) {
					if (this.props.writtenNotes[this.props.writtenNotes.length - 1] !== '|') {
						this.props.writtenNotes.push('|');
					}
					this.props.dispatch(changeSixteenthNoteCount(0));
				}
			}
			else if (this.props.timeSignature === '3/4' || this.props.timeSignature === '6/8') {
				if (this.props.sixteenthNoteCount > 11 && this.props.sixteenthNoteCount < 12) {
					alert('There is not enough room for a sixteenth note in this measure.'); 
					return;
				}
				else if (this.props.sixteenthNoteCount === 12) {
					if (this.props.writtenNotes[this.props.writtenNotes.length - 1] !== '|') {
						this.props.writtenNotes.push('|');
					}
					this.props.dispatch(changeSixteenthNoteCount(0));
				}
			}
			else if (this.props.timeSignature === '2/4') {
				if (this.props.sixteenthNoteCount > 7 && this.props.sixteenthNoteCount < 8) {
					alert('There is not enough room for a sixteenth note in this measure.'); 
					return;
				}
				else if (this.props.sixteenthNoteCount === 8) {
					if (this.props.writtenNotes[this.props.writtenNotes.length - 1] !== '|') {
						this.props.writtenNotes.push('|');
					}
					this.props.dispatch(changeSixteenthNoteCount(0));
				}
			}
			this.props.dispatch(addNote(noteToBeWritten));
			notesToDisplay = this.props.writtenNotes.join('');
			this.props.dispatch(changeSixteenthNoteCount(this.props.sixteenthNoteCount + 1));
		}

		//if quarter note
		else {
			if (this.props.timeSignature === '4/4') {
				if (this.props.sixteenthNoteCount > 12 && this.props.sixteenthNoteCount < 16) { 
					alert('There is not enough room for a quarter note in this measure.');
					return;
				}
				else if (this.props.sixteenthNoteCount === 16) {
					if (this.props.writtenNotes[this.props.writtenNotes.length - 1] !== '|') {
						this.props.writtenNotes.push('|');
					}
					this.props.dispatch(changeSixteenthNoteCount(0));
				}
			}
			else if (this.props.timeSignature === '3/4' || this.props.timeSignature === '6/8') {
				if (this.props.sixteenthNoteCount > 8 && this.props.sixteenthNoteCount < 12) {
					alert('There is not enough room for a quarter note in this measure.'); 
					return;
				}
				else if (this.props.sixteenthNoteCount === 12) {
					if (this.props.writtenNotes[this.props.writtenNotes.length - 1] !== '|') {
						this.props.writtenNotes.push('|');
					}
					this.props.dispatch(changeSixteenthNoteCount(0));
				}
			}
			else if (this.props.timeSignature === '2/4') {
				if (this.props.sixteenthNoteCount > 4 && this.props.sixteenthNoteCount < 8) { 
					alert('There is not enough room for a quarter note in this measure.');
					return;
				}
				else if (this.props.sixteenthNoteCount === 8) {
					if (this.props.writtenNotes[this.props.writtenNotes.length - 1] !== '|') {
						this.props.writtenNotes.push('|');
					}
					this.props.dispatch(changeSixteenthNoteCount(0));
				}
			}
			this.props.dispatch(addNote(noteToBeWritten));
			notesToDisplay = this.props.writtenNotes.join('');
			this.props.dispatch(changeSixteenthNoteCount(this.props.sixteenthNoteCount + 4));
		}
		
		let music =
		"T: Composition\n" +
		`M: ${this.props.timeSignature}\n` +
		`L: ${this.props.baseNoteValue}\n` +
		`K: ${this.props.keySignature} clef=${this.props.clef}\n` +
		`${notesToDisplay}`;
		this.props.dispatch(changeSheetMusic(music));
	}

	releaseKey = (e) => {
		if (this.props.augmentationDotPressed === true) {
			this.props.dispatch(releaseAugmentationDot());
		}
		if (!suitableKeyCodes.includes(e.keyCode)) {
			return;
		}
		let keyboardKeyNode;

		switch(e.keyCode) {
			case 8:
			// react equivalent of document.querySelector()
			// keep FF from routing back a page
			if (typeof e.preventDefault === 'function') {
				console.log('hooooo')
				e.preventDefault();
			}
			keyboardKeyNode = this.props.deleteKey;
			break
			case 87:
			keyboardKeyNode = this.props.wholeNoteKey;
			break
			case 72:
			keyboardKeyNode = this.props.halfNoteKey;
			break
			case 81:
			keyboardKeyNode = this.props.quarterNoteKey;
			break
			case 69:
			keyboardKeyNode = this.props.eighthNoteKey;
			break
			case 83:
			keyboardKeyNode = this.props.sixteenthNoteKey;
			break
			default:
			keyboardKeyNode = this.props.augmentationDotKey;
			break
		}
		keyboardKeyNode.classList.remove('keydown');
	}

	render() {
		return null;
	}
}

const mapStateToProps = state => ({
	timeSignature: state.notator.timeSignature,
	writtenNotes: state.notator.writtenNotes,
	sixteenthNoteCount: state.notator.sixteenthNoteCount,
	pitch: state.notator.pitch,
	clef: state.notator.clef,
	baseNoteValue: state.notator.baseNoteValue,
	keySignature: state.notator.keySignature,
	augmentationDotPressed: state.notator.augmentationDotPressed,
	keyboardKeyCodeClicked: state.notator.keyboardKeyCodeClicked,
	keyboardKeyClickedTimeStamp: state.notator.keyboardKeyClickedTimeStamp
});

export default connect(mapStateToProps)(HandleNotes);