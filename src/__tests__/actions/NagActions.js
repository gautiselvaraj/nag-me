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
    firstNag: 1517227842000,
    nextNag: 1517227742000,
    repeats: '1 min',
    status: 'LIVE'
  },
  {
    id: 2,
    title: 'Test Nag 2',
    firstNag: 1517227862000,
    nextNag: 1517227862000,
    repeats: '10 min',
    status: 'PAUSED'
  },
  {
    id: 3,
    title: 'Test Nag 3',
    firstNag: 1517227862000,
    nextNag: 1517227862000,
    repeats: '4 hour',
    status: 'LIVE'
  }
];

describe('Nag Actions', () => {
  let dispatch, getState, dateNow;

  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn(() =>
      mockStore(fromJS({ nag: { list: nagList } })).getState()
    );
  });

  beforeAll(() => {
    dateNow = window.Date.now;
    window.Date.now = jest.fn(() => 1517227842390);
  });

  afterAll(() => {
    window.Date.now = dateNow;
  });

  describe('nagIndex', () => {
    it('should call dispatch 3 times and match reset and index actions when called with false noreset', () => {
      nagIndex(false)(dispatch, getState);
      expect(dispatch.mock.calls.length).toBe(3);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: types.NAGS_RESET
      });
      expect(dispatch.mock.calls[1][0]).toEqual({
        type: types.NAG_INDEX,
        nowTimestamp: 1517227842000
      });
    });

    it('should call dispatch 2 times and match index action when called with true noreset', () => {
      nagIndex(true)(dispatch, getState);
      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: types.NAG_INDEX,
        nowTimestamp: 1517227842000
      });
    });
  });

  describe('nagInit', () => {
    it('should call dispatch 2 times and match init action when called with true empty nag list', () => {
      const nag = { list: [] };
      nagInit(nag)(dispatch);
      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: types.NAG_INIT,
        nag
      });
    });

    it('should call dispatch 2 times and match init action when called with true nag list', () => {
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
    it('should call dispatch 2 times and match new action', () => {
      nagNew()(dispatch);
      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: types.NAG_NEW
      });
    });
  });

  describe('nagCreate', () => {
    it('should call dispatch 2 times and match nag title and updated status', () => {
      const nag = nagList[1];
      nagCreate(nag)(dispatch, getState);

      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0].type).toBe(types.NAG_CREATE);
      expect(typeof dispatch.mock.calls[0][0].nag).toBe('object');
      expect(dispatch.mock.calls[0][0].nag.title).toBe('Test Nag 2');
      expect(dispatch.mock.calls[0][0].nag.status).toBe('LIVE');
    });
  });

  describe('nagEdit', () => {
    it('should call dispatch 2 times and match edit action', () => {
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
    it('should call dispatch 2 times and match update action', () => {
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
    it('should call dispatch 2 times and match status update action and have updated nextNag', () => {
      const nagId = nagList[0].id;
      nagStatusUpdate(nagId)(dispatch, getState);

      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0].type).toBe(types.NAG_STATUS_UPDATE);
      expect(typeof dispatch.mock.calls[0][0].nag).toBe('object');
      expect(dispatch.mock.calls[0][0].nag.nextNag).toBe(1517227862000);
    });
  });

  describe('nagPause', () => {
    it('should call dispatch 2 times and match pause action', () => {
      const nagId = nagList[0].id;
      nagPause(nagId)(dispatch, getState);

      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: types.NAG_PAUSE,
        nagId
      });
    });
  });

  describe('nagDelete', () => {
    it('should call dispatch 2 times and match delete action', () => {
      const nagId = nagList[0].id;
      nagDelete(nagId)(dispatch, getState);

      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: types.NAG_DELETE,
        nagId
      });
    });
  });

  describe('nagResume', () => {
    it('should call dispatch 2 times and match resumr action', () => {
      const nagId = nagList[0].id;
      nagResume(nagId)(dispatch, getState);

      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: types.NAG_RESUME,
        nagId
      });
    });
  });

  describe('nagsSearch', () => {
    it('should call dispatch 2 times and match search action', () => {
      const query = 'Search Query';
      nagsSearch(query)(dispatch);

      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: types.NAGS_SEARCH,
        query
      });
    });
  });

  describe('nagsSort', () => {
    it('should call dispatch 2 times and match sort action', () => {
      const sortBy = 'AZ';
      nagsSort(sortBy)(dispatch, getState);

      expect(dispatch.mock.calls.length).toBe(2);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: types.NAGS_SORT,
        sortBy
      });
    });
  });
});
