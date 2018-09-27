import React, { Component } from 'react';
import {connect} from 'react-redux';
import ABCJS from 'abcjs/midi';

export class SheetMusic extends Component {
		
	render() {

		document.addEventListener('keydown', doThis);
		document.addEventListener('keyup', doThat);

		function doThis(e) {
			console.log(e.keyCode);
		}

		function doThat(e) {
			console.log(e.keyCode);
		}

		ABCJS.renderAbc('sheetMusic', this.props.sheetMusic);
		return (
			<div>

			</div>
		);
	}
}

let music = "T: Composition\n" +
		"M: 4/4\n" +
		"L: 2/8\n" +
		"K: Cmaj\n" +
		`|`;

SheetMusic.defaultProps = ({
	sheetMusic: music
});

const mapStateToProps = state => ({
	sheetMusic: state.sheetMusic,
	keyCode: state.keyCode,
	augmentationDotPressed: state.augmentationDotPressed,
	writtenNotes: state.writtenNotes,
	sixteenthNoteCount: state.sixteenthNoteCount
});

export default connect(mapStateToProps)(SheetMusic);
