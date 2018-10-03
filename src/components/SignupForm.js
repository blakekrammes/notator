import React, { Component } from 'react';
// import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {registerUser} from '../actions/users';
import './SignupForm.css';

export class SignupForm extends Component {
	onSubmit(values) {
		console.log(values);
		this.props.dispatch(registerUser(values));
	}
	render() {
		return (
			<form className="signup-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				<label htmlFor="signup-username">Username</label>
				<Field className="signup-input" name="username" id="signup-username" type="text" component="input" required />
				<label htmlFor="signup-email">Email</label>
				<Field className="signup-input" name="email" id="signup-email" type="email" component="input" required />
				<label htmlFor="signup-password">Password</label>
				<Field className="signup-input" name="password" id="signup-password" type="password" component="input" required />
				<button className="signup-button" type="submit">Signup</button>
			</form>
		);
	}
}

export default reduxForm({
	form: 'signup'
})(SignupForm);