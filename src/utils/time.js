import humanizeDuration from 'humanize-duration';

export const humanizeNextNag = timestamp => {
  let largest = 1;
  let separator = '~ ';

  if(timestamp < 3600000) {
    largest = 2;
    separator = ''
  }

  return `${separator}${humanizeDuration(timestamp, {largest, delimiter: ' and ', round: true})}`;
}
