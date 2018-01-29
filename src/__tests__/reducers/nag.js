import { Map, fromJS } from 'immutable';
import nagReducer from '../../reducers/nag';
import * as types from '../../constants/Actions';

const initialState = {
  editNagId: null,
  list: [],
  visibleList: {},
  query: null,
  sortBy: null,
  status: null
};

const nagList = {
  list: [
    {
      id: 1,
      title: 'Test Nag 1',
      firstNag: 1234567890,
      nextNag: 1234567890,
      repeats: '1 min',
      status: 'LIVE',
      createdAt: 1234567890
    },
    {
      id: 2,
      title: 'Test Nag 2',
      firstNag: 1234567891,
      nextNag: 1234567891,
      repeats: '10 min',
      status: 'PAUSED',
      createdAt: 1234567891
    },
    {
      id: 3,
      title: 'Test Nag 3',
      firstNag: 1234567892,
      nextNag: 1234567892,
      repeats: '4 hour',
      status: 'LIVE',
      createdAt: 1234567892
    }
  ]
};

describe('nag reducer', () => {
  let populatedState;
  beforeEach(() => {
    populatedState = Object.assign({}, initialState, nagList);
  });

  it('should return the initial state', () => {
    expect(nagReducer(undefined, {}).toJS()).toEqual(initialState);
  });

  describe('NAG_INIT', () => {
    it('should return initialState when no state is passed', () => {
      expect(
        nagReducer(undefined, {
          type: types.NAG_INIT,
          nag: populatedState
        }).toJS()
      ).toEqual(populatedState);
    });

    it('should return state with passed nag', () => {
      expect(
        nagReducer(initialState, {
          type: types.NAG_INIT,
          nag: populatedState
        }).toJS()
      ).toEqual(populatedState);
    });
  });

  describe('NAG_INDEX', () => {
    it('should return grouped visible list when no query and sortBy set', () => {
      const returnedNagVisibleList = nagReducer(fromJS(populatedState), {
        type: types.NAG_INDEX
      }).toJS().visibleList;
      expect(returnedNagVisibleList.LIVE).toEqual(
        populatedState.list.filter(n => n.status === 'LIVE')
      );
      expect(returnedNagVisibleList.PAUSED).toEqual(
        populatedState.list.filter(n => n.status === 'PAUSED')
      );
    });

    describe('search', () => {
      it('should return searched grouped visible list when query is set', () => {
        const stateWithQuery = Object.assign({}, populatedState, { query: 3 });
        const returnedNagVisibleList = nagReducer(fromJS(stateWithQuery), {
          type: types.NAG_INDEX
        }).toJS().visibleList;
        expect(returnedNagVisibleList.LIVE).toEqual(
          nagList.list.filter(n => n.id === 3)
        );
      });

      it('should return empty visible list when non matched query is set', () => {
        const stateWithQuery = Object.assign({}, populatedState, {
          query: 'No match'
        });
        const returnedNagVisibleList = nagReducer(fromJS(stateWithQuery), {
          type: types.NAG_INDEX
        }).toJS().visibleList;
        expect(returnedNagVisibleList).toEqual({});
      });
    });

    describe('sort', () => {
      it('should return sorted grouped visible list when sortBy is set', () => {
        let returnedNagVisibleList = nagReducer(
          fromJS(
            Object.assign({}, populatedState, {
              sortBy: 'latest'
            })
          ),
          {
            type: types.NAG_INDEX
          }
        ).toJS().visibleList;
        expect(returnedNagVisibleList.LIVE[0]).toEqual(nagList.list[2]);

        returnedNagVisibleList = nagReducer(
          fromJS(
            Object.assign({}, populatedState, {
              sortBy: 'ZA'
            })
          ),
          {
            type: types.NAG_INDEX
          }
        ).toJS().visibleList;
        expect(returnedNagVisibleList.LIVE[1]).toEqual(nagList.list[0]);
      });
    });
  });

  describe('NAG_NEW', () => {
    it('should return state with editNagId null', () => {
      const stateWithEditNagIdSet = Object.assign({}, populatedState, {
        editNagId: 3
      });
      expect(
        nagReducer(fromJS(stateWithEditNagIdSet), {
          type: types.NAG_NEW
        }).toJS().editNagId
      ).toBeNull();
    });
  });

  describe('NAG_CREATE', () => {
    it('should return state with new nag added to start of nag list', () => {
      const newNag = { id: 4, title: 'Nag Title 4' };
      const returnedNagList = nagReducer(fromJS(populatedState), {
        type: types.NAG_CREATE,
        nag: newNag
      }).toJS().list;
      expect(returnedNagList.length).toBe(4);
      expect(returnedNagList[0]).toEqual(newNag);
    });
  });

  describe('NAG_EDIT', () => {
    it('should return state with passed editNagId', () => {
      expect(
        nagReducer(fromJS(populatedState), {
          type: types.NAG_EDIT,
          nagId: 3
        }).toJS().editNagId
      ).toBe(3);
    });
  });

  describe('NAG_UPDATE', () => {
    it('should return state with updated nag', () => {
      const updateNag = { id: 1, title: 'Updated Nag Title 1' };
      const returnedNagList = nagReducer(fromJS(populatedState), {
        type: types.NAG_UPDATE,
        nag: updateNag,
        nagId: updateNag.id
      }).toJS().list;
      expect(returnedNagList[0].title).toEqual('Updated Nag Title 1');
    });
  });

  describe('NAG_PAUSE', () => {
    it('should return state with paused nag', () => {
      const returnedNagList = nagReducer(fromJS(populatedState), {
        type: types.NAG_PAUSE,
        nagId: populatedState.list[0].id
      }).toJS().list;
      expect(returnedNagList[0].status).toEqual('PAUSED');
    });
  });

  describe('NAG_RESUME', () => {
    it('should return state with resumed nag', () => {
      const returnedNagList = nagReducer(fromJS(populatedState), {
        type: types.NAG_RESUME,
        nagId: populatedState.list[1].id
      }).toJS().list;
      expect(returnedNagList[0].status).toEqual('LIVE');
    });
  });

  describe('NAG_DELETE', () => {
    it('should return state with nag deleted', () => {
      const returnedNagList = nagReducer(fromJS(populatedState), {
        type: types.NAG_DELETE,
        nagId: populatedState.list[0].id
      }).toJS().list;
      expect(returnedNagList.length).toBe(2);
      expect(returnedNagList[0]).toEqual(populatedState.list[1]);
    });
  });

  describe('NAG_STATUS_UPDATE', () => {
    it("should return state with nag's status updated", () => {
      const statusUpdatedNag = { id: 1, status: 'COMPLETED' };
      const returnedNagList = nagReducer(fromJS(populatedState), {
        type: types.NAG_STATUS_UPDATE,
        nag: statusUpdatedNag
      }).toJS().list;
      expect(returnedNagList[0].status).toEqual('COMPLETED');
    });
  });

  describe('NAGS_SEARCH', () => {
    it('should return state with query', () => {
      expect(
        nagReducer(fromJS(populatedState), {
          type: types.NAGS_SEARCH,
          query: 'search'
        }).toJS().query
      ).toBe('search');
    });
  });

  describe('NAGS_SORT', () => {
    it('should return state with sortBy', () => {
      expect(
        nagReducer(fromJS(populatedState), {
          type: types.NAGS_SORT,
          sortBy: 'AZ'
        }).toJS().sortBy
      ).toBe('AZ');
    });
  });

  describe('NAGS_RESET', () => {
    it('should return state with query and sortBy reset', () => {
      const stateWithSearchAndSortBy = Object.assign({}, populatedState, {
        query: 'search',
        sortBy: 'AZ'
      });
      const returnedNagState = nagReducer(fromJS(stateWithSearchAndSortBy), {
        type: types.NAGS_RESET
      }).toJS();
      expect(returnedNagState.sortBy).toBeNull();
      expect(returnedNagState.query).toBeNull();
    });
  });
});
