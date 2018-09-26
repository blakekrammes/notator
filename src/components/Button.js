import React, { Component } from 'react';
import {connect} from 'react-redux';
import Pitchfinder from 'pitchfinder';
import Pitch from './Pitch';
import {changePitch} from '../actions';
import './Button.css';

export class Button extends Component {
	toggleInput() {

		let constraints = {audio: true};

		navigator.mediaDevices.getUserMedia(constraints)
		.then(stream => {

			let audioContext = new AudioContext();
			let source = audioContext.createMediaStreamSource(stream);

			let processor = audioContext.createScriptProcessor(4096, 1, 1);

			// console.log(processor.bufferSize);

			source.connect(processor);
    		processor.connect(audioContext.destination);

    		processor.onaudioprocess = (e) => {

    			let buffer = e.inputBuffer;
		     	const detectPitch = Pitchfinder.YIN();
		     	const float32Array = buffer.getChannelData(0); // get a single channel of sound
				const pitch = detectPitch(float32Array); // null if pitch cannot be identified
				this.props.dispatch(changePitch(pitch));
		    };
		})
		.catch(function(err) {
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














