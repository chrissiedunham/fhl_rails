import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.css'
import App from './App';

require('dotenv').config()
ReactDOM.render(<App />, document.getElementById('root'));
