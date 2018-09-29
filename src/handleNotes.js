import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addNote, deleteNote, pressAugmentationDot, releaseAugmentationDot, changeSixteenthNoteCount, changeSheetMusic} from './actions';

export class HandleNotes extends Component {
	// constructor() {
	// 	super();
	// }

	componentDidMount() {
		document.addEventListener('keydown', this.pressKey);
		document.addEventListener('keyup', this.releaseKey);
	}

	pressKey = (e) => {

	  // delete handling for notes
	  if (e.keyCode === 68 && this.props.writtenNotes.length >= 1) {
  	    
	    let length = this.props.writtenNotes.length;

	    //if last entry was a barline
	    if (this.props.writtenNotes[length - 1] === '|') {
	      this.props.dispatch(changeSixteenthNoteCount(16));
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
	    //if last entry was a quarter note
	    else if (this.props.writtenNotes[length - 1].length === 1) {
	    	this.props.dispatch(changeSixteenthNoteCount(this.props.sixteenthNoteCount - 4));
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
	    this.props.dispatch(deleteNote());
	    // you may need this to refresh the music
	    // this.writeABCNotation('');
	  }


	  if (this.props.pitch === undefined || this.props.pitch === '0') {
	  	return;
	  }

	  let note = this.props.pitch;
	  
	  const suitableKeyCodes = [81, 69, 72, 87, 83, 190, 68];

	  if (e.keyCode === 190) {
	  	this.props.dispatch(pressAugmentationDot());
	  }

	  if (suitableKeyCodes.includes(e.keyCode)) {

		let filteredNote;

		if (note[1] !== '#') {

			//high pitches
			if (parseInt(note[1], 10) >= 5) {
			  filteredNote = note[0].toLowerCase();
			}
			//low pitches
			else if (parseInt(note[1], 10) <= 3) {
			  //commas are used to designate lower octave
			  let lowNote = `${note[0]},`;
			  filteredNote = `${lowNote}`;
			}
			//mid-range pitches
			else {
			  filteredNote = note[0];
			}
		}

		else if (note[1] === '#') {

			let regexOfHash = /#/;
			let noHashNote = note.replace(regexOfHash, '');

			//high pitches
			if (parseInt(noHashNote[1], 10) >= 5) {
			  filteredNote = `^${noHashNote[0].toLowerCase()}`;
			}
			//low pitches
			else if (parseInt(noHashNote[1], 10) <= 3) {
			  //commas are used to designate lower octave
			  let lowNote = `${noHashNote[0]},`;
			  filteredNote = `^${lowNote}`;
			  console.log(filteredNote)
			}
			//mid-range pitches
			else {
			  filteredNote = `^${noHashNote[0]}`;
			} 
		}

	    //dotted notes
	    if (this.props.augmentationDotPressed === true && e.keyCode !== 190) {

	      // //dotted whole 
	      // if (e.keyCode === 87) {
	      // 	this.assignABCNotation(`${note[0]}5`);
	      // 	console.log('I say!')
	      // }
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
	    if (this.props.sixteenthNoteCount !== 0 && this.props.sixteenthNoteCount !== 16) {
	      return;
	    }

	    else if (this.props.sixteenthNoteCount === 16) {
	      this.props.dispatch(addNote('|'));
	      this.props.dispatch(changeSixteenthNoteCount(0));
	    }
	    this.props.dispatch(addNote(noteToBeWritten));
	    notesToDisplay = this.props.writtenNotes.join('');
	    this.props.dispatch(changeSixteenthNoteCount(this.props.sixteenthNoteCount + 16));
	  }

	  //if dotted half
	  else if (noteToBeWritten.includes('3') && !noteToBeWritten.includes('/')) {
	    if (this.props.sixteenthNoteCount > 4 && this.props.sixteenthNoteCount < 16) { 
	      return;
	    }
	    else if (this.propssixteenthNoteCount === 16) {
	      this.props.dispatch(addNote('|'));
	      this.props.dispatch(changeSixteenthNoteCount(0));
	    }
	    this.props.dispatch(addNote(noteToBeWritten));
	    notesToDisplay = this.props.writtenNotes.join('');
	    this.props.dispatch(changeSixteenthNoteCount(this.props.sixteenthNoteCount + 12));
	  }

	  //if half note
	  else if (noteToBeWritten.includes('2') && !noteToBeWritten.includes('/')) {
	    if (this.props.sixteenthNoteCount > 8 && this.props.sixteenthNoteCount < 16) { 
	      return;
	    }
	    else if (this.props.sixteenthNoteCount === 16) {
	      this.props.dispatch(addNote('|'));
	      this.props.dispatch(changeSixteenthNoteCount(0));
	    }
	    this.props.dispatch(addNote(noteToBeWritten));
	    notesToDisplay = this.props.writtenNotes.join('');
	    this.props.dispatch(changeSixteenthNoteCount(this.props.sixteenthNoteCount + 8));
	  }

	  //if dotted quarter
	  else if (noteToBeWritten.includes('3/') && !noteToBeWritten.includes('//')) {
	    if (this.props.sixteenthNoteCount > 10 && this.props.sixteenthNoteCount < 16) { 
	      return;
	    }
	    else if (this.props.sixteenthNoteCount === 16) {
	      this.props.dispatch(addNote('|'));
	      this.props.dispatch(changeSixteenthNoteCount(0));
	    }
	    this.props.dispatch(addNote(noteToBeWritten));
	    notesToDisplay = this.props.writtenNotes.join('');
	    this.props.dispatch(changeSixteenthNoteCount(this.props.sixteenthNoteCount + 6));
	  }

	  //if dotted eigth
	  else if (noteToBeWritten.includes('3//')) {
	    if (this.props.sixteenthNoteCount > 13 && this.props.sixteenthNoteCount < 16) { 
	      return;
	    }
	    else if (this.props.sixteenthNoteCount === 16) {
			this.props.dispatch(addNote('|'));	      
			this.props.dispatch(changeSixteenthNoteCount(0));
	    }
	    this.props.dispatch(addNote(noteToBeWritten));
	    notesToDisplay = this.props.writtenNotes.join('');
	    this.props.dispatch(changeSixteenthNoteCount(this.props.sixteenthNoteCount + 3));
	  }

	  //if eighth note
	  else if (noteToBeWritten.includes('/2')) {
	    if (this.props.sixteenthNoteCount > 14 && this.props.sixteenthNoteCount < 16) { 
	      return;
	    }
	    else if (this.props.sixteenthNoteCount === 16) {
	      this.props.dispatch(addNote('|'));
	      this.props.dispatch(changeSixteenthNoteCount(0));
	    }
	    this.props.dispatch(addNote(noteToBeWritten));
	    notesToDisplay = this.props.writtenNotes.join('');
	    this.props.dispatch(changeSixteenthNoteCount(this.props.sixteenthNoteCount + 2));
	  }

	  //if sixteenth note
	  else if (noteToBeWritten.includes('/4')) {
	    if (this.props.sixteenthNoteCount > 15 && this.props.sixteenthNoteCount < 16) { 
	      return;
	    }
	    else if (this.props.sixteenthNoteCount === 16) {
	      this.props.writtenNotes.push('|');
	      this.props.dispatch(changeSixteenthNoteCount(0));
	    }
	    this.props.dispatch(addNote(noteToBeWritten));
	    notesToDisplay = this.props.writtenNotes.join('');
	    this.props.dispatch(changeSixteenthNoteCount(this.props.sixteenthNoteCount + 1));
	  }

	  //if quarter note
	  else {
	    if (this.props.sixteenthNoteCount > 12 && this.props.sixteenthNoteCount < 16) { 
	      return;
	    }
	    else if (this.props.sixteenthNoteCount === 16) {
	      this.props.writtenNotes.push('|');
	      this.props.dispatch(changeSixteenthNoteCount(0));
	    }
	    this.props.dispatch(addNote(noteToBeWritten));
	    notesToDisplay = this.props.writtenNotes.join('');
	    this.props.dispatch(changeSixteenthNoteCount(this.props.sixteenthNoteCount + 4));
	  }
    
	  let music = 
	  "T: Composition\n" +
	  "M: 4/4\n" +
	  "L: 2/8\n" +
	  `K: CMaj clef=${this.props.clef}\n` +
	  `|${notesToDisplay}`;
	 
	 this.props.dispatch(changeSheetMusic(music));

	}

	releaseKey = (e) => {
		if (this.props.augmentationDotPressed === true) {
			this.props.dispatch(releaseAugmentationDot());
		}
	}

	render() {
		return (
			<div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	pitch: state.pitch,
	sheetMusic: state.sheetMusic,
	keyCode: state.keyCode,
	augmentationDotPressed: state.augmentationDotPressed,
	writtenNotes: state.writtenNotes,
	sixteenthNoteCount: state.sixteenthNoteCount,
	clef: state.clef
});

export default connect(mapStateToProps)(HandleNotes);


