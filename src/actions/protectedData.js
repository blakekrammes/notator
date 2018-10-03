import {normalizeResponseErrors} from './utils';

const herokuAPIURL = 'https://still-wave-85687.herokuapp.com';

export const FETCH_PROTECTED_DATA_SUCCESS = 'FETCH_PROTECTED_DATA_SUCCESS';
export const fetchProtectedDataSuccess = data => ({
	type: FETCH_PROTECTED_DATA_SUCCESS,
	data
});

export const FETCH_PROTECTED_DATA_ERROR = 'FETCH_PROTECTED_DATA_ERROR';
export const fetchProtectedDataError = error => ({
	type: FETCH_PROTECTED_DATA_ERROR,
	error
});

export const fetchProtectedData = () => (dispatch, getState) => {
	const authToken = getState().auth.authToken;
	return fetch(`${herokuAPIURL}/compositions/currentuser`, {
		method: 'GET',
		headers: {
			// Provide our auth token as credentials
			Authorization: `Bearer ${authToken}`
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(({data}) => dispatch(fetchProtectedDataSuccess(data)))
		.catch(err => {
			dispatch(fetchProtectedDataError(err));
		});
};
