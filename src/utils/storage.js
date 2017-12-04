/*global chrome*/

const chromeStorageAvailable = () =>
  typeof chrome !== 'undefined' && !!chrome.storage;
const localStorageAvailable = () => typeof localStorage !== 'undefined';

export const storageSet = (label, value) => {
  value = JSON.stringify(value);
  if (chromeStorageAvailable()) {
    chrome.storage.sync.set({ [label]: value });
  } else if (localStorageAvailable) {
    localStorage.setItem(label, value);
  }
};

export const storageGet = (label, callback) => {
  if (chromeStorageAvailable()) {
    return chrome.storage.sync.get([label], item =>
      callback(JSON.parse(item[label]))
    );
  } else if (localStorageAvailable) {
    return callback(JSON.parse(localStorage.getItem(label)));
  }
};