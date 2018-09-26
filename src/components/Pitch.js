import React, { Component } from 'react';
import {connect} from 'react-redux';

export class Pitch extends Component {
	render() {
		return (
			<p>{this.props.pitch}</p>
		);
	}
}

const mapStateToProps = state => (

	console.log(state.pitch),

{
	pitch: state.pitch
}

);

export default connect(mapStateToProps)(Pitch);