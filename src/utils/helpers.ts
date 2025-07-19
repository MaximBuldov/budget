import dayjs from "dayjs";

export function getJanePaydays(startDate: Date) {
  const firstPayDate = dayjs(startDate);
  const start = dayjs();
  const end = dayjs().add(2, "month");

  let current = firstPayDate;
  const result = [];

  while (current.isBefore(end) || current.isSame(end, "day")) {
    if (current.isAfter(start.subtract(1, "day"))) {
      result.push(+current.format("D"));
    }
    current = current.add(14, "day");
  }

  return result;
}

export function isWeekend(date: dayjs.Dayjs): boolean {
  const day = date.day();
  return day === 0 || day === 6;
}

export function adjustToPreviousWeekday(date: dayjs.Dayjs): dayjs.Dayjs {
  while (isWeekend(date)) {
    date = date.subtract(1, "day");
  }
  return date;
}

export function getMaxPaydays(count: number = 4): number[] {
  const results: number[] = [];
  let date = dayjs();

  while (results.length < count) {
    const month = date.month();
    const year = date.year();

    const fifteenth = dayjs(new Date(year, month, 15));
    const payday15 = fifteenth.isAfter(dayjs())
      ? adjustToPreviousWeekday(fifteenth)
      : null;

    const lastDayOfMonth = dayjs(new Date(year, month + 1, 0));
    const paydayEnd = lastDayOfMonth.isAfter(dayjs()) ? lastDayOfMonth : null;

    if (payday15) results.push(+payday15.format("D"));
    if (paydayEnd) results.push(+paydayEnd.format("D"));

    date = date.add(1, "month");
  }

  return results.slice(0, count);
}
