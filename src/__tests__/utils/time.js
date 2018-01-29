import {
  roundedTimestamp,
  humanizeNextNag,
  nagRepeatText,
  repeatsToMomentChar,
  nextNagTimestamp,
  previousNagTimestamp,
  setNagStatus,
  progressCheck
} from '../../utils/time';

describe('Time utils', () => {
  let dateNowMock, dateNow;

  beforeEach(() => {
    dateNowMock = jest.fn(() => 1517227842390);
    dateNow = window.Date.now;
    window.Date.now = dateNowMock;
  });

  afterEach(() => {
    window.Date.now = dateNow;
  });

  it('should return rounded Timestamp when roundedTimestamp is called', () => {
    expect(roundedTimestamp()).toBe(1517227842000);
  });

  it('should return humanize time when humanizeNextNag is called', () => {
    expect(humanizeNextNag(60000)).toBe('1 minute');
    expect(humanizeNextNag(360000)).toBe('6 minutes');
    expect(humanizeNextNag(3600000)).toBe('~ 1 hour');
    expect(humanizeNextNag(7200000)).toBe('~ 2 hours');
  });

  it('should return nag repeat text when nagRepeatText is called', () => {
    expect(nagRepeatText('60 min')).toBe('60 minutes');
    expect(nagRepeatText('1 hour')).toBe('1 hour');
    expect(nagRepeatText('10 day')).toBe('10 days');
  });

  it('should return moment repeat character when repeatsToMomentChar is called', () => {
    expect(repeatsToMomentChar('month')).toBe('M');
    expect(repeatsToMomentChar('day')).toBe('d');
    expect(repeatsToMomentChar('hour')).toBe('h');
    expect(repeatsToMomentChar('minute')).toBe('m');
  });

  it('should return next nag when nextNagTimestamp is called with curernt next nag and repeats', () => {
    expect(nextNagTimestamp(1517226842000, '1 min')).toBe(1517227862000);
    expect(nextNagTimestamp(1517226842000, '10 hour')).toBe(1517262842000);
    expect(nextNagTimestamp(1517226842000, '25 day')).toBe(1519386842000);
    expect(nextNagTimestamp(1517226842000, '2 month')).toBe(1522324442000);
    expect(nextNagTimestamp(1517226842000, '25 week')).toBe(1532350442000);
    expect(nextNagTimestamp(1517226842000, '4 year')).toBe(1643457242000);
  });

  it('should return previous nag when previousNagTimestamp is called with next nag and repeats', () => {
    expect(previousNagTimestamp(1517226842000, '1 min')).toBe(1517226782000);
    expect(previousNagTimestamp(1517226842000, '10 hour')).toBe(1517190842000);
    expect(previousNagTimestamp(1517226842000, '25 day')).toBe(1515066842000);
    expect(previousNagTimestamp(1517226842000, '2 month')).toBe(1511956442000);
    expect(previousNagTimestamp(1517226842000, '25 week')).toBe(1502110442000);
    expect(previousNagTimestamp(1517226842000, '4 year')).toBe(1390996442000);
  });

  it('should return nag with updated status when setNagStatus is called', () => {
    let nag = {
      id: 1,
      title: 'Test Nag 1',
      firstNag: 1517226832000,
      nextNag: 1517226842000,
      repeats: '1 min',
      status: 'PAUSED',
      createdAt: 1517226832000
    };
    expect(setNagStatus(nag)).toBe(nag);

    nag.status = 'COMPLETED';
    expect(setNagStatus(nag)).toBe(nag);

    nag.status = 'LIVE';
    expect(setNagStatus(nag).nextNag).toBe(1517227862000);

    nag.repeats = '10 hour';
    expect(setNagStatus(nag).nextNag).toBe(1517262842000);

    nag.repeats = '25 day';
    expect(setNagStatus(nag).nextNag).toBe(1519386842000);

    nag.repeats = '2 month';
    expect(setNagStatus(nag).nextNag).toBe(1522324442000);

    nag.repeats = '25 week';
    expect(setNagStatus(nag).nextNag).toBe(1532350442000);

    nag.repeats = '10 year';
    expect(setNagStatus(nag).nextNag).toBe(1832759642000);

    nag.repeats = null;
    expect(setNagStatus(nag).status).toBe('COMPLETED');

    nag.status = 'LIVE';
    nag.nextNag = 1517327842000;
    nag.repeats = '1 min';
    expect(setNagStatus(nag).nextNag).toBe(1517327842000);
  });

  it('should return nag with updated status when setNagStatus is called', () => {
    let nag = {
      id: 1,
      title: 'Test Nag 1',
      firstNag: 1517226832000,
      nextNag: 1517227862000,
      repeats: '1 min',
      status: 'LIVE',
      createdAt: 1517226832000
    };
    expect(progressCheck(nag)).toBe('66.66666666666666%');

    nag.repeats = null;
    expect(progressCheck(nag)).toBe('98.05825242718447%');

    nag.nextNag = 1522324442000;
    expect(progressCheck(nag)).toBe('0.01981320658112331%');

    nag.repeats = '10 year';
    expect(progressCheck(nag)).toBe('98.3847638026855%');
  });
});
