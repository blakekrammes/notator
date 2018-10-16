import React from 'react';
import DetailedInstructions from '../DetailedInstructions';
import {shallow} from 'enzyme';

describe('DetailedInstructions', () => {
  it('should render without crashing', () => {
   shallow(<DetailedInstructions />);
  });
});