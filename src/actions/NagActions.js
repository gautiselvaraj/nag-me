import * as types from '../constants/Actions';
import {switchPage} from  './PageActions';

const dispatchNagIndex = () => ({
  type: types.NAG_INDEX
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

export const nagIndex = () =>
  dispatch => {
    dispatch(dispatchNagIndex());
    dispatch(switchPage('Index'));
  }

export const nagNew = () =>
  dispatch => {
    dispatch(dispatchNagNew());
    dispatch(switchPage('NagForm'));
  }

export const nagCreate = nag =>
  dispatch => {
    dispatch(dispatchNagCreate(Object.assign({}, nag, {id: Date.now(), createdAt: Date.now(), paused: false, naggedcount: 0})));
    dispatch(switchPage('Index'));
  };

export const nagEdit = nagId =>
  dispatch => {
    dispatch(dispatchNagEdit(nagId));
    dispatch(switchPage('NagForm'));
  };

export const nagUpdate = (nagId, nag) =>
  (dispatch, getState) => {
    const state = getState();
    dispatch(dispatchNagUpdate(nagId, Object.assign({}, state.getIn(['nag', 'list']).find(nag => nag.get('id') === nagId).toJS(), nag, {updatedAt: Date.now()})));
    dispatch(switchPage('Index'));
  };

export const nagPause = nagId =>
  dispatch => dispatch(dispatchNagPause(nagId));

export const nagResume = nagId =>
  dispatch => dispatch(dispatchNagResume(nagId));

export const nagDelete = nagId =>
  dispatch => dispatch(dispatchNagDelete(nagId));
