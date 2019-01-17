import notes from '../../noteList';

test('number of notes = 73', () => {
    expect(notes.length).toBe(73);
});

test('first note name should be C1', () => {
    expect(notes[0]).toHaveProperty('name', 'C1');
});