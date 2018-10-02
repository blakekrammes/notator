import React, { Component } from 'react';
// import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {createUser} from '../actions';

export class SignupForm extends Component {
	onSubmit(values) {
		console.log(values);
		this.props.dispatch(createUser(values));
	}
	render() {
		return (
			<form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				<label htmlFor="signup-username">Username</label>
				<Field name="username" id="signup-username" type="text" component="input" required />
				<label htmlFor="signup-email">Email</label>
				<Field name="email" id="signup-email" type="email" component="input" required />
				<label htmlFor="signup-password">Password</label>
				<Field name="password" id="signup-password" type="password" component="input" required />
				<button type="submit">Signup</button>
			</form>
		);
	}
}

export default reduxForm({
	form: 'signup'
})(SignupForm);