import { setNagStatus, roundedTimestamp } from './utils/time';
import { clearAndSetAllAlarms, setAlarm, clearAlarm } from './utils/alarm';
import { storageGet, storageSet } from './utils/storage';

const setAllAlarms = () => {
  storageGet('nag', nag => {
    if (nag.list.length) {
      nag.list = nag.list.map(n => setNagStatus(n));
      storageSet('nag', nag);
      clearAndSetAllAlarms(nag.list);
    }
  });
};

const setNagAlarm = nag => {
  if (nag.status === 'LIVE') {
    setAlarm(nag.id, nag.nextNag);
  } else {
    clearAlarm(nag.id);
  }
};

// Set Initial Alarms
setAllAlarms();

browser.alarms.onAlarm.addListener(alarm => {
  storageGet('nag', nagList => {
    let nagAlarmed = nagList.list.find(
      nag => nag.id === parseInt(alarm.name, 10)
    );

    browser.notifications.create({
      type: 'basic',
      iconUrl: 'icon128.png',
      title: 'Nagging You!',
      message: nagAlarmed.title,
      priority: 0
    });

    // Update nag's status, count and updated timestamp
    nagAlarmed = setNagStatus(nagAlarmed);
    const naggedCount = parseInt(nagAlarmed.naggedCount, 10);
    nagAlarmed.naggedCount = isNaN(naggedCount) ? 0 : naggedCount + 1;
    nagAlarmed.updatedAt = roundedTimestamp();

    nagList.list = nagList.list.map(
      nag => (nag.id === nagAlarmed.id ? nagAlarmed : nag)
    );

    storageSet('nag', nagList);
    setNagAlarm(nagAlarmed);
  });
});

browser.runtime.onMessage.addListener(request => {
  if (request.nagDeleted) {
    const nagId = request.nagId;
    storageGet('nag', nagList => {
      nagList.list = nagList.list.filter(nag => nag.id !== nagId);
      storageSet('nag', nagList);
      clearAlarm(nagId);
    });
  } else {
    const updatedNag = request.nag;
    if (updatedNag) {
      storageGet('nag', nagList => {
        nagList.list = nagList.list.map(
          nag => (nag.id === updatedNag.id ? updatedNag : nag)
        );
        storageSet('nag', nagList);
        setNagAlarm(updatedNag);
      });
    }
  }
});
