import { storageSet, storageGet } from '../../utils/storage';

describe('Storage utils', () => {
  let storageSetMock, storageGetMock;

  beforeEach(() => {
    storageSetMock = jest.fn();
    storageGetMock = jest.fn();

    window.chrome.storage.sync = {
      set: storageSetMock,
      get: storageGetMock
    };
  });

  it('should call chrome storage sync set when storageSet is called', () => {
    const label = 'Label';
    const value = 'Value';
    storageSet(label, value);
    expect(storageSetMock.mock.calls.length).toBe(1);
    expect(storageSetMock.mock.calls[0][0]).toEqual({
      [label]: JSON.stringify(value)
    });
  });

  it('should call chrome storage sync get and callback function when storageGet is called', () => {
    const label = 'Label';
    storageGet(label);
    expect(storageGetMock.mock.calls.length).toBe(1);
    expect(storageGetMock.mock.calls[0][0]).toEqual([label]);
  });
});
