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

// the parameter here is just for testing purposes
export const fetchCompositions = (passedAuthToken) => (dispatch, getState) => {
	let authToken;
	if (!passedAuthToken) {
		authToken = getState().auth.authToken;
	}
	else {
		authToken = passedAuthToken;
	}

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


export const DELETE_COMPOSITION_SUCCESS = 'DELETE_COMPOSITION_SUCCESS';
export const deleteCompositionSuccess = id => ({
	type: DELETE_COMPOSITION_SUCCESS,
	id
});


export const deleteComposition = compositionID => dispatch => {
	return fetch(`${notatorServerURL}/compositions/${compositionID}`, {
		method: 'DELETE'
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => dispatch(deleteCompositionSuccess(compositionID)))
		.catch(err => console.error(err));
};
