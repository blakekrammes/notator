import {createStore} from 'redux';

import {whistlerReducer} from './reducers';

export default createStore(whistlerReducer);