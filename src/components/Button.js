import React, { Component } from 'react';
import {connect} from 'react-redux';
import Pitchfinder from 'pitchfinder';
import Pitch from './Pitch';
import {changePitch} from '../actions';
import './Button.css';



let notes = [
	{
		name: 'C4',
		hz: {
			min: 255,
			max: 269
		}
	},
	{
		name: 'C#4',
		hz: {
			min: 270,
			max: 285
		}
	},
	{
		name: 'D4',
		hz: {
			min: 286,
			max: 302
		}
	},
	{
		name: 'D#4',
		hz: {
			min: 303,
			max: 320
		}
	},
	{
		name: 'E4',
		hz: {
			min: 321,
			max: 339
		}
	},
	{
		name: 'F4',
		hz: {
			min: 340,
			max: 360
		}
	},
	{
		name: 'F#4',
		hz: {
			min: 361,
			max: 381
		}
	},
	{
		name: 'G4',
		hz: {
			min: 382,
			max: 404
		}
	},
	{
		name: 'G#4',
		hz: {
			min: 405,
			max: 428
		}
	},
	{
		name: 'A4',
		hz: {
			min: 429,
			max: 453
		}
	},
	{
		name: 'A#4',
		hz: {
			min: 454,
			max: 480
		}
	},
	{
		name: 'B4',
		hz: {
			min: 481,
			max: 509
		}
	},
	{
		name: 'C5',
		hz: {
			min: 510,
			max: 539
		}
	}
]; 



export class Button extends Component {
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

				let matchedPitch = notes.find(function(note) {

					let individualNoteRange = [];
					
					for (let i = note.hz.min; i <= note.hz.max; i++) {
    					individualNoteRange.push(i);
    				}

    				if (individualNoteRange.includes(pitch)) {
    					return note.name;
    				}

    				else {
    					return;
    				}

				});
				// console.log(matchedPitch.name);
				if (matchedPitch && matchedPitch.name !== undefined) {
					console.log(matchedPitch.name);
					this.props.dispatch(changePitch(matchedPitch.name));
				}
				else {
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
				<button className="input-button" onClick={this.toggleInput.bind(this)}>use live input</button>
				<Pitch />
			</div>
		);
	}
}

export default connect()(Button);














