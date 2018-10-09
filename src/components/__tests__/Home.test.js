import React from 'react';
import {Home} from '../Home';
import {shallow, mount} from 'enzyme';

describe('Home', () => {

	let wrapper;

	const mockEraseErrorfn = jest.fn();
	
	beforeEach(() => {
	 // pass the mock function as the dispatch prop 
	 wrapper = shallow(<Home authToken={'212376538463745fdhsfafv2452635'} currentUser={'sherlock'} dispatch={mockEraseErrorfn} />);
	 
	});

	it('should render without crashing', () => {
		shallow(<Home dispatch={mockEraseErrorfn} />);
	});

	it('should render the logged-in JSX when authToken + user are provided', () => {
		const wrapper = shallow(<Home authToken={'212376538463745fdhsfafv2452635'} currentUser={'sherlock'} dispatch={mockEraseErrorfn} />);
		let loggedInDiv = wrapper.find('.logged-in-div');
		expect(loggedInDiv.props().className).toEqual('logged-in-div');
	});

	it('should render the logged-out JSX when authToken + user are not provided', () => {
		const wrapper = shallow(<Home authToken={null} currentUser={null} dispatch={mockEraseErrorfn} />);
		let loggedOutDiv = wrapper.find('.logged-out-div');
		expect(loggedOutDiv.props().className).toEqual('logged-out-div');
	});


});


