import { media } from '../../utils/style';

describe('Style utils', () => {
  it('should return responsive style helper object', () => {
    expect(media.giant).toBeDefined();
    expect(media.desktop).toBeDefined();
    expect(media.tablet).toBeDefined();
  });
});
