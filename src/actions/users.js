import {SubmissionError} from 'redux-form';

import {normalizeResponseErrors} from './utils';

const herokuAPIURL = 'https://still-wave-85687.herokuapp.com';

export const registerUser = user => dispatch => {
	return fetch(`${herokuAPIURL}/users`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(user)
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.catch(err => {
			const {reason, message, location} = err;
			if (reason === 'Login Error') {
				// Convert Login Errors into SubmissionErrors for Redux Form
				return Promise.reject(
					new SubmissionError({
						[location]: message
					})
				);
			}
		});
};

export const saveUserNotation = notation => dispatch => {
	return fetch(`${herokuAPIURL}/compositions`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(notation)
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.catch(err => {console.error(err)});
};