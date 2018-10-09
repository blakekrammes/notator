import React from 'react';
import {SheetMusic} from '../SheetMusic';
import {shallow} from 'enzyme';

describe('SheetMusic', () => {
  it('should render without crashing', () => {
   shallow(<SheetMusic />);
  });
});