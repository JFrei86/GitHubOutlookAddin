/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';

export class Authenticate extends React.Component<any, {}> {

  public constructor() {
    super();
    this.linkToAuth = this.linkToAuth.bind(this);
    this.returnToAddin = this.returnToAddin.bind(this);
  }

  public returnToAddin() {
    Office.context.roamingSettings.set("hasAuth", true);
    Office.context.roamingSettings.saveAsync();
    window.location.href = 'http://localhost:3000/github';
  }

  public linkToAuth(): void {
    var authWindow = window.open('./authenticate');
    authWindow.onbeforeunload = this.returnToAddin;
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
