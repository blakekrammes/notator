import React from 'react';
import { SheetMusic } from '../SheetMusic';
import { shallow } from 'enzyme';

describe('SheetMusic', () => {
  it('should render without crashing', () => {
   shallow(<SheetMusic />);
  });

  // it.only('should fire saveNotation when .save-link is clicked', () => {
  //   let mock = jest.fn();
  //   const wrapper = shallow(<SheetMusic writtenNotes="|abcd|" authToken="123450929dfha123n" />);
  //   let saveLink = wrapper.find('button');
  //   // const spy = jest.spyOn(SheetMusic.prototype, 'saveNotation');
  //   // console.log(spy)
  //   console.log(wrapper.props().saveNotation({ preventDefault() {} }))
  //   // console.log(saveLink.simulate('click', { preventDefault() {} }));
  //   // wrapper.find('button.save-link').simulate('click', { preventDefault() {} });
  //   // expect(mock).toHaveBeenCalled
  // })



});