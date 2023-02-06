export function findDateTime(dates) {
  const today = new Date(Date.now());
  const curDateTimeId = nextDate(today, dates);
  return curDateTimeId;
}

function nextDate( startDate, dates ) {
  var startTime = +startDate;
  var id = 0;
  for( var i = 0, n = dates.length;  i < n;  ++i ) {
      var diff = +dates[i] - startTime;
      if( diff <= 0) {
        id = i;
      }
  }
  return id;
}

