import {
  setAlarm,
  clearAlarm,
  clearAllAlarms,
  clearAndSetAllAlarms
} from '../../utils/alarm';

describe('Alarm utils', () => {
  let create, clear, clearAll;

  beforeEach(() => {
    create = jest.fn();
    clear = jest.fn();
    clearAll = jest.fn();

    window.chrome.alarms = {
      create,
      clear,
      clearAll
    };
  });

  it('should call chrome alarm setAlarm', () => {
    const alarmName = 'Alarm 1';
    setAlarm(alarmName, 1234567890);
    expect(create.mock.calls.length).toBe(1);
    expect(create.mock.calls[0][0]).toBe(alarmName);
  });

  it('should call chrome alarm clear', () => {
    clearAlarm(1);
    expect(clear.mock.calls.length).toBe(1);
    expect(clear.mock.calls[0][0]).toBe('1');
  });

  it('should call chrome alarm clearAll', () => {
    clearAllAlarms();
    expect(clearAll.mock.calls.length).toBe(1);
  });

  it('should call chrome alarm clearAll and set alarms for all nags passed', () => {
    const nagList = [
      {
        id: 1,
        title: 'Test Nag 1',
        firstNag: 1234567890,
        nextNag: 1234567890,
        repeats: '1 min',
        status: 'LIVE',
        createdAt: 1234567890
      },
      {
        id: 2,
        title: 'Test Nag 2',
        firstNag: 1234567891,
        nextNag: 1234567891,
        repeats: '10 min',
        status: 'PAUSED',
        createdAt: 1234567891
      },
      {
        id: 3,
        title: 'Test Nag 3',
        firstNag: 1234567892,
        nextNag: 1234567892,
        repeats: '4 hour',
        status: 'LIVE',
        createdAt: 1234567892
      }
    ];
    clearAndSetAllAlarms(nagList);
    expect(clearAll.mock.calls.length).toBe(1);
    expect(create.mock.calls.length).toBe(2);
  });
});
