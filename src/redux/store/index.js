import { createStore } from 'redux';

import reducer from '../reducers';

const REDUX_DEVTOOLS = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(reducer, REDUX_DEVTOOLS);

export default store;