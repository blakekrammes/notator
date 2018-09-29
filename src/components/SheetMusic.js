import React, { Component } from 'react';
import {connect} from 'react-redux';
import ABCJS from 'abcjs/midi';
import HandleNotes from '../handleNotes';
import ClefButton from './ClefButton';
import 'font-awesome/css/font-awesome.min.css';
import 'abcjs/abcjs-midi.css';



export class SheetMusic extends Component {

 	componentDidMount() {
 		ABCJS.renderAbc('sheetMusic', this.props.sheetMusic, {});
 	}

 	componentDidUpdate() {
 		ABCJS.renderAbc('sheetMusic', this.props.sheetMusic, {});

 		if (ABCJS.midi.deviceSupportsMidi() && this.props.writtenNotes.length >= 1) {
 			let abcString = this.props.sheetMusic;
 			// ABCJS.renderMidi('midi-controls', abcString);
 			ABCJS.renderMidi('midi-download', abcString, { generateDownload: true, generateInline: true });
 		}
 	}
		
	render() {
		return (
			<div>
				<HandleNotes />
				<ClefButton />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	sheetMusic: state.sheetMusic,
	keyCode: state.keyCode,
	augmentationDotPressed: state.augmentationDotPressed,
	writtenNotes: state.writtenNotes,
	sixteenthNoteCount: state.sixteenthNoteCount
});

export default connect(mapStateToProps)(SheetMusic);
