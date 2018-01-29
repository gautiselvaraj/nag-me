import { switchPage } from '../../actions/PageActions';
import * as types from '../../constants/Actions';

describe('Page Actions', () => {
  describe('switchPage', () => {
    it('should call dispatch with switch page action', () => {
      const activePage = 'Index';
      const dispatch = jest.fn();
      const getState = jest.fn();

      switchPage(activePage)(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith({
        type: types.SWITCH_PAGE,
        activePage
      });
    });
  });
});
