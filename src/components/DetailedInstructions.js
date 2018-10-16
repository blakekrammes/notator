import React, { Component } from 'react';
import './DetailedInstructions.css';

export default class DetailedInstructions extends Component {
	render() {     
		return (
			<div className="detailed-instructions-div">
				<div className="main-instructions">
					<h3>1. to begin, click 'Use live input'</h3>
					<h3>2. play or sing into the microphone</h3>
					<h3>3. while a note displays, press the relevant keyboard key to write it</h3>
				</div>
				<ul className="detailed-instructions-list">
					<li>for whole notes, press w</li>
					<li>for quarter notes, press q</li>
					<li>for half notes, press h</li>
					<li>for eighth notes, press e</li>
					<li>for sixteenth notes, press s</li>
					<li>for dotted notes, first press . then press the base note value's letter (up to dotted eighths)</li>
					<li>to delete notes one at a time, press d</li>
				</ul>
				<h3>4. after writing notes, you can play back or download the <a target="_blank" href="https://en.wikipedia.org/wiki/MIDI">MIDI</a></h3>
				<h3>5. if you have an account, you can click the 'Save' link to have Notator save your composition</h3>
				<h3>also, you cannot write notes if they won't fit in the measure</h3>
				<h3>for example, if the time signature is 4/4 you cannot add a whole note to a measure that already contains a quarter note</h3>
			</div>
		);
	}
};