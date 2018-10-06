import React, { Component } from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {registerUser} from '../actions/users';
import {Redirect} from 'react-router';
import './SignupForm.css';

export class SignupForm extends Component {
	onSubmit(values) {
		this.props.dispatch(registerUser(values));
	}

	render() {
		let error;
		if (this.props.error) {
			error = (
				<div className="signup-error">
					{this.props.error}
				</div>
			);
		}
		if (this.props.currentUser !== null) {
				return <Redirect to="/"/>;
			}
		else {
			return (

				<form className="signup-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
					{error}
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
}

const mapStateToProps = state => ({
	currentUser: state.auth.currentUser,
	error: state.auth.error
});

SignupForm = connect(mapStateToProps)(SignupForm);

export default reduxForm({
	form: 'signup'
})(SignupForm);