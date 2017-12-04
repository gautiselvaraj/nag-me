/*global chrome*/

import { roundedTimestamp } from '../utils/time';

let domTimers = {};

const chromeAlarmAvailable = () =>
  typeof chrome !== 'undefined' && !!chrome.alarms;

export const alarmCreate = (nagTitle, timestamp) => {
  const timeout = timestamp - roundedTimestamp();
  const delayInMinutes = Math.ceil(timeout / 60000);

  if (chromeAlarmAvailable()) {
    chrome.alarms.create(nagTitle, { delayInMinutes });
  } else {
    console.log(
      `No chrome alarm available, using setTimeout and logging for ${nagTitle}`
    );
    if (timeout < 2147483647) {
      let timer = setTimeout(() => {
        console.log(`Timeout Fired for ${nagTitle}`);
      }, timeout);
      domTimers[nagTitle] = timer;
    }
  }
};

export const alarmClear = nagTitle => {
  if (chromeAlarmAvailable()) {
    chrome.alarms.clear(nagTitle);
  } else {
    console.log(`No chrome alarm available, clearing timeout for ${nagTitle}`);
    clearTimeout(domTimers[nagTitle]);
    delete domTimers[nagTitle];
  }
};

export const alarmClearAll = () => {
  if (chromeAlarmAvailable()) {
    chrome.alarms.clearAll();
  } else {
    console.log('No chrome alarm available, clearing all timeouts');
    Object.keys(domTimers).forEach(k => clearTimeout(domTimers[k]));
    domTimers = {};
  }
};
