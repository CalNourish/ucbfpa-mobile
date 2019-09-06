const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];    


export function parseTimestamp(timestamp) {
    let month = timestamp.slice(5,7);
    let date = timestamp.slice(8,10);
    let hour = timestamp.slice(11,13);
    let minute = timestamp.slice(14,16);
    let ampm;
    if (hour < 12) {
      ampm = 'AM';
    } else {
      ampm = 'PM';
    }
    return months[month - 1] + ' ' + date/1 + ' at ' + hour%12 + ':' + minute + ' ' + ampm; 
  }