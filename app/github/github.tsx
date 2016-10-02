// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider, connect } from 'react-redux';

interface IRefreshCallback { (): void; }

export class GitHub extends React.Component<any, any> {

  public constructor() {
    super();
    this.initialize = this.initialize.bind(this);
    Office.initialize = this.initialize;
    this.initialize();
  }

  public auth = false;

  public isAuthenticated() {
      return Office.context.roamingSettings.get("hasAuth");
  }

  public authenticate() {
      var settings = Office.context.roamingSettings;
      settings.set("hasAuth", true);
      settings.saveAsync();
      window.location.href = "http://localhost:3000/authenticate";
  }

  /**
   * Executed after Office.initialize is complete. 
   * Initial check for user authentication token and determines correct first page to show
   */
  public initialize(): void {
      if (!this.isAuthenticated()) {
          this.authenticate();
      }
  }

  /**
   * Renders the add-in. Contains logic to determine which component/page to display
   */
  public render(): React.ReactElement<Provider> {
    let bodyStyle: any = {
      padding: '2.25%',
    };
    let body: any;
    return(<div style={bodyStyle}> {body} </div>);
  }
}