import React from 'react';
import {MyCompositions} from '../MyCompositions';
import {shallow} from 'enzyme';

describe('MyCompositions', () => {

	let wrapper;

	const mockfetchCompositions = jest.fn();
	
	beforeEach(() => {
	 // pass the mock function as the dispatch prop 
	 wrapper = shallow(<MyCompositions dispatch={mockfetchCompositions} />);
	 
	});

	it('should render without crashing', () => {
	shallow(<MyCompositions dispatch={mockfetchCompositions}/>);
	});

});