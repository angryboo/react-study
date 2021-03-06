import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'redux-logger';
// import ReduxThunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import rootReducer from './Modules/Index';
import myLogger from './Middlewares/MyLogger';
import thunk from './Middlewares/MyThunk';
import testlog from './Middlewares/testlog';
import testlog2 from './Middlewares/testlog2';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(testlog, testlog2, logger)),
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
