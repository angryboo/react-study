/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { Router } from 'react-router-dom';
// import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import myLogger from './Middlewares/mylogger';
import rootReducer, { rootSaga } from './Modules';

const customHistory = createBrowserHistory();
// createBrowserHistory는 History, LocationState를 사용할 수 있게 해줍니다.
const sagaMiddleware = createSagaMiddleware({
  context: {
    history: customHistory,
  },
});
// 사가 미들웨어를 만듭니다.

const store = createStore(
  rootReducer,
  applyMiddleware(
    ReduxThunk.withExtraArgument({ history: customHistory }),
    sagaMiddleware,
    myLogger,
    // other store enhancers if any
  ),
);
sagaMiddleware.run(rootSaga);
// 루트 사가를 실행해줍니다.
// 주의: 스토어 생성이 된 다음에 위 코드를 실행해야합니다.

ReactDOM.render(
  // 브라우저 돔 접근 기능은 뺀 주소 매칭정도의 기능만 가지는 Router
  <Router history={customHistory}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'),
);
