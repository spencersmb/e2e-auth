/* eslint-disable no-console */

// start this app by running npm run start
// open terminal for the server and run npm run dev
// open terminal and run mongod


import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';
import '../node_modules/toastr/build/toastr.min.css';
import {config} from './store/config.store';
import * as loginActions from './actions/formSubmitActions';

const store = config(); //pass optional initialstate object here into config - like if it comes from a server or something

//check for userToken in localStorage is valid before page loads
if(localStorage.getItem('token')){
  store.dispatch(loginActions.checkUserAuth());
}

render (
  <Provider store={store} >
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);