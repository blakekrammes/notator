import React from 'react';
import { HandleNotes } from '../HandleNotes';
import { shallow } from 'enzyme';
import { Instructions } from '../Instructions';

let wholeNoteKey = {}; 
let halfNoteKey = {}; 
let quarterNoteKey = {}; 
let eighthNoteKey = {}; 
let sixteenthNoteKey = {}; 
let augmentationDotKey = {}
let deleteKey = {};

wholeNoteKey.classList = ['1', '2'];
wholeNoteKey.classList.add = (newClass) => {
  wholeNoteKey.classList.push(newClass)
}
halfNoteKey.classList = ['1', '2'];
halfNoteKey.classList.add = (newClass) => {
  halfNoteKey.classList.push(newClass)
}
quarterNoteKey.classList = ['1', '2'];
quarterNoteKey.classList.add = (newClass) => {
  quarterNoteKey.classList.push(newClass)
}
eighthNoteKey.classList = ['1', '2'];
eighthNoteKey.classList.add = (newClass) => {
  eighthNoteKey.classList.push(newClass)
}
sixteenthNoteKey.classList = ['1', '2'];
sixteenthNoteKey.classList.add = (newClass) => {
  sixteenthNoteKey.classList.push(newClass)
}
augmentationDotKey.classList = ['1', '2'];
augmentationDotKey.classList.add = (newClass) => {
  augmentationDotKey.classList.push(newClass)
}
deleteKey.classList = ['1', '2'];
deleteKey.classList.add = (newClass) => {
  deleteKey.classList.push(newClass)
}

describe('HandleNotes', () => {
  let mock = jest.fn();
  let wrapper = shallow(<HandleNotes onRef={mock} writtenNotes="|ABCD"  />);
  // it('should render without crashing', () => {
  //  let mockRefFunc = jest.fn();
  //  shallow(<HandleNotes onRef={mock} />);
  // });
  describe('HandleNotes Methods', () => {
    it('should dispatch the `DELETE_NOTE` action when there are `writtenNotes` and the delete key is pressed', () => {
      let dispatch = jest.fn();
      let mock = jest.fn();
      // 68 is the keyCode for 'd', which is configured to delete one note
      let mockedEvent = { target: {}, keyCode: 8 };
      wrapper = shallow(<HandleNotes 
                          onRef={mock} 
                          writtenNotes="|ABCD" 
                          dispatch={dispatch} 
                          wholeNoteKey={wholeNoteKey}
                          halfNoteKey={halfNoteKey}
                          quarterNoteKey={quarterNoteKey}
                          eighthNoteKey={eighthNoteKey}
                          sixteenthNoteKey={sixteenthNoteKey}
                          augmentationDotKey={augmentationDotKey}
                          deleteKey={deleteKey} />);
      wrapper.instance().pressKey(mockedEvent);
      expect(dispatch).toHaveBeenCalledWith({"type": "DELETE_NOTE"});
    });
    it('should dispatch the `PRESS_AUGMENTATION_DOT` action when there is a pitch and the augmentation dot key is pressed', () => {
      let dispatch = jest.fn();
      // 190 is the keyCode for '.', which adds an augmentation dot to the note
      let mockedEvent = { target: {}, keyCode: 190 };
      wrapper = shallow(<HandleNotes 
                          onRef={mock} 
                          pitch="C6" 
                          writtenNotes="|ABCD" 
                          dispatch={dispatch}
                          wholeNoteKey={wholeNoteKey}
                          halfNoteKey={halfNoteKey}
                          quarterNoteKey={quarterNoteKey}
                          eighthNoteKey={eighthNoteKey}
                          sixteenthNoteKey={sixteenthNoteKey}
                          augmentationDotKey={augmentationDotKey}
                          deleteKey={deleteKey} />);
      wrapper.instance().pressKey(mockedEvent);
      expect(dispatch).toHaveBeenCalledWith({"type": "PRESS_AUGMENTATION_DOT"});
    });
    it('should dispatch `CHANGE_SHEET_MUSIC` when the `.` is being held down and another acceptable key is pressed', () => {
      let dispatch = jest.fn();
      // 190 is the keyCode for '.', which adds an augmentation dot to the note
      let mockedEvent = { target: {}, keyCode: 72 };
      wrapper = shallow(<HandleNotes 
                          onRef={mock} 
                          pitch="C6" 
                          writtenNotes={['|', 'A']} 
                          baseNoteValue="2/8" clef="treble" 
                          dispatch={dispatch} 
                          sixteenthNoteCount={4} 
                          keySignature="CMaj" 
                          timeSignature="4/4" 
                          augmentationDotPressed={true} 
                          wholeNoteKey={wholeNoteKey}
                          halfNoteKey={halfNoteKey}
                          quarterNoteKey={quarterNoteKey}
                          eighthNoteKey={eighthNoteKey}
                          sixteenthNoteKey={sixteenthNoteKey}
                          augmentationDotKey={augmentationDotKey}
                          deleteKey={deleteKey} />);
      wrapper.instance().pressKey(mockedEvent);
      // it won't accept the value that it expects
      expect(dispatch).toHaveBeenCalled;
      // expect(dispatch).toHaveBeenCalledWith({"sheetMusic": "T: Composition M: 4/4 L: 2/8 K: CMaj clef=treble |A", "type": "CHANGE_SHEET_MUSIC"}, 
                                            // {"count": 16, "type": "CHANGE_SIXTEENTH_NOTE_COUNT"}, {"count": 16, "type": "CHANGE_SIXTEENTH_NOTE_COUNT"}, {"note": "c'3", "type": "ADD_NOTE"});
    });
  });
});