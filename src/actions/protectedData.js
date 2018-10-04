import {normalizeResponseErrors} from './utils';

const notatorServerURL = 'https://notatorserver.herokuapp.com';

export const FETCH_COMPOSITIONS_SUCCESS = 'FETCH_COMPOSITIONS_SUCCESS';
export const fetchCompositionsSuccess = data => ({
	type: FETCH_COMPOSITIONS_SUCCESS,
	data
});

export const FETCH_COMPOSITIONS_ERROR = 'FETCH_COMPOSITIONS_ERROR';
export const fetchCompositionsError = error => ({
	type: FETCH_COMPOSITIONS_ERROR,
	error
});

export const fetchCompositions = () => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	return fetch(`${notatorServerURL}/compositions/currentuser`, {
		method: 'GET',
		headers: {
			// Provide our auth token as credentials
			Authorization: `Bearer ${authToken}`
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then((data) => dispatch(fetchCompositionsSuccess(data)))
		.catch(err => {
			dispatch(fetchCompositionsError(err));
		});
};
