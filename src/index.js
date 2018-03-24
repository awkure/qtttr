import React from 'react';
import ReactDOM from 'react-dom';
import attachFastClick from 'fastclick';
import App from './containers/App.js';
import './style/app.css';

const Root = () => {
  return (
    <div id="container">
      <div className="overlay">
        <div className="withinOverlay">
          <div className="board">
            <App />
          </div>
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<Root /> , document.getElementById('root'));

attachFastClick.attach(document.body);