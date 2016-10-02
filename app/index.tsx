/// <reference path="../typings/tsd.d.ts" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import { GitHub } from './github/github';
import { Done } from './authenticate/done';
import { Authenticate } from './authenticate/authenticate';
import { completeAddInReducer } from './redux/globalReducer';
import thunkMiddleware from 'redux-thunk';
declare const require: (name: String) => any;

interface IHotModule {
  hot?: { accept: (path: string, callback: () => void) => void };
};

declare const module: IHotModule;

function configureStore(): Store {
  const store: Store = createStore(completeAddInReducer, applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
    // neat middleware that logs actions
  ));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer: any = require('./redux/loginReducer').completeAddInReducer;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

const store: Store = configureStore();


class Main extends React.Component<{}, {}> {

  public getRoute(): string {
    this.addIncludes();
    let url: string = document.URL;
    let strings: string[] = url.split('/');
    let output: string = strings[3];
    if (output.includes('?')) {
      output = output.slice(0, strings[3].indexOf('?'));
    }
    return output;
  }

  public render(): React.ReactElement<Provider> {
    console.log('starting');
    console.log(store.getState());
    const route: string = this.getRoute();
    switch (route) {
      case '':
      case 'github':
        return(<Provider store = {store}><GitHub /></Provider>);
      case 'done':
        return(<Done />);
      case 'welcome':
        return(<Authenticate />);
      default:
        return(<div>Error 404: '{route}'</div>);
    }
  }
  private addIncludes(): void {
    if (!String.prototype.includes) {
      String.prototype.includes = function(): boolean {
        'use strict';
        return String.prototype.indexOf.apply(this, arguments) !== -1;
      };
    }
  }
}

ReactDOM.render(<Main />, document.getElementById('app'));
