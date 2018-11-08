import React, { Component } from 'react';
import {connect} from 'react-redux';
import {deleteComposition} from '../actions/protectedData';
import {deleteDemoNotation} from '../actions/index';
import ABCJS from 'abcjs/midi';
import 'font-awesome/css/font-awesome.min.css';
import 'abcjs/abcjs-midi.css';
import './Composition.css';

export class Composition extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	componentDidMount() {
		const abc = document.querySelector(`#abcdiv${this.props.id} > .musicDiv`);

		const abcMidi = document.querySelector(`#abcdiv${this.props.id} > .midiDiv`);

		ABCJS.renderAbc(abc, this.props.musicTemplate, {
			responsive: 'resize'
		});

		ABCJS.renderMidi(abcMidi, this.props.musicTemplate, { 
 			generateDownload: true, 
 			generateInline: true,
 			responsive: 'resize'
 		});
	}

	componentDidUpdate() {
		const abc = document.querySelector(`#abcdiv${this.props.id} > .musicDiv`);

		const abcMidi = document.querySelector(`#abcdiv${this.props.id} > .midiDiv`);

		ABCJS.renderAbc(abc, this.props.musicTemplate, {
			responsive: 'resize'
		});

		ABCJS.renderMidi(abcMidi, this.props.musicTemplate, { 
 			generateDownload: true, 
 			generateInline: true,
 			responsive: 'resize'
 		});
	}

	handleDelete(e) {
		let confirmDelete = window.confirm('Do you want to delete this composition?');
        if (confirmDelete === true) { 

        	if (this.props.demo === true) {
        		this.props.dispatch(deleteDemoNotation(this.props.title));
        	}

        	else {
        		this.props.dispatch(deleteComposition(this.props.id));
        	}
        }
	}

	render() {
		return(
			<div key={this.props.id} id={`abcdiv${this.props.id}`}>
				<div className="musicDiv"></div>
				<div className="midiDiv"></div>
				<button className="delete-button" onClick={(e) => this.handleDelete(e)}>Delete</button>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	demo: state.auth.demo
});

export default connect(mapStateToProps)(Composition);
