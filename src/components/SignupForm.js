import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { registerUser } from '../actions/users';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { loading } from '../actions/auth';
import { ResizeSpinLoader } from 'react-css-loaders';
import './css/SignupForm.css';

export class SignupForm extends Component {
	onSubmit(values) {
		this.props.dispatch(registerUser(values));
		this.props.dispatch(loading());
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
		else if (this.props.loading === true) {
			return <ResizeSpinLoader background="rgba(244,243,242,1)"/>;
		}
		else {
			return (
				<div>
					<h1 className="main-title"><Link to="/">Notator</Link></h1>
					<form className="signup-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
						{error}
						<label htmlFor="signup-username">Username</label>
						<Field className="signup-input" name="username" id="signup-username" type="text" component="input" autoFocus required />
						<label htmlFor="signup-email">Email</label>
						<Field className="signup-input" name="email" id="signup-email" type="email" component="input" required />
						<label htmlFor="signup-password">Password</label>
						<Field className="signup-input" name="password" id="signup-password" type="password" component="input" required />
						<button className="signup-button" type="submit">Signup</button>
						<p className="account-status"><Link to="/login">Login instead?</Link></p>
					</form>
				</div>
			);
		}
	}
}

const mapStateToProps = state => ({
	currentUser: state.auth.currentUser,
	error: state.auth.error,
	loading: state.auth.loading
});

let ConnectedSignupForm = connect(mapStateToProps)(SignupForm);

export default reduxForm({
	form: 'signup'
})(ConnectedSignupForm);