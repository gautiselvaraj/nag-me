import { combineReducers } from 'redux-immutable';
import page from './page';
import nag from './nag';

export default combineReducers({
  page,
  nag
});
