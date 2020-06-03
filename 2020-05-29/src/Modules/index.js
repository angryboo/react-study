import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { PhoneReducer, aboutPhoneSaga } from './Phone';
import { counterReducer, counterSaga } from './Counter';

const rootReducer = combineReducers({
  Phone: PhoneReducer,
  Counter: counterReducer,
});

export function* rootSaga() {
  yield all([counterSaga(), aboutPhoneSaga()]); // all 은 배열 안의 여러 사가를 동시에 실행시켜줍니다.
}

export default rootReducer;
