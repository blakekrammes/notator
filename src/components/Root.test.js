import React from 'react';
import Root from './Root';
import {shallow} from 'enzyme';

describe('Root', () => {
  it('should render without crashing', () => {
    const component = shallow(<Root />);
    expect(component).toMatchSnapshot();
  });
});