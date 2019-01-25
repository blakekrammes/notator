import React from 'react';
import { MemoryRouter } from 'react-router';
import { Home } from '../Home';
import { shallow, render } from 'enzyme';


describe('Home', () => {

	it('should render without crashing', () => {
		const mockEraseErrorfn = jest.fn();
		shallow(<Home dispatch={mockEraseErrorfn} />);
	});

	it('should render home successfully', () => {
		const homeRouter = shallow(
			<MemoryRouter initialEntries={[ '/home']}>
				<Home />
			</MemoryRouter>
		)
		expect(homeRouter.props().history.location.pathname).toEqual('/home');
	});

	it('should render the logged-in JSX when authToken + user are provided', () => {
		const mockEraseErrorfn = jest.fn();
		const wrapper = shallow(<Home authToken={'212376538463745fdhsfafv2452635'} currentUser={'sherlock'} dispatch={mockEraseErrorfn} />);
		let loggedInDiv = wrapper.find('.logged-in-div');
		expect(loggedInDiv.props().className).toEqual('logged-in-div');
	});

	it('should call the logout function when the logout link is clicked', () => {
		const mockEraseErrorfn = jest.fn();
		const wrapper = shallow(<Home authToken={'212376538463745fdhsfafv2452635'} currentUser={'sherlock'} dispatch={mockEraseErrorfn} />);
		const spy = jest.spyOn(Home.prototype, 'logout');
		wrapper.find('a').simulate('click', { preventDefault() {} });
		expect(Home.prototype.logout).toHaveBeenCalled();
	});

	it('should call the startDemo function when the demo link is clicked', () => {
		const mockEraseErrorfn = jest.fn();
		const wrapper = shallow(<Home demo={false} authToken={null} currentUser={null} dispatch={mockEraseErrorfn} />);
		const spy = jest.spyOn(Home.prototype, 'startDemo');
		wrapper.find('a.demo-link').simulate('click', { preventDefault() {} });
		expect(Home.prototype.startDemo).toHaveBeenCalled();
	});

	it('should contain the compositions link with the correct route if the user is logged in', () => {
		const mockEraseErrorfn = jest.fn();
		const wrapper = shallow(<Home authToken={'212376538463745fdhsfafv2452635'} currentUser={'sherlock'} dispatch={mockEraseErrorfn} />);
		const compositionsLink = wrapper.find('.compositions-link');
		expect(compositionsLink.props().to).toEqual('/mycompositions');
	});

	it('should render the logged-out JSX when authToken + user are not provided', () => {
		const mockEraseErrorfn = jest.fn();
		const wrapper = shallow(<Home authToken={null} currentUser={null} dispatch={mockEraseErrorfn} />);
		let loggedOutDiv = wrapper.find('.logged-out-div');
		expect(loggedOutDiv.props().className).toEqual('logged-out-div');
	});

	it('should contain the login link with the correct route', () => {
		const mockEraseErrorfn = jest.fn();
		const wrapper = shallow(<Home authToken={null} currentUser={null} dispatch={mockEraseErrorfn} />);
		let loginLink = wrapper.find('.login-link');
		expect(loginLink.props().to).toEqual('/login');
	});

	it('should contain the signup link with the correct route', () => {
		const mockEraseErrorfn = jest.fn();
		const wrapper = shallow(<Home authToken={null} currentUser={null} dispatch={mockEraseErrorfn} />);
		let signupLink = wrapper.find('.signup-link');
		expect(signupLink.props().to).toEqual('/signup');
	});
});


