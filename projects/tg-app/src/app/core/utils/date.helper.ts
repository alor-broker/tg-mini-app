export class DateHelper {
  static startOfDay(date: Date): Date {
    return new Date(date.setHours(0, 0, 0, 0));
  }

  static toUnixTime(date: Date) : number {
    return Math.floor(date.getTime() / 1000);
  }
}
