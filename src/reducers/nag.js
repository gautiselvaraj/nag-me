import {Map, List, fromJS} from 'immutable';
import * as types from '../constants/Actions';

const initialState = Map({
  editNagId: null,
  list: List()
});

export default (state = initialState, action) => {
  switch (action.type) {
    case types.NAG_INDEX:
    case types.NAG_NEW:
      return state;

    case types.NAG_CREATE:
      return state.set('list', state.get('list').unshift(fromJS(action.nag)))

    case types.NAG_EDIT:
      return state.set('editNagId', action.nagId);

    case types.NAG_UPDATE:
      return state.withMutations(map => {
        map.set('editNagId', null);
      });

    case types.NAG_PAUSE:
      return state;

    case types.NAG_RESUME:
      return state;

    case types.NAG_DELETE:
      return state;

    default:
      return state;
  }
}
