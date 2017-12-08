import { Map, List, fromJS } from 'immutable';
import * as types from '../constants/Actions';

const initialState = Map({
  editNagId: null,
  list: List(),
  visibleList: Map(),
  query: null,
  sortBy: null,
  status: null
});

export default (state = initialState, action) => {
  let nagList;

  switch (action.type) {
    case types.NAG_INIT:
      return fromJS(action.nag);

    case types.NAG_INDEX:
      const query = state.get('query');
      return state.set(
        'visibleList',
        state
          .get('list')
          .filter(
            nag => !query || new RegExp(query, 'gi').test(nag.get('title'))
          )
          .sort((a, b) => {
            const createdAt = a.get('createdAt') - b.get('createdAt');
            const title = a.get('title').localeCompare(b.get('title'));
            const nextNag = a.get('nextNag') - b.get('nextNag');

            switch (state.get('sortBy')) {
              case 'latest':
                return -createdAt;
              case 'oldest':
                return createdAt;
              case 'ZA':
                return -title;
              case 'AZ':
                return title;
              case 'lastNag':
                return -nextNag;
              default:
                return nextNag;
            }
          })
          .groupBy(nag => nag.get('status'))
      );

    case types.NAG_NEW:
      return state.set('editNagId', null);

    case types.NAG_CREATE:
      return state.set('list', state.get('list').unshift(fromJS(action.nag)));

    case types.NAG_EDIT:
      return state.set('editNagId', action.nagId);

    case types.NAG_UPDATE:
      return state.setIn(
        [
          'list',
          state.get('list').findIndex(nag => nag.get('id') === action.nagId)
        ],
        fromJS(action.nag)
      );

    case types.NAG_PAUSE:
      nagList = state.get('list');
      return state.set(
        'list',
        nagList.setIn(
          [nagList.findIndex(nag => nag.get('id') === action.nagId), 'status'],
          'PAUSED'
        )
      );

    case types.NAG_RESUME:
      nagList = state.get('list');
      return state.set(
        'list',
        nagList.setIn(
          [nagList.findIndex(nag => nag.get('id') === action.nagId), 'status'],
          'LIVE'
        )
      );

    case types.NAG_DELETE:
      nagList = state.get('list');
      return state.set(
        'list',
        nagList.delete(nagList.findIndex(nag => nag.get('id') === action.nagId))
      );

    case types.NAG_STATUS_UPDATE:
      return state.setIn(
        [
          'list',
          state.get('list').findIndex(nag => nag.get('id') === action.nag.id)
        ],
        fromJS(action.nag)
      );

    case types.NAGS_SEARCH:
      return state.set('query', action.query);

    case types.NAGS_SORT:
      return state.set('sortBy', action.sortBy);

    case types.NAGS_RESET:
      return state.withMutations(map => {
        map.set('query', null).set('sortBy', null);
      });

    default:
      return state;
  }
};
