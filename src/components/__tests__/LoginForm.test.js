import React from 'react';
import {LoginForm} from '../LoginForm';
import {shallow} from 'enzyme';

describe('LoginForm', () => {
  it('should render without crashing', () => {
  	shallow(<LoginForm currentUser='bob' />);
  });

  it('should register an error if it exists', () => {
 	const mockCallback = jest.fn();
  	const wrapper = shallow(<LoginForm currentUser={null} error={'not working'} handleSubmit={mockCallback} />);
  	const errorDiv = wrapper.find('.login-error');
  	expect(errorDiv.props().className).toEqual('login-error');
  });

  it('should not register an error if it does not exists', () => {
 	const mockCallback = jest.fn();
  	const wrapper = shallow(<LoginForm currentUser={null} error={null} handleSubmit={mockCallback} />);
  	const errorDiv = wrapper.find('.login-error');
  	expect(errorDiv.length).toEqual(0);
  });

  it('should contain a Redirect to `/` if there is a currentUser', () => {
 	const mockCallback = jest.fn();
  	const wrapper = shallow(<LoginForm currentUser='bertrand' error={null} handleSubmit={mockCallback} />);
  	expect(wrapper.props().children.props.to).toEqual('/');
  });

  it.only('should fire onSubmit when the form is submitted', () => {
 	const spy = jest.fn();
 	function testHandleSubmit(fn) {
 		const values = {
 			username: 'bob',
 			email: 'bob@gmail.com'
 		}
 		fn(values);
 	}
 	const mockSubmitCallback = jest.fn();
  	const wrapper = shallow(<LoginForm currentUser={null} error={null} handleSubmit={testHandleSubmit} dispatch={spy} />);
  	const form = wrapper.find('.login-form');
  	form.simulate('submit');
  	expect(spy).toHaveBeenCalled();
  });
});