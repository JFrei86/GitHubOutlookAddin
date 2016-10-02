// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { Authenticate } from '../authenticate/authenticate';
import { Loading } from '../authenticate/loading';
import { AuthState, updateAuthAction, IErrorStateAction } from '../actions/flowActions';

/**
 * Properties needed for the main GitHub component
 * @interface IGitHubProps
 */
interface IGitHubProps {
  dispatch?: any;
  authState?: AuthState;
  error?: IErrorStateAction;
}

/**
 * maps state in application store to properties for the component
 * @param {any} state
 */
function mapStateToProps(state: any): IGitHubProps {
  // console.log('state:' + JSON.stringify(state));
  return ({
    authState: state.controlState.authState,
    error: state.controlState.error,
  });
}

@connect(mapStateToProps)

export class GitHub extends React.Component<IGitHubProps, any> {

  public constructor() {
    super();
    this.initialize = this.initialize.bind(this);
    this.getParameterByName = this.getParameterByName.bind(this);
    //Office.initialize = this.initialize;
    //this.initialize();
  }

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
      this.initialize();
  }

  /**
   * determines whether or not the component should re-render based on changes in state
   * @param {any} nextProps
   * @param {any} nextState
   */
  public shouldComponentUpdate(nextProps: any, nextState: any): boolean {
    return (this.props.authState !== nextProps.authState);
  }

  /**
   * Executed after Office.initialize is complete. 
   * Initial check for user authentication token and determines correct first page to show
   */
  public initialize(): void {
    let authStatus: string = this.getParameterByName('authFlow');
    let dispatch: any = this.props.dispatch;
    if (authStatus === 'true') {
        dispatch(updateAuthAction(AuthState.NotAuthorized));
    } else {
        dispatch(updateAuthAction(AuthState.Authorized));
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
    switch (this.props.authState) {
      case AuthState.None:
        body = (<Loading />);
        break;
      case AuthState.NotAuthorized:
        body = (<Authenticate />);
        break;
      case AuthState.Request:
        body = (<Loading />);
        break;
      case AuthState.Authorized:
        body = (<div>GitHub</div>);
        break;
      default:
       body = (<Authenticate />);
    }
    return(<div style={bodyStyle}> {body} </div>);
  }
}