import React, { Component } from 'react';
import {connect} from 'react-redux';
import ABCJS from 'abcjs/midi';
import HandleNotes from '../handleNotes';
import ClefButton from './ClefButton';
import {saveUserNotation} from '../actions/users';
import 'font-awesome/css/font-awesome.min.css';
import 'abcjs/abcjs-midi.css';

let sheetMusicJSX = (
		<div>
			<HandleNotes />
			<ClefButton />
		</div>
);

export class SheetMusic extends Component {

	saveNotation() {
		this.props.dispatch(saveUserNotation(this.props.sheetMusic));
	}

 	componentDidMount() {
 		ABCJS.renderAbc('sheetMusic', this.props.sheetMusic, {});
 	}

 	componentDidUpdate() {
 		ABCJS.renderAbc('sheetMusic', this.props.sheetMusic, {});

 		if (ABCJS.midi.deviceSupportsMidi() && this.props.writtenNotes !== undefined && this.props.writtenNotes.length >= 1) {
 			let abcString = this.props.sheetMusic;
 			// ABCJS.renderMidi('midi-controls', abcString);
 			ABCJS.renderMidi('midi-download', abcString, { 
 				generateDownload: true, 
 				generateInline: true,
 			});
 		}

 		if (this.props.writtenNotes.length >= 1 && this.props.authToken !== null) {
 			sheetMusicJSX = ( 
	 			<div>
			    	<HandleNotes />
			    	<ClefButton />
			    	<a href="" onClick={() => this.saveNotation()}>Save</a>
		        </div> 
	        );
 		}
 	}

 	componentWillUnmount() {
 		//clear the music upon unmount
 		ABCJS.renderAbc('sheetMusic', '', {});
 	}
		
	render() {
		return sheetMusicJSX;
	}
}

const mapStateToProps = state => ({
	sheetMusic: state.singer.sheetMusic,
	keyCode: state.singer.keyCode,
	augmentationDotPressed: state.singer.augmentationDotPressed,
	writtenNotes: state.singer.writtenNotes,
	sixteenthNoteCount: state.singer.sixteenthNoteCount,
	authToken: state.auth.authToken
});

export default connect(mapStateToProps)(SheetMusic);
