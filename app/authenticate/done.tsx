/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';

export class Done extends React.Component<{}, {}> {

  public getParameterByName(name, url = null): string {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  public componentDidMount() {
    let status: string = this.getParameterByName('status');
    if (status === 'success') {
      window.close(); //Replace with messageParent API when available.
    } else {
      window.location.href = 'http://localhost:3000/authenticate';
    }
  }

  public render(): React.ReactElement<Provider> {
    return (<div>Please wait, connecting to GitHub.</div>);
  }
 }
