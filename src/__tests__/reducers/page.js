import { Map } from 'immutable';
import pageReducer from '../../reducers/page';
import * as types from '../../constants/Actions';

describe('page reducer', () => {
  it('should return the initial state', () => {
    expect(pageReducer(undefined, {}).toJS()).toEqual({ activePage: 'Index' });
  });

  it('should handle SWITCH_PAGE without state passed', () => {
    expect(
      pageReducer(undefined, {
        type: types.SWITCH_PAGE,
        activePage: 'Index'
      }).toJS()
    ).toEqual({ activePage: 'Index' });
  });

  it('should handle SWITCH_PAGE with state passed', () => {
    expect(
      pageReducer(Map({ activePage: 'NagForm' }), {
        type: types.SWITCH_PAGE,
        activePage: 'Index'
      }).toJS()
    ).toEqual({ activePage: 'Index' });
  });
});
