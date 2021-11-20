export class Utils {
  static weekDays = [
    {
      key: 'Mon',
      val: 'Monday'
    },
    {
      key: 'Tue',
      val: 'Tuesday'
    },
    {
      key: 'Wed',
      val: 'Wednesday'
    },
    {
      key: 'Thu',
      val: 'Thursday'
    },
    {
      key: 'Fri',
      val: 'Friday'
    },
    {
      key: 'Sat',
      val: 'Saturday'
    },
    {
      key: 'Sun',
      val: 'Sunday'
    },
  ];

  static months = [
    {
      key: 'Jan',
      val: 'January',
      num: 1
    },
    {
      key: 'Feb',
      val: 'Febuary',
      num: 2
    },
    {
      key: 'Mar',
      val: 'March',
      num: 3
    },
    {
      key: 'Apr',
      val: 'April',
      num: 4
    },
    {
      key: 'May',
      val: 'May',
      num: 5
    },
    {
      key: 'Jun',
      val: 'June',
      num: 6
    },
    {
      key: 'Jul',
      val: 'July',
      num: 7
    },
    {
      key: 'Aug',
      val: 'August',
      num: 8
    },
    {
      key: 'Sep',
      val: 'September',
      num: 9
    },
    {
      key: 'Oct',
      val: 'October',
      num: 10
    },
    {
      key: 'Nov',
      val: 'November',
      num: 11
    },
    {
      key: 'Dec',
      val: 'December',
      num: 12
    },
  ];

  static formatNumber(value: string): string {
    const stringValue = `${value}`;
    const list = stringValue.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
  }

  static formatCurrency(balance: number) {
    return balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  static getDate(date: string): FormatedDate {
    let el = date.split(' ');
    let weekDay = this.weekDays.find(day => day.key === el[0]);
    let month = this.months.find(month => month.key === el[1]);
    return { weekDay: weekDay!.val, month: month!.val, month_num: month!.num, date: Number(el[2]), year: Number(el[3]) };
  }

  static getDateRange(year: number, month: number, dateNum: number): DateRange {
    return { startDate: new Date(`${year}/${month}/1 00:00:00`).getTime(), endDate: new Date(`${year}/${month}/${dateNum} 23:59:59`).getTime() };
  }
}

export interface FormatedDate {
  weekDay: string;
  month: string;
  month_num: number;
  date: number;
  year: number;
}

export interface DateRange {
  startDate: number,
  endDate: number
}