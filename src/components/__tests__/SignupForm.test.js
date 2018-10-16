import React from 'react';
import {SignupForm} from '../SignupForm';
import {shallow} from 'enzyme';

describe('SignupForm', () => {

  it('should render without crashing', () => {
  	shallow(<SignupForm currentUser='bob' />);
  });

  it('should register an error if it exists', () => {
    const mockCallback = jest.fn();
  	const wrapper = shallow(<SignupForm currentUser={null} error='some auth error' handleSubmit={mockCallback} />);
    const errorDiv = wrapper.find('.signup-error');
    expect(errorDiv.props().className).toEqual('signup-error');
  });

  it('should not register an error if it does not exists', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(<SignupForm currentUser={null} error={null} handleSubmit={mockCallback} />);
    const errorDiv = wrapper.find('.signup-error-error');
    expect(errorDiv.length).toEqual(0);
  });

  it('should contain a Redirect to `/` if there is a currentUser', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(<SignupForm currentUser='bertrand' error={null} handleSubmit={mockCallback} />);
    expect(wrapper.props().to).toEqual('/');
  });

  it('should fire onSubmit when the form is submitted', () => {
    const spy = jest.fn();
    // const spy2 = jest.fn();
    function testHandleSubmit(fn) {
      const values = {
        username: 'bob',
        email: 'bob@gmail.com'
      }
      fn(values);
    }
    const mockSubmitCallback = jest.fn();
    const wrapper = shallow(<SignupForm currentUser={null} error={null} handleSubmit={testHandleSubmit} dispatch={spy} />);
    const form = wrapper.find('.signup-form');
    form.simulate('submit');
    expect(spy).toHaveBeenCalled();
  });
});