/// <reference path="../../typings/tsd.d.ts" />
import { AuthState } from '../actions/flowActions';

/**
 * Represents the error data in the store
 * @interface IControlStateReducer
 */
export interface IControlStateReducer {
  authState: AuthState;
  error: IErrorStateReducer;
}

/**
 * Represents the error data in the store
 * @interface IErrorStateReducer
 */
export interface IErrorStateReducer {
  isVisible: boolean;
  message: string;
}

/**
 * Represents the initial state for the control flow of the application
 * @type {IControlStateReducer}
 */
const initialControlState: IControlStateReducer = {
  authState : AuthState.None,
  error: {
    isVisible: false,
    message: ''},
};

/**
 * reducer to update the control state in the store
 * @param {IControlStateReducer} state
 * @param {any} action
 * @returns {IControlStateReducer}
 */
export function updateControlStateReducer(state: IControlStateReducer = initialControlState, action: any): IControlStateReducer {
  switch (action.type) {
    case 'ErrorState':
      return Object.assign({}, state, { isVisible: action.isVisible, message: action.message});
    case 'AUTH_STATE':
      return Object.assign({}, state, { authState: action.authState});
    default:
      return state;
  }
}