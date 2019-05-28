import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.css'
import App from './App'

import configureStore from './store/configureStore'
const store = configureStore();

require('dotenv').config()
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
	document.getElementById('root')
);
