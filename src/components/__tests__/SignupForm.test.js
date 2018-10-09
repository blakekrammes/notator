import React from 'react';
import {SignupForm} from '../SignupForm';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

describe('SignupForm', () => {

  it('should render without crashing', () => {

 	const store = mockStore({
 		auth: {
 			currentUser: 'bob'
 		}
 	});

  	shallow(<SignupForm store={store} />);

  });

  it('should show an error if no user is given', () => {

 	const store = mockStore({
 		auth: {
 			currentUser: null,
 			error: 'NOOOOOOO'
 		}
 	});

  	const wrapper = shallow(<SignupForm store={store} />);

  	console.log(wrapper.find('.signup-form'));

  	let thingy = wrapper.find('.signup-form');

  	console.log(thingy)

  	// expect(wrapper.find('.signup-error').hasClass('signup-error').toEqual(true));

  });



});