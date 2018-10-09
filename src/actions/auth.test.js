import {
	SET_AUTH_TOKEN,
	setAuthToken,
	CLEAR_AUTH,
	clearAuth,
	AUTH_REQUEST,
	authRequest,
	AUTH_SUCCESS,
	authSuccess,
	AUTH_ERROR,
	authError,
	login,
	refreshAuthToken
} from './auth';

describe('setAuthToken', () => {
	it('should return the action', () => {
		const authToken = '1593059htsafjn23454jsdfs';
		const action = setAuthToken(authToken);
		expect(action.type).toEqual(SET_AUTH_TOKEN);
		expect(action.authToken).toEqual(authToken);
	});
});

describe('clearAuth', () => {
	it('should return the action', () => {
		const action = clearAuth();
		expect(action.type).toEqual(CLEAR_AUTH);
	});
});

describe('authRequest', () => {
	it('should return the action', () => {
		const action = authRequest();
		expect(action.type).toEqual(AUTH_REQUEST);
	});
});

describe('authSuccess', () => {
	it('should return the action', () => {
		const mockUser = {
			username: 'sherlock',
			password: 'sherlock'
		};
		const action = authSuccess(mockUser);
		expect(action.type).toEqual(AUTH_SUCCESS);
		expect(action.currentUser).toEqual(mockUser);
	});
});

describe('authError', () => {
	it('should return the action', () => {
		const error = 'NOOOOOOOO';
		const action = authError(error);
		expect(action.type).toEqual(AUTH_ERROR);
		expect(action.error).toEqual(error);
	});
});

describe('login', () => {
	it('should return the action', () => {
		const mockUser = {
			username: 'sherlock',
			password: 'sherlock'
		};
		global.fetch = jest.fn().mockImplementation(() =>
			Promise.resolve({
				ok: true,
				json() {
					return authToken;
				}
			})
		);
		const dispatch = jest.fn();
		return login(mockUser)(dispatch).then(() => {
			expect(fetch).toHaveBeenCalledWith("https://notatorserver.herokuapp.com/auth/login", {"body": "{\"username\":\"sherlock\",\"password\":\"sherlock\"}", "headers": {"Content-Type": "application/json"}, "method": "post"});
		});
		expect(dispatch).toHaveBeenCalledWith(storeAuthInfo(authToken));
	});
});
