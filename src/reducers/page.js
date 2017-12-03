import { Map } from 'immutable';
import * as types from '../constants/Actions';

const initialState = Map({
  activePage: 'Index'
});

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SWITCH_PAGE:
      return state.withMutations(map => {
        map.set('activePage', action.activePage);
      });

    default:
      return state;
  }
}
