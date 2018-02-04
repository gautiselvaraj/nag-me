/*global browser*/

export const storageSet = (label, value) => {
  browser.storage.sync.set({ [label]: JSON.stringify(value) });
};

export const storageGet = (label, callback) =>
  browser.storage.sync.get([label]).then(item => {
    const nagsFromStorage = item[label];
    if (nagsFromStorage) {
      return callback(JSON.parse(nagsFromStorage));
    }
  });
