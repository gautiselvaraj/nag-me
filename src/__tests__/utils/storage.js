import { storageSet, storageGet } from '../../utils/storage';

describe('Storage utils', () => {
  let storageSetMock, storageGetMock;

  beforeEach(() => {
    storageSetMock = jest.fn();
    storageGetMock = jest.fn(
      label =>
        new Promise((resolve, reject) => {
          setTimeout(resolve, 0, { [label[0]]: '"Value"' });
        })
    );

    window.browser.storage.sync = {
      set: storageSetMock,
      get: storageGetMock
    };
  });

  it('should call browser storage sync set', () => {
    const label = 'Label';
    const value = 'Value';
    storageSet(label, value);
    expect(storageSetMock.mock.calls.length).toBe(1);
    expect(storageSetMock.mock.calls[0][0]).toEqual({
      [label]: JSON.stringify(value)
    });
  });

  it('should call browser storage sync get', done => {
    const label = 'Label';
    function callback(value) {
      expect(value).toBe('Value');
      done();
    }

    storageGet(label, callback);
    expect(storageGetMock.mock.calls.length).toBe(1);
    expect(storageGetMock.mock.calls[0][0]).toEqual([label]);
  });
});
