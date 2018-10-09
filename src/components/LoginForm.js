import React, { Component } from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, focus} from 'redux-form';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';
import {Redirect} from 'react-router';
import './LoginForm.css';

export class LoginForm extends Component {
	onSubmit(values) {
		this.props.dispatch(login(values));
	}
	render() {
		let error;
		if (this.props.error) {
			error = (
				<div className="login-error">
					{this.props.error}
				</div>
			);
		}
		if (this.props.currentUser !== null) {
				return <Redirect to="/"/>;
			}
		else {	
			return (
				<form className="login-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
					{error}
					<label htmlFor="login-username">Username</label>
					<Field className="login-input" name="username" id="login-username" type="text" component="input" validate={[required, nonEmpty]} />
					<label htmlFor="login-password">Password</label>
					<Field className="login-input" name="password" id="login-password" type="password" component="input" validate={[required, nonEmpty]} />
					<button className="login-button" type="submit">Login</button>
				</form>
			);
		}
	}
}

const mapStateToProps = state => ({
	currentUser: state.auth.currentUser,
	error: state.auth.error
});

LoginForm = connect(mapStateToProps)(LoginForm);

export default reduxForm({
	form: 'login',
	onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);




