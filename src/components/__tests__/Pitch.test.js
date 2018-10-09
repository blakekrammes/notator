import React from 'react';
import {Pitch} from '../Pitch';
import {shallow} from 'enzyme';

describe('Pitch', () => {
  it('should render without crashing', () => {
   shallow(<Pitch />);
  });
});