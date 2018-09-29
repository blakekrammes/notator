import React, { Component } from 'react';
import {connect} from 'react-redux';
import ABCJS from 'abcjs/midi';
import HandleNotes from '../handleNotes';
import ClefButton from './ClefButton';



export class SheetMusic extends Component {

 	componentDidMount() {
 		ABCJS.renderAbc('sheetMusic', this.props.sheetMusic);
 	}

 	componentDidUpdate() {
 		ABCJS.renderAbc('sheetMusic', this.props.sheetMusic);
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
