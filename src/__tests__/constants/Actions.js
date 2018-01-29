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
  it('should have defined constants', () => {
    expect(types).toBeDefined();
  });

  constants.forEach(c => {
    it(`should match ${c} constant`, () => {
      expect(types[c]).toBe(c);
    });
  });
});
