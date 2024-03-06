import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function Main() {
    return (
        <App />
    );
}

ReactDOM.render(<Main />, document.getElementById('root'));
