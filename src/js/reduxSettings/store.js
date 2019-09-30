import {createStore} from 'redux';
import MainReducer from './reducer';

export const store = createStore(MainReducer);
