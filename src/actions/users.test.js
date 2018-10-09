import {
	registerUser,
	saveUserNotation
} from './users';

describe('registerUser', () => {
	it('should return the action', () => {
		const mockUser = {
			username: 'sherlock',
			password: 'sherlock'
		};

		global.fetch = jest.fn().mockImplementation(() =>
			Promise.resolve({
				ok: true,
				json() {
					return mockUser;
				}
			})
		);
		const dispatch = jest.fn();
		return registerUser(mockUser)(dispatch).then(() => {
			expect(fetch).toHaveBeenCalledWith("https://notatorserver.herokuapp.com/users", {"body": "{\"username\":\"sherlock\",\"password\":\"sherlock\"}", "headers": {"content-type": "application/json"}, "method": "POST"});
		});
		expect(dispatch).toHaveBeenCalledWith(login(data));
	});
});

// describe('saveUserNotation', () => {
// 	it('should return the action', () => {
// 		const mockUserWithNotation = 

// 		global.fetch = jest.fn().mockImplementation(() =>
// 			Promise.resolve({
// 				ok: true,
// 				json() {
// 					return mockUser;
// 				}
// 			})
// 		);
// 		const dispatch = jest.fn();
// 		return registerUser(mockUser)(dispatch).then(() => {
// 			expect(fetch).toHaveBeenCalledWith("https://notatorserver.herokuapp.com/users", {"body": "{\"username\":\"sherlock\",\"password\":\"sherlock\"}", "headers": {"content-type": "application/json"}, "method": "POST"});
// 		});
// 		expect(dispatch).toHaveBeenCalledWith(login(data));
// 	});
// });
