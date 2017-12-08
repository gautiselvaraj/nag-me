import humanizeDuration from 'humanize-duration';
import moment from 'moment';

export const roundedTimestamp = () => Math.round(Date.now() / 1000) * 1000;

export const humanizeNextNag = timestamp => {
  let largest = 1;
  let separator = '~ ';

  if (timestamp < 3600000) {
    largest = 2;
    separator = '';
  }

  return `${separator}${humanizeDuration(timestamp, {
    largest,
    delimiter: ' and ',
    round: true
  })}`;
};

export const nagRepeatText = nagRepeat => {
  const [number, type] = nagRepeat.split(' ');
  return `${number} ${type === 'min' ? 'minute' : type}${
    parseInt(number, 10) === 1 ? '' : 's'
  }`;
};

export const repeatsToMomentChar = repeatType =>
  repeatType === 'month' ? 'M' : repeatType[0];

export const nextNagTimestamp = (currentNextNag, repeats) => {
  const [repeatNumber, repeatType] = repeats.split(' ');
  const momentAddChar = repeatsToMomentChar(repeatType);
  const nowTimestamp = roundedTimestamp();
  let timestamp = moment(currentNextNag);

  do {
    timestamp.add(repeatNumber, momentAddChar);
  } while (timestamp.valueOf() < nowTimestamp);
  return timestamp.valueOf();
};

export const previousNagTimestamp = (nextNag, repeats) => {
  const [repeatNumber, repeatType] = repeats.split(' ');
  const momentAddChar = repeatsToMomentChar(repeatType);

  return moment(nextNag)
    .subtract(repeatNumber, momentAddChar)
    .valueOf();
};

export const setNagStatus = nag => {
  if (nag.status === 'PAUSED' || nag.status === 'COMPLETED') {
    return nag;
  }

  if (roundedTimestamp() >= nag.nextNag) {
    if (nag.repeats) {
      return Object.assign({}, nag, {
        nextNag: nextNagTimestamp(nag.nextNag, nag.repeats)
      });
    } else {
      return Object.assign({}, nag, { status: 'COMPLETED' });
    }
  } else {
    return nag;
  }
};

export const progressCheck = nag => {
  const previousNag = nag.repeats
    ? previousNagTimestamp(nag.nextNag, nag.repeats)
    : nag.firstNag;
  const total = nag.nextNag - previousNag;
  const part = roundedTimestamp() - previousNag;
  return `${part / total * 100}%`;
};
