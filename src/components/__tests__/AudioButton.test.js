import React from 'react';
import {AudioButton} from '../AudioButton';
import {shallow} from 'enzyme';

describe('AudioButton', () => {
  it('should render without crashing', () => {
   shallow(<AudioButton />);
  });

  it('should render an input-button', () => {
  	const wrapper = shallow(<AudioButton />);
  	let inputButton = wrapper.find('.input-button');
  	expect(inputButton.props().className).toEqual('input-button home-buttons');
  });
});
