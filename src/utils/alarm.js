/*global chrome*/

import { roundedTimestamp } from '../utils/time';

export const setAlarm = (nagId, timestamp) => {
  const delayInMinutes = Math.ceil((timestamp - roundedTimestamp()) / 60000);
  chrome.alarms.create(nagId.toString(), { delayInMinutes });
};

export const clearAlarm = nagId => {
  chrome.alarms.clear(nagId.toString());
};

export const clearAllAlarms = () => {
  chrome.alarms.clearAll();
};

export const clearAndSetAllAlarms = nagList => {
  clearAllAlarms();
  nagList
    .filter(nag => nag.status === 'LIVE')
    .forEach(nag => setAlarm(nag.id, nag.nextNag));
};
