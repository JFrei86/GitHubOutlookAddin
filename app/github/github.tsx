/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider, connect } from 'react-redux';

export class GitHub extends React.Component<any, any> {

    public constructor() {
        super();
    }

    /**
     * Renders the add-in. Contains logic to determine which component/page to display
     */
    public render(): React.ReactElement<Provider> {
        return (<div></div>);
    }
}