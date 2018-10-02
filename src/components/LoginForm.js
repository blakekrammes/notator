import React, { Component } from 'react';
// import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';

export class LoginForm extends Component {
	onSubmit(values) {
		console.log(values);
	}
	render() {
		return (
			<form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				<label htmlFor="login-username">Username</label>
				<Field name="username" id="login-username" type="text" component="input" />
				<label htmlFor="login-password">password</label>
				<Field name="password" id="login-password" type="password" component="input" />
				<button type="submit">Login</button>
			</form>
		);
	}
}

export default reduxForm({
	form: 'login'
})(LoginForm);