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
      status: 'PAUSED',
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
      status: 'PAUSED',
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

  describe('should handle NAG_INIT', () => {
    it('without state passed', () => {
      expect(
        nagReducer(undefined, {
          type: types.NAG_INIT,
          nag: populatedState
        }).toJS()
      ).toEqual(populatedState);
    });

    it('with state passed', () => {
      expect(
        nagReducer(initialState, {
          type: types.NAG_INIT,
          nag: populatedState
        }).toJS()
      ).toEqual(populatedState);
    });
  });

  describe('should handle NAG_INDEX', () => {
    it('with no search query and sort by set', () => {
      const returnedNagVisibleList = nagReducer(fromJS(populatedState), {
        type: types.NAG_INDEX
      }).toJS().visibleList;
      expect(returnedNagVisibleList.PAUSED).toEqual(populatedState.list);
    });

    describe('search', () => {
      it('with search query should return nags match the query', () => {
        const stateWithQuery = Object.assign({}, populatedState, { query: 3 });
        const returnedNagVisibleList = nagReducer(fromJS(stateWithQuery), {
          type: types.NAG_INDEX
        }).toJS().visibleList;
        expect(returnedNagVisibleList.PAUSED).toEqual(
          nagList.list.filter(n => n.id === 3)
        );
      });

      it('with search query that dont match should return no results', () => {
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
      it('with sort by latest is set should return nags with proper sort order', () => {
        const stateWithSortBy = Object.assign({}, populatedState, {
          sortBy: 'latest'
        });
        const returnedNagVisibleList = nagReducer(fromJS(stateWithSortBy), {
          type: types.NAG_INDEX
        }).toJS().visibleList;
        expect(returnedNagVisibleList.PAUSED[0]).toEqual(nagList.list[2]);
      });

      it('with sort by ZA is set should return nags with proper sort order', () => {
        const stateWithSortBy = Object.assign({}, populatedState, {
          sortBy: 'ZA'
        });
        const returnedNagVisibleList = nagReducer(fromJS(stateWithSortBy), {
          type: types.NAG_INDEX
        }).toJS().visibleList;
        expect(returnedNagVisibleList.PAUSED[2]).toEqual(nagList.list[0]);
      });
    });
  });

  describe('should handle NAG_NEW', () => {
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

  describe('should handle NAG_CREATE', () => {
    it('should add new nag to start of list', () => {
      const newNag = { id: 4, title: 'Nag Title 4' };
      const returnedNagList = nagReducer(fromJS(populatedState), {
        type: types.NAG_CREATE,
        nag: newNag
      }).toJS().list;
      expect(returnedNagList.length).toBe(4);
      expect(returnedNagList[0]).toEqual(newNag);
    });
  });

  describe('should handle NAG_Edit', () => {
    it('should return state with editNagId', () => {
      expect(
        nagReducer(fromJS(populatedState), {
          type: types.NAG_EDIT,
          nagId: 3
        }).toJS().editNagId
      ).toBe(3);
    });
  });

  describe('should handle NAG_UPDATE', () => {
    it('should update nag with passed attributes', () => {
      const updateNag = { id: 1, title: 'Updated Nag Title 1' };
      const returnedNagList = nagReducer(fromJS(populatedState), {
        type: types.NAG_UPDATE,
        nag: updateNag,
        nagId: updateNag.id
      }).toJS().list;
      expect(returnedNagList[0].title).toEqual('Updated Nag Title 1');
    });
  });

  describe('should handle NAG_PAUSE', () => {
    it('should pause the passed nag', () => {
      const stateWithSortBy = Object.assign({}, populatedState, {
        list: nagList.list.map(n => Object.assign({}, n, { status: 'LIVE' }))
      });
      expect(stateWithSortBy.list[0].status).toEqual('LIVE');
      const returnedNagList = nagReducer(fromJS(populatedState), {
        type: types.NAG_PAUSE,
        nagId: stateWithSortBy.list[0].id
      }).toJS().list;
      expect(returnedNagList[0].status).toEqual('PAUSED');
    });
  });

  describe('should handle NAG_RESUME', () => {
    it('should pause the passed nag', () => {
      expect(populatedState.list[0].status).toEqual('PAUSED');
      const returnedNagList = nagReducer(fromJS(populatedState), {
        type: types.NAG_RESUME,
        nagId: populatedState.list[0].id
      }).toJS().list;
      expect(returnedNagList[0].status).toEqual('LIVE');
    });
  });

  describe('should handle NAG_DELETE', () => {
    it('should delete the passed nag', () => {
      const returnedNagList = nagReducer(fromJS(populatedState), {
        type: types.NAG_DELETE,
        nagId: populatedState.list[0].id
      }).toJS().list;
      expect(returnedNagList.length).toBe(2);
      expect(returnedNagList[0]).toEqual(populatedState.list[1]);
    });
  });

  describe('should handle NAG_STATUS_UPDATE', () => {
    it("should update nag's status with passed attributes", () => {
      const statusUpdatedNag = { id: 1, status: 'LIVE' };
      const returnedNagList = nagReducer(fromJS(populatedState), {
        type: types.NAG_STATUS_UPDATE,
        nag: statusUpdatedNag
      }).toJS().list;
      expect(returnedNagList[0].status).toEqual('LIVE');
    });
  });

  describe('should handle NAGS_SEARCH', () => {
    it('should update query in nag state', () => {
      expect(
        nagReducer(fromJS(populatedState), {
          type: types.NAGS_SEARCH,
          query: 'search'
        }).toJS().query
      ).toBe('search');
    });
  });

  describe('should handle NAGS_SORT', () => {
    it('should update sortBy in nag state', () => {
      expect(
        nagReducer(fromJS(populatedState), {
          type: types.NAGS_SORT,
          sortBy: 'AZ'
        }).toJS().sortBy
      ).toBe('AZ');
    });
  });

  describe('should handle NAGS_RESET', () => {
    it('should reset query and sortBy in nag state', () => {
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
