/*global chrome*/

import { roundedTimestamp } from '../utils/time';

let domTimers = {};

const chromeAlarmAvailable = () =>
  typeof chrome !== 'undefined' && !!chrome.alarms;

const alarmCreate = (nagId, timestamp) => {
  const timeout = timestamp - roundedTimestamp();
  const delayInMinutes = Math.ceil(timeout / 60000);

  if (chromeAlarmAvailable()) {
    chrome.alarms.create(nagId.toString(), { delayInMinutes });
  } else {
    console.log(
      `No chrome alarm available, using setTimeout and logging for ${nagId}`
    );
    if (timeout < 2147483647) {
      let timer = setTimeout(() => {
        console.log(`Timeout Fired for ${nagId}`);
      }, timeout);
      domTimers[nagId] = timer;
    }
  }
};

const alarmClear = nagId => {
  if (chromeAlarmAvailable()) {
    chrome.alarms.clear(nagId);
  } else {
    console.log(`No chrome alarm available, clearing timeout for ${nagId}`);
    clearTimeout(domTimers[nagId]);
    delete domTimers[nagId];
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

export const clearAndSetAllAlarm = nagList => {
  alarmClearAll();
  nagList
    .filter(nag => nag.status === 'LIVE')
    .forEach(nag => alarmCreate(nag.id, nag.nextNag));
};

export const setAlarm = nag => alarmCreate(nag.id, nag.nextNag);

export const clearAlarm = nag => alarmClear(nag.id);
