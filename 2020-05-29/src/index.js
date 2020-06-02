import React from 'react';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import rootReducer from './Modules/index';
import myLogger from './Middlewares/mylogger';

// import myLogger2 from './Middlewares/myLogger2';
// import myLogger3 from './Middlewares/myLogger3';

const store = createStore(rootReducer, applyMiddleware(ReduxThunk, myLogger));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
