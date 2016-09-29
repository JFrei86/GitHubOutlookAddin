/// <reference path="../typings/tsd.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {Route, Router, Link, browserHistory} from 'react-router';
import { GitHub } from './github/github';

export default (
    <Route path='/'>
        <Route path='/github' component={GitHub}/>
    </Route>);
