/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { AuthState, updateAuthAction, IErrorStateAction } from '../actions/flowActions';

/**
 * Properties needed for the SignInButton component
 * @interface ISignInProps
 */
interface ISignInProps {
    /**
     * intermediate to dispatch actions to update the global store
     * @type {any}
     */
    dispatch?: any;
    /**
     * interval for checking the database for user token
     * @type {number}
     */
    authState?: AuthState;
}

/**
 * maps state in application store to properties for the component
 * @param {any} state
 */
function mapStateToProps(state: any): ISignInProps {
  return ({
      authState: state.controlState.authState,
  });
}

@connect(mapStateToProps)

export class Authenticate extends React.Component<ISignInProps, {}> {

  public constructor() {
    super();
    this.linkToAuth = this.linkToAuth.bind(this);
    this.returnToAddin = this.returnToAddin.bind(this);
  }

  public returnToAddin() {
    this.props.dispatch(updateAuthAction(AuthState.Authorized));
  }

  public linkToAuth(): void {
    var authWindow = window.open('./authenticate');
    authWindow.onbeforeunload = this.returnToAddin;
    this.props.dispatch(updateAuthAction(AuthState.Request));
  }

  public render(): React.ReactElement<Provider> {
    return (
    <div>
      <div class="signup-intro-container">
        <div class="feature-block">
          <div class="feature-container">
            <div class="header">
              <div class="icon-container"></div>
              <span>Track bugs easily</span>
            </div>
            <div class="description">Create an issue on GitHub and track it without opening a new browser.</div>
          </div>
        </div>
        <div class="feature-block">
          <div class="feature-container">
            <div class="header">
              <div class="icon-container"></div>
              <span>Stop searching your backlog</span>
            </div>
            <div class="description">Reference issues in Outlook and view issue details contextually.</div>
          </div>
        </div>
        <div class="feature-block">
          <div class="feature-container">
            <div class="header">
              <div class="icon-container"></div>
              <span>Save emails and attachments</span>
            </div>
            <div class="description">Save important emails and attachments to issues in your backlog.</div>
          </div>
        </div>
      </div>  
      <button onClick={this.linkToAuth}>Sign in</button>
    </div>);
  }
}
