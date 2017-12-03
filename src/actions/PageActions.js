import * as types from '../constants/Actions';

const dispatchSwitchPage = activePage => ({
  type: types.SWITCH_PAGE,
  activePage
});

export const switchPage = page => {
  return dispatch => dispatch(dispatchSwitchPage(page));
};
