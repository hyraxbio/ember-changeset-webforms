export default function updateTime(date, time) {
  if (date && time) {
    var hours = time.split(':')[0] || 0;
    var minutes = time.split(':')[1] || 0;
    var day = moment(date).date();
    var month = moment(date).month();
    var year = moment(date).year();
    return moment()
      .year(year)
      .month(month)
      .date(day)
      .hour(hours)
      .minute(minutes)
      .second(0)
      .toDate();
  }
  return date;
}
