import React from 'react';
import {Composition} from '../Composition';
import {shallow} from 'enzyme';

describe('Composition', () => {
  it('should render without crashing', () => {
   shallow(<Composition />);
  });
});