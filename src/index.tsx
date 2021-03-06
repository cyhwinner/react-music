import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './common/style/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import fastClick from 'fastclick';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'store/store';
import { defaultState } from 'store/stateTypes';

const store = configureStore(defaultState);

fastClick.attach(document.body);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter >
        <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
