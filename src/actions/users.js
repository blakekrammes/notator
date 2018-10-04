import {SubmissionError} from 'redux-form';

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


export const deleteComposition = compositionID => dispatch => {
	return fetch(`${notatorServerURL}/compositions/${compositionID}`, {
		method: 'DELETE'
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.catch(err => {console.error(err)});
};

