import React from 'react';
import {LoginForm} from '../LoginForm';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

describe('LoginForm', () => {
  it('should render without crashing', () => {

 	const store = mockStore({
 		auth: {
 			currentUser: 'bob'
 		}
 	});

  	shallow(<LoginForm store={store} />);

  });
});