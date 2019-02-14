import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeClef, updateMusic } from '../actions';
import './css/ClefButton.css';

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
		if (this.props.clef === 'treble') {
			return (
				<button className="clef-button home-buttons" onClick={() => this.switchClef()}><img src="bass-clef.png" alt="bass-clef" className="clef-icon"/></button>
			);
		}
		else {
			return (
				<button className="clef-button home-buttons" onClick={() => this.switchClef()}><img src="treble-clef.png" alt="treble-clef" className="clef-icon"/></button>
			);
		}
	}
}

const mapStateToProps = state => ({
	clef: state.notator.clef
});

export default connect(mapStateToProps)(ClefButton);