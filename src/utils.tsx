const timeDifference = (current: number, previous: number) => {
  const milliSecondsPerMinute = 60 * 1000,
    milliSecondsPerHour = milliSecondsPerMinute * 60,
    milliSecondsPerDay = milliSecondsPerHour * 24,
    milliSecondsPerMonth = milliSecondsPerDay * 30,
    milliSecondsPerYear = milliSecondsPerDay * 365,
    elapsed = current - previous;

  switch (true) {
    case elapsed < milliSecondsPerMinute / 3:
      return `just now`;
      break;

    case elapsed < milliSecondsPerMinute:
      return `${Math.round(elapsed / milliSecondsPerMinute)} min ago`;
      break;

    case elapsed < milliSecondsPerDay:
      return `${Math.round(elapsed / milliSecondsPerHour)} h ago`;
      break;

    case elapsed < milliSecondsPerMonth:
      return `${Math.round(elapsed / milliSecondsPerDay)} days ago`;
      break;

    case elapsed < milliSecondsPerYear:
      return `${Math.round(elapsed / milliSecondsPerMonth)} mo ago`;
      break;

    default:
      return `${Math.round(elapsed / milliSecondsPerYear)} year ago`;
  }
};

export const timeDifferenceForDate = (date: number) => {
  const now = new Date().getTime();
  const updated = new Date(date).getTime();
  return timeDifference(now, updated);
};
