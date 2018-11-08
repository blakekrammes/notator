import reducer from './auth';
import {
	setAuthToken,
	clearAuth,
	authRequest,
	authSuccess,
	authError,
	loading
} from '../actions/auth';

describe('authReducer', () => {


	it('should set the initial state when nothing is passed', () => {
		const state = reducer(undefined, {type: '__UNKNOWN'});
		expect(state).toEqual({
			authToken: null,
			currentUser: null,
			loading: false,
			error: null,
			demo: false
		});
	});

	it('Should return the current state on an unknown action', () => {
        let currentState = {};
        const state = reducer(currentState, {type: '__UNKNOWN'});
        expect(state).toBe(currentState);
    });


	describe('setAuthToken', () => {
		it('should set the authToken', () => {
			let state;
			let authToken = 'agkjb4348vbsk34uyahfkul2yvfsk38';
			state = reducer(state, setAuthToken(authToken));
			expect(state.authToken).toEqual(authToken);
		});
	});

	describe('clearAuth', () => {
		it('should clear the authToken', () => {
			let state;
			state = reducer(state, clearAuth());
			expect(state.authToken).toEqual(null);
		});
	});

	describe('authRequest', () => {
		it('should register an authentication request', () => {
			let state;
			state = reducer(state, authRequest());
			expect(state.loading).toEqual(true);
			expect(state.error).toEqual(null);
		});
	});

	describe('authSuccess', () => {
		it('should display current user on successful authentication', () => {
			let state;
			let currentUser = {
				username: 'sherlock',
				email: 'sholmes@gmail.com'
			};
			state = reducer(state, authSuccess(currentUser));
			expect(state.currentUser).toEqual(currentUser);
		});
	});

	describe('authError', () => {
		it('should display error on failed authentication', () => {
			let state;
			let error = 'noooooooooooo';
			state = reducer(state, authError(error));
			expect(state.error).toEqual(error);
		});
	});

	describe('loading', () => {
		it('should display loading when the laoding action in dispatched', () => {
			let state;
			state = reducer(state, loading());
			expect(state.loading).toEqual(true);
		});
	});
});