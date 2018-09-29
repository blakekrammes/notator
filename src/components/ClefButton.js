import React, { Component } from 'react';
import {connect} from 'react-redux';
import {changeClef, updateMusic} from '../actions';
import './ClefButton.css';

export class ClefButton extends Component {
	
	switchClef() {
		if (this.props.clef === 'treble') {
			this.props.dispatch(changeClef('bass'));
			this.props.dispatch(updateMusic());

		}
		else {
			this.props.dispatch(changeClef('treble'));
			this.props.dispatch(updateMusic());
		}
	}

	render() {
		return (
			<button className="clef-button" onClick={() => this.switchClef()}>Change Clefs</button>
		);
	}
}

const mapStateToProps = state => ({
	clef: state.clef
});

export default connect(mapStateToProps)(ClefButton);