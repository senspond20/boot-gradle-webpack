import React from 'react';
import ReactDOM from 'react-dom';
import App from './shared/App.js';
// import App from 's'

//import './assets/css/base.css'
import "./assets/css/global.css";

const ROOT = () => (
    <div>
        <App></App>
        Hello, Webpack!
    </div>
);

ReactDOM.render(<ROOT />, document.getElementById('root'));
