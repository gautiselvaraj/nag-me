import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import {
  nagIndex,
  nagInit,
  nagNew,
  nagCreate,
  nagEdit,
  nagUpdate,
  nagStatusUpdate,
  nagPause,
  nagDelete,
  nagResume,
  nagsSearch,
  nagsSort
} from '../../actions/NagActions';
import * as types from '../../constants/Actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const nagList = [
  {
    id: 1,
    title: 'Test Nag 1',
    firstNag: 1234567890,
    nextNag: 1234567890,
    repeats: '1 min',
    status: 'PAUSED'
  },
  {
    id: 2,
    title: 'Test Nag 2',
    firstNag: 1234567890,
    nextNag: 1234567890,
    repeats: '10 min',
    status: 'PAUSED'
  },
  {
    id: 3,
    title: 'Test Nag 3',
    firstNag: 1234567890,
    nextNag: 1234567890,
    repeats: '4 hour',
    status: 'PAUSED'
  }
];

describe('Nag Actions', () => {
  let dispatch, getState;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn(() =>
      mockStore(fromJS({ nag: { list: nagList } })).getState()
    );
  });

  describe('nagIndex', () => {
    it('must call dispatch 3 times and match actions when noreset is false', () => {
      nagIndex(false)(dispatch, getState);
      expect(dispatch.mock.calls.length).toBe(3);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: types.NAGS_RESET
      });
      expect(dispatch.mock.calls[1][0].type).toBe(types.NAG_INDEX);
      expect(typeof dispatch.mock.calls[1][0].nowTimestamp).toBe('number');
    });

    it('must call dispatch 2 times and match actions when noreset is true', () => {
      nagIndex(true)(dispatch, getState);
      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0].type).toBe(types.NAG_INDEX);
      expect(typeof dispatch.mock.calls[0][0].nowTimestamp).toBe('number');
    });
  });

  describe('nagInit', () => {
    it('must call dispatch 2 times and match actions when empty nag list is passed', () => {
      const nag = { list: [] };
      nagInit(nag)(dispatch);
      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: types.NAG_INIT,
        nag
      });
    });

    it('must call dispatch 2 times and match actions when empty nag list is with arguments', () => {
      const nag = { list: nagList };
      nagInit(nag)(dispatch);
      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: types.NAG_INIT,
        nag
      });
    });
  });

  describe('nagNew', () => {
    it('must call dispatch 2 times and match actions', () => {
      nagNew()(dispatch);
      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: types.NAG_NEW
      });
    });
  });

  describe('nagCreate', () => {
    it('must call dispatch 2 times and match actions', () => {
      const nag = nagList[0];
      nagCreate(nag)(dispatch, getState);

      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0].type).toBe(types.NAG_CREATE);
      expect(typeof dispatch.mock.calls[0][0].nag).toBe('object');
      expect(dispatch.mock.calls[0][0].nag.title).toBe('Test Nag 1');
      expect(dispatch.mock.calls[0][0].nag.status).toBe('LIVE');
    });
  });

  describe('nagEdit', () => {
    it('must call dispatch 2 times and match actions', () => {
      const nagId = nagList[0].id;
      nagEdit(nagId)(dispatch);
      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: types.NAG_EDIT,
        nagId
      });
    });
  });

  describe('nagUpdate', () => {
    it('must call dispatch 2 times and match actions', () => {
      const nag = Object.assign({}, nagList[0], { title: 'Updated Title 1' });
      const nagId = nagList[0].id;
      nagUpdate(nagId, nag)(dispatch, getState);

      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0].type).toBe(types.NAG_UPDATE);
      expect(typeof dispatch.mock.calls[0][0].nag).toBe('object');
      expect(dispatch.mock.calls[0][0].nag.title).toBe('Updated Title 1');
    });
  });

  describe('nagStatusUpdate', () => {
    it('must call dispatch 2 times and match actions', () => {
      const nagId = nagList[0].id;
      nagStatusUpdate(nagId)(dispatch, getState);

      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0].type).toBe(types.NAG_STATUS_UPDATE);
      expect(typeof dispatch.mock.calls[0][0].nag).toBe('object');
      expect(dispatch.mock.calls[0][0].nag.title).toBe('Test Nag 1');
    });
  });

  describe('nagPause', () => {
    it('must call dispatch 2 times and match actions', () => {
      const nagId = nagList[0].id;
      nagPause(nagId)(dispatch, getState);

      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0].type).toBe(types.NAG_PAUSE);
      expect(dispatch.mock.calls[0][0].nagId).toBe(nagId);
    });
  });

  describe('nagDelete', () => {
    it('must call dispatch 2 times and match actions', () => {
      const nagId = nagList[0].id;
      nagDelete(nagId)(dispatch, getState);

      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0].type).toBe(types.NAG_DELETE);
      expect(dispatch.mock.calls[0][0].nagId).toBe(nagId);
    });
  });

  describe('nagResume', () => {
    it('must call dispatch 2 times and match actions', () => {
      const nagId = nagList[0].id;
      nagResume(nagId)(dispatch, getState);

      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0].type).toBe(types.NAG_RESUME);
      expect(dispatch.mock.calls[0][0].nagId).toBe(nagId);
    });
  });

  describe('nagsSearch', () => {
    it('must call dispatch 2 times and match actions', () => {
      const query = 'Search Query';
      nagsSearch(query)(dispatch);

      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0].type).toBe(types.NAGS_SEARCH);
      expect(dispatch.mock.calls[0][0].query).toBe(query);
    });
  });

  describe('nagsSort', () => {
    it('must call dispatch 2 times and match actions', () => {
      const sortBy = 'A-Z';
      nagsSort(sortBy)(dispatch, getState);

      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0].type).toBe(types.NAGS_SORT);
      expect(dispatch.mock.calls[0][0].sortBy).toBe(sortBy);
    });
  });
});
