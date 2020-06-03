import React from 'react';
import ReactDOM from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './Modules';
import App from './App';
import myLogger from './Middlewares/myLogger';
import myLogger2 from './Middlewares/myLogger2';
import testlog from './Middlewares/testlog';
import testlog2 from './Middlewares/testlog2';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk, testlog, testlog2, logger)),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
