import reducer from './protectedData';
import {
	fetchCompositionsSuccess,
	fetchCompositionsError,
	deleteCompositionSuccess,
} from '../actions/protectedData';

describe('protectedDataReducer', () => {

	it('should set the initial state when nothing is passed', () => {
		const state = reducer(undefined, {type: '__UNKNOWN'});
		expect(state).toEqual({
			data: '',
			error: null
		});
	});

	it('Should return the current state on an unknown action', () => {
        let currentState = {};
        const state = reducer(currentState, {type: '__UNKNOWN'});
        expect(state).toBe(currentState);
    });


	describe('fetchCompositionsSuccess', () => {
		it('should return data with compositions on fetchCompositionsSuccess', () => {
			let state;
			let compositions = [	
				{
					id: '108734673425347',
					title: 'Composition2',
					music: '|ABCD|ABDC|',
					creation: 'Oct 9, 2018'
				},
				{
					id: '108734673425356',
					title: 'Composition1',
					music: '|ABCD|DdDC|',
					creation: 'Oct 4, 2018'
				},

			];

			state = reducer(state, fetchCompositionsSuccess(compositions));
			expect(state.data).toEqual(compositions);
		});
	});

	describe('fetchCompositionsError', () => {
		it('should return the error', () => {
			let state;
			let error = 'nooôóö!';
			state = reducer(state, fetchCompositionsError(error));
			expect(state.error).toEqual(error);
		});
	});

	describe('deleteCompositionsSuccess', () => {
		it('should delete a past composition', () => {
			let state;

			let data = {
				compositions: [	
					{
						id: '108734673425347',
						title: 'Composition2',
						music: '|ABCD|ABDC|',
						creation: 'Oct 9, 2018'
					},
					{
						id: '108734673425356',
						title: 'Composition1',
						music: '|ABCD|DdDC|',
						creation: 'Oct 4, 2018'
					},
				]
			};
			let idOfCompositionToBeDeleted = '108734673425347';
			state = reducer(state, fetchCompositionsSuccess(data));
			state = reducer(state, deleteCompositionSuccess(idOfCompositionToBeDeleted));
			expect(state.data[0]).toEqual(data[0]);
		});
	});
});