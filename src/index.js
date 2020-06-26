import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import Reducers from './redux/reducers'
import ReduxThunk from 'redux-thunk'

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import * as serviceWorker from './serviceWorker';
import logger from 'redux-logger';






const store = createStore(Reducers, {}, applyMiddleware(ReduxThunk, logger))


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
