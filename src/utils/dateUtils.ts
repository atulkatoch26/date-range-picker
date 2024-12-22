
export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function getWeekendsInRange(start: Date, end: Date): Date[] {
  const weekends: Date[] = [];
  let currentDate = new Date(start);

  while (currentDate <= end) {
    if (isWeekend(currentDate)) {
      weekends.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekends;
}

export function isWeekendDisabled(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6; 
}