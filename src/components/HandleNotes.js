import { Component } from 'react';
import { connect } from 'react-redux';
import { addNote, deleteNote, pressAugmentationDot, releaseAugmentationDot, changeSixteenthNoteCount, changeSheetMusic } from '../actions';

const suitableKeyCodes = [81, 69, 72, 87, 83, 190, 8];

export class HandleNotes extends Component {

	componentDidMount() {
		document.addEventListener('keydown', this.pressKey);
		document.addEventListener('keyup', this.releaseKey);
		document.querySelector('.c87').addEventListener('click', this.handleClicks);
		document.querySelector('.c72').addEventListener('click', this.handleClicks);
		document.querySelector('.c81').addEventListener('click', this.handleClicks);
		document.querySelector('.c69').addEventListener('click', this.handleClicks);
		document.querySelector('.c83').addEventListener('click', this.handleClicks);
		document.querySelector('.c190').addEventListener('click', this.handleClicks);
		document.querySelector(`.c46`).addEventListener('click', this.handleClicks);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.pressKey);
		document.removeEventListener('keyup', this.releaseKey);
		document.querySelector('.c87').removeEventListener('click', this.handleClicks);	
		document.querySelector('.c72').removeEventListener('click', this.handleClicks);
		document.querySelector('.c81').removeEventListener('click', this.handleClicks);
		document.querySelector('.c69').removeEventListener('click', this.handleClicks);
		document.querySelector('.c83').removeEventListener('click', this.handleClicks);
		document.querySelector('.c190').removeEventListener('click', this.handleClicks);
		document.querySelector(`.c46`).removeEventListener('click', this.handleClicks);
	}

	pressKey = (e) => {

		// console.log(e)

		// if (e.type === 'click') {
		// 	e.keyCode = e.path
		// }

		// delete handling for notes
		if (e.keyCode === 8 && this.props.writtenNotes.length >= 1) {
				
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

		// highlight period key
		if (e.keyCode === 190) {
			document.querySelector('.c190').classList.add('keydown');
		}
		// w key
		else if (e.keyCode === 87) {
			document.querySelector('.c87').classList.add('keydown');
		}
		// h
		else if (e.keyCode === 72) {
			document.querySelector('.c72').classList.add('keydown');
		}
		// q
		else if (e.keyCode === 81) {
			document.querySelector('.c81').classList.add('keydown');
		}
		// e
		else if (e.keyCode === 69) {
			document.querySelector('.c69').classList.add('keydown');
		}
		// s
		else if (e.keyCode === 83) {
			document.querySelector('.c83').classList.add('keydown');
		}
		// delete
		else if (e.keyCode === 8) {
			document.querySelector('.c46').classList.add('keydown');
		}

		// if a note is not displaying 
		if (this.props.pitch === undefined || this.props.pitch === '0') {
			return;
		}

		let note = this.props.pitch;
		
		if (e.keyCode === 190) {
			this.props.dispatch(pressAugmentationDot());
		}

		if (suitableKeyCodes.includes(e.keyCode)) {

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
		let stringedKeyCodeClass;
		if (e.keyCode === 8) {
			stringedKeyCodeClass = '.c46';
		}
		else {
			stringedKeyCodeClass = '.c'+e.keyCode.toString();
		}
		document.querySelector(stringedKeyCodeClass).classList.remove('keydown');
	}

	handleClicks = (e) => {
		// console.log(e.type)
		// this.pressKey(e);
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
	augmentationDotPressed: state.notator.augmentationDotPressed
});

export default connect(mapStateToProps)(HandleNotes);