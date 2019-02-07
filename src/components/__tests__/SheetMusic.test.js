import React from 'react';
import { SheetMusic } from '../SheetMusic';
import { shallow } from 'enzyme';

// mock the window prompt
global.window.prompt = () => {};

describe('SheetMusic', () => {
  it('should render without crashing', () => {
   shallow(<SheetMusic writtenNotes="|abc|"/>);
  });

  it('should fire saveNotation when .save-link is clicked', () => {
    let mockDispatch = jest.fn();
    jest.spyOn(SheetMusic.prototype, 'saveNotation');
    const wrapper = shallow(<SheetMusic writtenNotes="|abcd|" sheetMusic="|abcd|" currentUser="sherlock" authToken="123450929dfha123n" demo={false} dispatch={mockDispatch} />);
    let saveLink = wrapper.find('button');
    saveLink.simulate('click', { preventDefault() {} });
    expect(SheetMusic.prototype.saveNotation).toHaveBeenCalled();
  })
});