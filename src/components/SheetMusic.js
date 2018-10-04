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
		let titleText;
		let title = prompt('What would you like to title your composition?');
		if (title === null || title === '') {
			titleText = 'Composition';
		}
		else {
			titleText = title;
		}

		let date = new Date();
    	let dateString = date.toString();
    	let truncatedDateString = dateString.substring(0, dateString.length -36);

    	let justNotationString = this.props.sheetMusic.substring(this.props.sheetMusic.indexOf('|') + 1);

    	justNotationString = `|${justNotationString}|`;

		const userInfoWithNotationString = {
			username: this.props.currentUser.username,
			title: titleText,
			music: justNotationString,
			creation: truncatedDateString
		}
		this.props.dispatch(saveUserNotation(userInfoWithNotationString));
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
	authToken: state.auth.authToken,
	currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(SheetMusic);
