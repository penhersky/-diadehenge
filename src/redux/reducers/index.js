import { combineReducers } from 'redux';

import { settings } from './settings';
import { loading } from './loading';

const rootReducers = combineReducers({ settings, loading });

export default rootReducers;
