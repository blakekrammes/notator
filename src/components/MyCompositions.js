import React, { Component } from 'react';
import {connect} from 'react-redux';
import Composition from './Composition';
import {fetchCompositions} from '../actions/protectedData';
import {Redirect} from 'react-router-dom';

export class MyCompositions extends Component {
	
	componentDidMount() {
		if (this.props.demo === false && this.props.authToken !== null) {
			this.props.dispatch(fetchCompositions());
		}
	}

	render() {

		let compositionList;

		if (this.props.demo === false && this.props.authToken === null) {
			return <Redirect to="/" />;
		}

		else if (this.props.demo === true) {

			compositionList = this.props.demoNotation.map((composition, index) => {
				let musicTemplate = 
				  	`T: ${composition.title}\n` +
				  	`M: ${composition.timeSignature}\n` +
				  	`L: ${composition.baseNoteValue}\n` +
					`K: ${composition.key} clef=${composition.clef}\n` +
				 	`${composition.music}`;

			 	return (	
					<Composition id={index + 3 * 5} title={composition.title} musicTemplate={musicTemplate} key={index} />
				);
			})
		}

		else {
			compositionList = this.props.data !== ''

			? this.props.data.compositions.map((composition, index) => {

					let musicTemplate = 
					  	`T: ${composition.title}\n` +
					  	`M: ${composition.timeSignature}\n` +
					  	`L: ${composition.baseNoteValue}\n` +
						`K: ${composition.key} clef=${composition.clef}\n` +
					 	`${composition.music}`;

					return (	
						<Composition id={composition.id} musicTemplate={musicTemplate} key={index} />
					);
				})
			: '';
		}
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
	authToken: state.auth.authToken,
	currentUser: state.auth.currentUser,
	data: state.protectedData.data,
	demo: state.auth.demo,
	demoNotation: state.singer.demoNotation
});

export default connect(mapStateToProps)(MyCompositions);
