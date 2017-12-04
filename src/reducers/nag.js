import {Map, List, fromJS} from 'immutable';
import * as types from '../constants/Actions';

const initialState = Map({
  editNagId: null,
  list: List()
});

export default (state = initialState, action) => {
  let nagList;

  switch (action.type) {
    case types.NAG_INDEX:
      return state;

    case types.NAG_NEW:
      return state.set('editNagId', null);

    case types.NAG_CREATE:
      return state.set('list', state.get('list').unshift(fromJS(action.nag)))

    case types.NAG_EDIT:
      return state.set('editNagId', action.nagId);

    case types.NAG_UPDATE:
      nagList = state.get('list');
      return state.set('list', nagList.set(nagList.findIndex(nag => nag.get('id') === action.nagId), fromJS(action.nag)));

    case types.NAG_PAUSE:
      nagList = state.get('list');
      return state.set('list', nagList.setIn([nagList.findIndex(nag => nag.get('id') === action.nagId), 'paused'], true));

    case types.NAG_RESUME:
      nagList = state.get('list');
      return state.set('list', nagList.setIn([nagList.findIndex(nag => nag.get('id') === action.nagId), 'paused'], false));

    case types.NAG_DELETE:
      nagList = state.get('list');
      return state.set('list', nagList.delete(nagList.findIndex(nag => nag.get('id') === action.nagId)));

    default:
      return state;
  }
}
