import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx'

// Define your main component
function Main() {
    return(

        <App/>
    )
}

// Render your main component into the root element of your HTML document
ReactDOM.render(<Main />, document.getElementById('root'));
