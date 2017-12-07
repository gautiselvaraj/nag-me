/*global chrome*/

export const storageSet = (label, value) => {
  chrome.storage.sync.set({ [label]: JSON.stringify(value) });
};

export const storageGet = (label, callback) =>
  chrome.storage.sync.get([label], item => {
    const nagsFromStorage = item[label];
    if (nagsFromStorage) {
      return callback(JSON.parse(nagsFromStorage));
    }
  });
