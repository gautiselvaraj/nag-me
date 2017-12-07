import { setNagStatus } from './utils/time';
import { clearAndSetAllAlarms, setAlarm } from './utils/alarm';
import { storageGet, storageSet } from './utils/storage';

const getStoredNagList = callback => {
  storageGet('nag', callback);
};

const setAllAlarms = () => {
  getStoredNagList(nag => {
    if (nag.list.length) {
      nag.list = nag.list.map(n => setNagStatus(n));
      storageSet('nag', nag);
      clearAndSetAllAlarms(nag.list);
    }
  });
};

// Set Initial Alarms
setAllAlarms();

chrome.alarms.onAlarm.addListener(alarm => {
  storageGet('nag', nag => {
    const nagAlarmed = nag.list.find(
      nag => nag.id === parseInt(alarm.name, 10)
    );

    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon128.png',
      title: 'Nagging You!',
      message: nagAlarmed.title,
      priority: 0
    });

    setAllAlarms();

    // setNagStatus(nagAlarmed);
    // console.log(nagAlarmed);
    // if(nagAlarmed.status === 'LIVE') {
    //   setAlarm(nagAlarmed);
    // }
  });
});
