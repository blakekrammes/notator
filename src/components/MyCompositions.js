import React, { Component } from 'react';
import {connect} from 'react-redux';
import ABCJS from 'abcjs/midi';
import {fetchCompositions} from '../actions/protectedData';
import 'font-awesome/css/font-awesome.min.css';
import 'abcjs/abcjs-midi.css';

let compositionList;

export class MyCompositions extends Component {
	// constructor() {
	// 	super();
	// 	this.ref = React.createRef();
	// }

	
	componentDidMount() {
		this.props.dispatch(fetchCompositions());
	}

	componentDidUpdate() {
		

		let musicTemplate = 
		  "T: Composition\n" +
		  "M: 4/4\n" +
		  "L: 2/8\n" +
		  `K: CMaj clef=${this.props.clef}\n` +
		  '';
	}

	render() {

		let compositionList = (this.props.data !== '') 

		? this.props.data.compositions.map((composition, index) => {
				let musicTemplate = 
				  	`T: ${composition.title}\n` +
				  	"M: 4/4\n" +
				  	"L: 2/8\n" +
					`K: CMaj clef=treble\n` +
				 	`${composition.music}`;
				let newMusicDiv = document.createElement('div');

				ABCJS.renderAbc(newMusicDiv, musicTemplate);

				document.getElementById('root').append(newMusicDiv);
				newMusicDiv.prepend(composition.creation);

				let newMusicMIDI = document.createElement('div');

				newMusicDiv.parentNode.insertBefore(newMusicMIDI, newMusicDiv.nextSibling);

				ABCJS.renderMidi(newMusicMIDI, musicTemplate, { 
 					generateDownload: true, 
 					generateInline: true,
 				});

				return (
					<div key={index}>
					</div>
				);
			})
		: '';

		return (
			//for now, render nothing as ABCJS is directly manipulating the dom
			<div>
				{compositionList}
			</div>
		);
	}
}

MyCompositions.defaultProps = ({
	data: ''
});

const mapStateToProps = state => ({
	data: state.protectedData.data
});

export default connect(mapStateToProps)(MyCompositions);
