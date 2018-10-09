import {
	FETCH_COMPOSITIONS_SUCCESS,
	fetchCompositionsSuccess,
	FETCH_COMPOSITIONS_ERROR,
	fetchCompositionsError,
	fetchCompositions,
	DELETE_COMPOSITION_SUCCESS,
	deleteCompositionSuccess,
	deleteComposition
} from './protectedData';

describe('fetchCompositions', () => {
	it('should return the action', () => {
		const authToken = 'hegsignaljn35495752ksdbfbfhdb';

		global.fetch = jest.fn().mockImplementation(() =>
			Promise.resolve({
				ok: true,
				json() {
					return data;
				}
			})
		);
		const dispatch = jest.fn();
		return fetchCompositions(authToken)(dispatch).then(() => {
			expect(fetch).toHaveBeenCalledWith("https://notatorserver.herokuapp.com/compositions/currentuser", {"headers": {"Authorization": `Bearer ${authToken}`}, "method": "GET"});
		});
		expect(dispatch).toHaveBeenCalledWith(fetchCompositionsSuccess(data));
	});
});

describe('fetchCompositionsSuccess', () => {
	it('should return the action', () => {
		const mockData = 'a composition and some things';
		const action = fetchCompositionsSuccess(mockData);
		expect(action.type).toEqual(FETCH_COMPOSITIONS_SUCCESS);
		expect(action.data).toEqual(mockData);
	});
});

describe('fetchCompositionsError', () => {
	it('should return the action', () => {
		const error = 'NOOOOOOOOOOOô!';
		const action = fetchCompositionsError(error);
		expect(action.type).toEqual(FETCH_COMPOSITIONS_ERROR);
		expect(action.error).toEqual(error);
	});
});

describe('deleteCompositionSuccess', () => {
	it('should return the action', () => {
		const id = '1434composition';
		const action = deleteCompositionSuccess(id);
		expect(action.type).toEqual(DELETE_COMPOSITION_SUCCESS);
		expect(action.id).toEqual(id);
	});
});

describe('deleteComposition', () => {
    it('should return the action', () => {
        const compId = '1434composition';
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json() {
                    return compId;
                }
            })
        );
        const dispatch = jest.fn();
        return deleteComposition(compId)(dispatch).then(() => {
            expect(fetch).toHaveBeenCalledWith(`https://notatorserver.herokuapp.com/compositions/${compId}`, {"method": "DELETE"});
            expect(dispatch).toHaveBeenCalledWith(deleteCompositionSuccess(compId));
        });
    });
});







