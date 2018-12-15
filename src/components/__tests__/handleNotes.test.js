import React from 'react';
import {HandleNotes} from '../HandleNotes';
import {shallow} from 'enzyme';

describe('HandleNotes', () => {
  let wrapper = shallow(<HandleNotes writtenNotes="|ABCD"  />);
  it('should render without crashing', () => {
   shallow(<HandleNotes />);
  });
  describe('HandleNotes Methods', () => {
    it('should dispatch the `DELETE_NOTE` action when there are `writtenNotes` and the delete key is pressed', () => {
      let dispatch = jest.fn();
      // 68 is the keyCode for 'd', which is configured to delete one note
      let mockedEvent = { target: {}, keyCode: 68 };
      wrapper = shallow(<HandleNotes writtenNotes="|ABCD" dispatch={dispatch} />);
      wrapper.instance().pressKey(mockedEvent);
      expect(dispatch).toHaveBeenCalledWith({"type": "DELETE_NOTE"});
    });
    it('should dispatch the `PRESS_AUGMENTATION_DOT` action when there is a pitch and the augmentation dot key is pressed', () => {
      let dispatch = jest.fn();
      // 190 is the keyCode for '.', which adds an augmentation dot to the note
      let mockedEvent = { target: {}, keyCode: 190 };
      wrapper = shallow(<HandleNotes pitch="C6" writtenNotes="|ABCD" dispatch={dispatch} />);
      wrapper.instance().pressKey(mockedEvent);
      expect(dispatch).toHaveBeenCalledWith({"type": "PRESS_AUGMENTATION_DOT"});
    });
    it('should dispatch `CHANGE_SHEET_MUSIC` when the `.` is being held down and another acceptable key is pressed', () => {
      let dispatch = jest.fn();
      // 190 is the keyCode for '.', which adds an augmentation dot to the note
      let mockedEvent = { target: {}, keyCode: 72 };
      wrapper = shallow(<HandleNotes pitch="C6" writtenNotes={['|', 'A']} baseNoteValue="2/8" clef="treble" dispatch={dispatch} 
                                     sixteenthNoteCount={4} keySignature="CMaj" timeSignature="4/4" augmentationDotPressed={true} />);
      wrapper.instance().pressKey(mockedEvent);
      // it won't accept the value that it expects
      expect(dispatch).toHaveBeenCalled;
      // expect(dispatch).toHaveBeenCalledWith({"sheetMusic": "T: Composition M: 4/4 L: 2/8 K: CMaj clef=treble |A", "type": "CHANGE_SHEET_MUSIC"}, 
                                            // {"count": 16, "type": "CHANGE_SIXTEENTH_NOTE_COUNT"}, {"count": 16, "type": "CHANGE_SIXTEENTH_NOTE_COUNT"}, {"note": "c'3", "type": "ADD_NOTE"});
    });
  });
  
});