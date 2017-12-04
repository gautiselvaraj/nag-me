import * as types from '../constants/Actions';
import { switchPage } from './PageActions';
import { storageSet } from '../utils/storage';
import { alarmCreate, alarmClear, alarmClearAll } from '../utils/alarm';

const dispatchNagInit = nag => ({
  type: types.NAG_INIT,
  nag
});

const dispatchNagIndex = () => ({
  type: types.NAG_INDEX,
  nowTimestamp: Date.now()
});

const dispatchNagNew = () => ({
  type: types.NAG_NEW
});

const dispatchNagCreate = nag => ({
  type: types.NAG_CREATE,
  nag
});

const dispatchNagEdit = nagId => ({
  type: types.NAG_EDIT,
  nagId
});

const dispatchNagUpdate = (nagId, nag) => ({
  type: types.NAG_UPDATE,
  nagId,
  nag
});

const dispatchNagPause = nagId => ({
  type: types.NAG_PAUSE,
  nagId
});

const dispatchNagResume = nagId => ({
  type: types.NAG_RESUME,
  nagId
});

const dispatchNagDelete = nagId => ({
  type: types.NAG_DELETE,
  nagId
});

const dispatchNagStatusUpdate = nagId => ({
  type: types.NAG_STATUS_UPDATE,
  nagId
});

const dispatchNagsSearch = query => ({
  type: types.NAGS_SEARCH,
  query
});

const dispatchNagsSort = sortBy => ({
  type: types.NAGS_SORT,
  sortBy
});

const dispatchNagResets = () => ({
  type: types.NAGS_RESET
});

const clearAndSetAllAlarm = state => {
  alarmClearAll();
  state
    .getIn(['nag', 'list'])
    .toJS()
    .filter(nag => nag.status === 'LIVE')
    .forEach(nag => alarmCreate(nag.title, nag.nextNag));
};

const setAlarmForId = (nagId, state) => {
  const nag = state.getIn(['nag', 'list']).find(nag => nag.get('id') === nagId);
  alarmCreate(nag.get('title'), nag.get('nextNag'));
};

const clearAlarmForId = (nagId, state) =>
  alarmClear(
    state
      .getIn(['nag', 'list'])
      .find(nag => nag.get('id') === nagId)
      .get('title')
  );

export const nagIndex = noReset => (dispatch, getState) => {
  const state = getState();
  storageSet('nag', state.get('nag').toJS());
  if (!noReset) {
    dispatch(dispatchNagResets());
  }
  dispatch(dispatchNagIndex());
  dispatch(switchPage('Index'));
};

export const nagInit = nag => (dispatch, getState) => {
  dispatch(dispatchNagInit(nag));
  dispatch(nagIndex());
  clearAndSetAllAlarm(getState());
};

export const nagNew = () => dispatch => {
  dispatch(dispatchNagNew());
  dispatch(switchPage('NagForm'));
};

export const nagCreate = nag => (dispatch, getState) => {
  const timestamp = Date.now();

  dispatch(
    dispatchNagCreate(
      Object.assign({}, nag, {
        id: timestamp,
        createdAt: timestamp,
        status: 'LIVE',
        naggedCount: 0,
        updatedAt: null
      })
    )
  );
  dispatch(nagIndex());
  setAlarmForId(timestamp, getState());
};

export const nagEdit = nagId => dispatch => {
  dispatch(dispatchNagEdit(nagId));
  dispatch(switchPage('NagForm'));
};

export const nagUpdate = (nagId, nag) => (dispatch, getState) => {
  let state = getState();
  dispatch(
    dispatchNagUpdate(
      nagId,
      Object.assign(
        {},
        state
          .getIn(['nag', 'list'])
          .find(nag => nag.get('id') === nagId)
          .toJS(),
        nag,
        { updatedAt: Date.now() }
      )
    )
  );
  dispatch(nagIndex());

  state = getState();
  clearAlarmForId(nagId, state);
  setAlarmForId(nagId, state);
};

export const nagPause = nagId => (dispatch, getState) => {
  dispatch(dispatchNagPause(nagId));
  dispatch(nagIndex(true));
  clearAlarmForId(nagId, getState());
};

export const nagResume = nagId => (dispatch, getState) => {
  dispatch(dispatchNagResume(nagId));
  dispatch(nagIndex(true));
  setAlarmForId(nagId, getState());
};

export const nagDelete = nagId => (dispatch, getState) => {
  clearAlarmForId(nagId, getState());
  dispatch(dispatchNagDelete(nagId));
  dispatch(nagIndex(true));
};

export const nagStatusUpdate = nagId => (dispatch, getState) => {
  dispatch(dispatchNagStatusUpdate(nagId));
  dispatch(nagIndex(true));
  const state = getState();
  clearAlarmForId(nagId, state);
  setAlarmForId(nagId, state);
};

export const nagsSearch = query => dispatch => {
  dispatch(dispatchNagsSearch(query));
  dispatch(nagIndex(true));
};

export const nagsSort = sortBy => dispatch => {
  dispatch(dispatchNagsSort(sortBy));
  dispatch(nagIndex(true));
};
