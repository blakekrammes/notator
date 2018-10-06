import React, { Component } from 'react';
import {connect} from 'react-redux';
import Composition from './Composition';
import {fetchCompositions} from '../actions/protectedData';

let compositionList;

export class MyCompositions extends Component {
	
	componentDidMount() {
		this.props.dispatch(fetchCompositions());
	}

	componentDidUpdate() {
		
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

				return (	
					<Composition id={composition.id} musicTemplate={musicTemplate} key={index} />
				);
			})
		: '';

		return (
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
