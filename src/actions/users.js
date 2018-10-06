import {SubmissionError} from 'redux-form';
import {login} from './auth';
import {authError} from './auth';

import {normalizeResponseErrors} from './utils';

const notatorServerURL = 'https://notatorserver.herokuapp.com';

export const registerUser = user => dispatch => {
	return fetch(`${notatorServerURL}/users`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(user)
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => {
			dispatch(login(user));
			return res.json(); 
		})
		.catch(err => {
			dispatch(authError(err.message));
			const {reason, message, location} = err;
			if (reason === 'Validation Error') {
				// Convert Login Errors into SubmissionErrors for Redux Form
				return Promise.reject(
					new SubmissionError({
						[location]: message
					})
				);
			}
		})
		//2nd catch block if reason is validation error
		.catch(err => {
			console.error(err);
		});
};

export const saveUserNotation = userWithNotationString => dispatch => {
	return fetch(`${notatorServerURL}/compositions`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(userWithNotationString)
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.catch(err => {console.error(err)});
};


