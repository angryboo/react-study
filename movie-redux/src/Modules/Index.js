import { combineReducers } from 'redux';
import Popular from './Poular';
import Upcoming from './Upcoming';

const rootReducer = combineReducers({
  Popular,
  Upcoming,
});

export default rootReducer;
