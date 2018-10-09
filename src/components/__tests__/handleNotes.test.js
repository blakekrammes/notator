import React from 'react';
import {handleNotes} from '../../handleNotes';
import {shallow} from 'enzyme';

describe('handleNotes', () => {
  it('should render without crashing', () => {
   shallow(<handleNotes />);
  });
});