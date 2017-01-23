import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApplicationForm from './js/form'
import './index.css';
import './css/demo.css';
import './css/style.css';
import './css/main.css';

ReactDOM.render(
    <div>
        <App/>
        <ApplicationForm>myDoctor</ApplicationForm>
    </div>,
    document.getElementById('root')
);

