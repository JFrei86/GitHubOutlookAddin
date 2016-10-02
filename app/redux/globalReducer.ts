/// <reference path="../../typings/tsd.d.ts" />

import { Reducer, combineReducers } from 'redux';
import { updateControlStateReducer} from './flowReducer';

/**
 * combined reducer for entire application
 * @type {Reducer}
 */
export const completeAddInReducer: Reducer = combineReducers({
    controlState : updateControlStateReducer
});