import * as types from '../constants/Actions';
import { switchPage } from './PageActions';

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

export const nagIndex = noReset => dispatch => {
  if (!noReset) {
    dispatch(dispatchNagResets());
  }
  dispatch(dispatchNagIndex());
  dispatch(switchPage('Index'));
};

export const nagNew = () => dispatch => {
  dispatch(dispatchNagNew());
  dispatch(switchPage('NagForm'));
};

export const nagCreate = nag => dispatch => {
  dispatch(
    dispatchNagCreate(
      Object.assign({}, nag, {
        id: Date.now(),
        createdAt: Date.now(),
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
};

export const nagPause = nagId => dispatch => {
  dispatch(dispatchNagPause(nagId));
  dispatch(dispatchNagStatusUpdate(nagId));
  dispatch(nagIndex(true));
};

export const nagResume = nagId => dispatch => {
  dispatch(dispatchNagResume(nagId));
  dispatch(dispatchNagStatusUpdate(nagId));
  dispatch(nagIndex(true));
};

export const nagDelete = nagId => dispatch => {
  dispatch(dispatchNagDelete(nagId));
  dispatch(nagIndex(true));
};

export const nagStatusUpdate = nagId => dispatch => {
  dispatch(dispatchNagStatusUpdate(nagId));
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
