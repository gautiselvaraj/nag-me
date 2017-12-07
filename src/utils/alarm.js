/*global chrome*/

import { roundedTimestamp } from '../utils/time';

const alarmCreate = (nagId, timestamp) => {
  const delayInMinutes = Math.ceil((timestamp - roundedTimestamp()) / 60000);
  chrome.alarms.create(nagId.toString(), { delayInMinutes });
};

const alarmClear = nagId => {
  chrome.alarms.clear(nagId);
};

export const alarmClearAll = () => {
  chrome.alarms.clearAll();
};

export const clearAndSetAllAlarm = nagList => {
  alarmClearAll();
  nagList
    .filter(nag => nag.status === 'LIVE')
    .forEach(nag => alarmCreate(nag.id, nag.nextNag));
};

export const setAlarm = nag => alarmCreate(nag.id, nag.nextNag);

export const clearAlarm = nag => alarmClear(nag.id);
