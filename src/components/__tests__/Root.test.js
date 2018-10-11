import React from 'react';
import Root from '../Root';
import {shallow} from 'enzyme';
import {Home} from '../Home';
import {LoginForm} from '../LoginForm';
import {SignupForm} from '../SignupForm';
import {MyCompositions} from '../MyCompositions';

describe('Root', () => {
	it('should render without crashing', () => {
		shallow(<Root />);
	});

	it('should contain a root level div with the className `root`', () => {
		const wrapper = shallow(<Root />);
		const rootDiv = wrapper.find('.root');
		expect(rootDiv.props().className).toEqual('root');
	});

	it('should contain the home link with the correct route', () => {
		const wrapper = shallow(<Root />);
		const homeLink = wrapper.find(`[to='/']`);
		expect(homeLink.props().to).toEqual('/');
	});

	it('should render the home Route HOC component with the Home component and the correct route', () => {
		const wrapper = shallow(<Root />);
		const homeRoute = wrapper.find(`[path='/']`);
		expect(homeRoute.props().component.WrappedComponent).toEqual(Home);
		expect(homeRoute.props().path).toEqual('/');
	});

	it.only('should render the login Route HOC component with the login component and the correct route', () => {
		const wrapper = shallow(<Root />);
		const loginRoute = wrapper.find(`[path='/login']`);
		expect(loginRoute.props().component.WrappedComponent).toEqual(LoginForm);
		expect(loginRoute.props().path).toEqual('/login');
	});

	it('should render the signup Route HOC component with the signup component and the correct route', () => {
		const wrapper = shallow(<Root />);
		const signupRoute = wrapper.find(`[path='/signup']`);
		expect(signupRoute.props().component.WrappedComponent).toEqual(SignupForm);
		expect(signupRoute.props().path).toEqual('/signup');
	});

	it('should render the mycompositions Route HOC component with the MyCompositions component and the correct route', () => {
		const wrapper = shallow(<Root />);
		const myCompositionsRoute = wrapper.find(`[path='/mycompositions']`);
		expect(myCompositionsRoute.props().component.WrappedComponent).toEqual(MyCompositions);
		expect(myCompositionsRoute.props().path).toEqual('/mycompositions');
	});

});