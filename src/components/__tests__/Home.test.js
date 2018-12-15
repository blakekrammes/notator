import React from 'react';
import {Home} from '../Home';
import {shallow} from 'enzyme';

describe('Home', () => {

	let wrapper;

	const mockEraseErrorfn = jest.fn();
	
	beforeEach(() => {
	 // pass a logged in component as default 
	 wrapper = shallow(<Home authToken={'212376538463745fdhsfafv2452635'} currentUser={'sherlock'} dispatch={mockEraseErrorfn} />);
	});

	it('should render without crashing', () => {
		shallow(<Home dispatch={mockEraseErrorfn} />);
	});

	it('should render the logged-in JSX when authToken + user are provided', () => {
		let loggedInDiv = wrapper.find('.logged-in-div');
		expect(loggedInDiv.props().className).toEqual('logged-in-div');
	});

	it('should call the logout function when the logout link is clicked', () => {
		const spy = jest.spyOn(Home.prototype, 'logout');
		wrapper.find('a').simulate('click', { preventDefault() {} });
		expect(Home.prototype.logout).toHaveBeenCalled();
	});

	it('should contain the compositions link with the correct route if the user is logged in', () => {
		const compositionsLink = wrapper.find('.compositions-link');
		expect(compositionsLink.props().to).toEqual('/mycompositions');
	});

	it('should render the logged-out JSX when authToken + user are not provided', () => {
		const wrapper = shallow(<Home authToken={null} currentUser={null} dispatch={mockEraseErrorfn} />);
		let loggedOutDiv = wrapper.find('.logged-out-div');
		expect(loggedOutDiv.props().className).toEqual('logged-out-div');
	});

	it('should contain the login link with the correct route', () => {
		const wrapper = shallow(<Home authToken={null} currentUser={null} dispatch={mockEraseErrorfn} />);
		let loginLink = wrapper.find('.login-link');
		expect(loginLink.props().to).toEqual('/login');
	});

	it('should contain the signup link with the correct route', () => {
		const wrapper = shallow(<Home authToken={null} currentUser={null} dispatch={mockEraseErrorfn} />);
		let signupLink = wrapper.find('.signup-link');
		expect(signupLink.props().to).toEqual('/signup');
	});
});


