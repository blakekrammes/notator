import React from 'react';
import {Instructions} from '../Instructions';
import {shallow} from 'enzyme';

describe('Instructions', () => {
  it('should render without crashing', () => {
   shallow(<Instructions />);
  });
});