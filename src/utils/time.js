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
    number === 1 ? '' : 's'
  }`;
};

export const repeatsToMomentChar = repeatType =>
  repeatType === 'month' ? 'M' : repeatType[0];

export const updateNextNagTimestamp = (currentNextNag, repeats) => {
  const [repeatNumber, repeatType] = repeats.split(' ');
  const momentAddChar = repeatsToMomentChar(repeatType);
  const nowTimestamp = roundedTimestamp();
  let timestamp = moment(currentNextNag);

  do {
    timestamp.add(repeatNumber, momentAddChar);
  } while (timestamp.valueOf() < nowTimestamp);
  return timestamp.valueOf();
};

export const setNagStatus = nag => {
  if (nag.status === 'PAUSED' || nag.status === 'COMPLETED') {
    return nag;
  }

  if (roundedTimestamp() >= nag.nextNag) {
    if (nag.repeats) {
      return Object.assign({}, nag, {
        nextNag: updateNextNagTimestamp(nag.nextNag, nag.repeats)
      });
    } else {
      return Object.assign({}, nag, { status: 'COMPLETED' });
    }
  } else {
    return nag;
  }
};
