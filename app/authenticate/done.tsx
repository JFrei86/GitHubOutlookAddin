/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';

export class Done extends React.Component<{}, {}> {

  public componentDidMount() {
    //window.close(); //Replace with messageParent API when available.
  }

  public render(): React.ReactElement<Provider> {
    return (<div>Please wait, connecting to GitHub.</div>);
  }
 }
