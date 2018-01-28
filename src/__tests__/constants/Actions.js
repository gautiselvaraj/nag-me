import * as types from '../../constants/Actions';

const constants = [
  'NAG_INDEX',
  'NAG_INIT',
  'NAG_NEW',
  'NAG_CREATE',
  'NAG_EDIT',
  'NAG_UPDATE',
  'NAG_PAUSE',
  'NAG_RESUME',
  'NAG_DELETE',
  'NAG_STATUS_UPDATE',
  'NAGS_SEARCH',
  'NAGS_SORT',
  'NAGS_RESET'
];

describe('Constants', () => {
  it('has all constants defined', () => {
    expect(types).toBeDefined();
  });

  constants.forEach(c => {
    it(`has ${c} defined and matches`, () => {
      expect(types[c]).toBe(c);
    });
  });
});
