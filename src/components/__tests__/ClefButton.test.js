import React from 'react';
import {ClefButton} from '../ClefButton';
import {shallow} from 'enzyme';

describe('ClefButton', () => {
  it('should render without crashing', () => {
   shallow(<ClefButton />);
  });
});