import { Map } from 'immutable';
import pageReducer from '../../reducers/page';
import * as types from '../../constants/Actions';

describe('page reducer', () => {
  it('should return the initial state', () => {
    expect(pageReducer(undefined, {}).toJS()).toEqual({ activePage: 'Index' });
  });

  describe('SWITCH_PAGE', () => {
    it('should return initialState when no state is passed', () => {
      expect(
        pageReducer(undefined, {
          type: types.SWITCH_PAGE,
          activePage: 'Index'
        }).toJS()
      ).toEqual({ activePage: 'Index' });
    });

    it('should return state with passed activePage', () => {
      expect(
        pageReducer(Map({ activePage: 'NagForm' }), {
          type: types.SWITCH_PAGE,
          activePage: 'Index'
        }).toJS()
      ).toEqual({ activePage: 'Index' });
    });
  });
});
