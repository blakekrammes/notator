import {createStore} from 'redux';

import {singerReducer} from './reducers';

export default createStore(singerReducer);