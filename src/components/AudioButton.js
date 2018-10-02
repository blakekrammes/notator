import React, { Component } from 'react';
import {connect} from 'react-redux';
import Pitchfinder from 'pitchfinder';
import Pitch from './pitch';
import {changePitch} from '../actions';
import notes from '../noteList';
import './audioButton.css';

export class AudioButton extends Component {
	toggleInput() {

		let constraints = {audio: true};

		navigator.mediaDevices.getUserMedia(constraints)
		.then(stream => {

			let audioContext = new AudioContext();

			let source = audioContext.createMediaStreamSource(stream);

			let processor = audioContext.createScriptProcessor(4096, 1, 1);

			//audio pipeline
			source.connect(processor);
			processor.connect(audioContext.destination);

			//fires whenever the audio buffer defined in processor fills up
    		processor.onaudioprocess = (e) => {
    			let buffer = e.inputBuffer;
		     	let detectPitch = Pitchfinder.YIN();
		     	let float32Array = buffer.getChannelData(0); // get a single channel of sound
				let pitch = Math.round(detectPitch(float32Array)); // null if pitch cannot be identified
				let matchedPitch = notes.find(note => {
					let individualNoteRange = [];
					for (let i = note.hz.min; i <= note.hz.max; i++) {
    					individualNoteRange.push(i);
    				}
    				if (individualNoteRange.includes(pitch)) {
    					return note.name;
    				}
				});
				if (matchedPitch && matchedPitch.name !== undefined) {
					this.props.dispatch(changePitch(matchedPitch.name));
				}
				else {
					//if pitchfinder can't ID the note, set it back to default
					this.props.dispatch(changePitch('0'));
				}
		    };
		})
		.catch(err => {
			alert(err);
		});	
	}
	render() {
		return (
			<div>
				<button className="input-button" onClick={() => this.toggleInput()}>use live input</button>
				<Pitch />
			</div>
		);
	}
}

export default connect()(AudioButton);














