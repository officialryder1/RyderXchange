export function formatDateTime(datetime) {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: false 
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(datetime));
  }