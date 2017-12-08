import * as types from '../constants/Actions';
import { switchPage } from './PageActions';
import { storageSet } from '../utils/storage';
import { roundedTimestamp, setNagStatus } from '../utils/time';

const dispatchNagInit = nag => ({
  type: types.NAG_INIT,
  nag
});

const dispatchNagIndex = () => ({
  type: types.NAG_INDEX,
  nowTimestamp: roundedTimestamp()
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

const dispatchNagStatusUpdate = nag => ({
  type: types.NAG_STATUS_UPDATE,
  nag
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

export const nagIndex = noReset => (dispatch, getState) => {
  const state = getState();
  storageSet('nag', state.get('nag').toJS());
  if (!noReset) {
    dispatch(dispatchNagResets());
  }
  dispatch(dispatchNagIndex());
  dispatch(switchPage('Index'));
};

export const nagInit = nag => dispatch => {
  nag.list = nag.list.map(n => setNagStatus(n));
  dispatch(dispatchNagInit(nag));
  dispatch(nagIndex());
};

export const nagNew = () => dispatch => {
  dispatch(dispatchNagNew());
  dispatch(switchPage('NagForm'));
};

export const nagCreate = nag => dispatch => {
  const timestamp = roundedTimestamp();

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
};

export const nagEdit = nagId => dispatch => {
  dispatch(dispatchNagEdit(nagId));
  dispatch(switchPage('NagForm'));
};

export const nagUpdate = (nagId, nag) => (dispatch, getState) => {
  const state = getState();
  dispatch(
    dispatchNagUpdate(
      nagId,
      setNagStatus(
        Object.assign(
          {},
          state
            .getIn(['nag', 'list'])
            .find(nag => nag.get('id') === nagId)
            .toJS(),
          nag,
          { updatedAt: roundedTimestamp() }
        )
      )
    )
  );
  dispatch(nagIndex());
};

export const nagStatusUpdate = nagId => (dispatch, getState) => {
  const state = getState();
  dispatch(
    dispatchNagStatusUpdate(
      setNagStatus(
        state
          .getIn(['nag', 'list'])
          .find(nag => nag.get('id') === nagId)
          .toJS()
      )
    )
  );
  dispatch(nagIndex(true));
};

export const nagPause = nagId => dispatch => {
  dispatch(dispatchNagPause(nagId));
  dispatch(nagStatusUpdate(nagId));
};

export const nagResume = nagId => dispatch => {
  dispatch(dispatchNagResume(nagId));
  dispatch(nagStatusUpdate(nagId));
};

export const nagDelete = nagId => dispatch => {
  dispatch(dispatchNagDelete(nagId));
  dispatch(nagIndex(true));
};
export const nagsSearch = query => dispatch => {
  dispatch(dispatchNagsSearch(query));
  dispatch(nagIndex(true));
};

export const nagsSort = sortBy => dispatch => {
  dispatch(dispatchNagsSort(sortBy));
  dispatch(nagIndex(true));
};
