export const formatDisplayDate = (isoDateString: string): string => {

    if (!isoDateString) {
      return '';
    }
  
    const date = new Date(isoDateString);

    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
  
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long', 
      year: 'numeric', 
      month: 'numeric',  
      day: 'numeric', 
    };
  
    return new Intl.DateTimeFormat('en-GB', options).format(date);
};

export const formatEventDateTime = (isoDateTimeString: string): string => {
  if (!isoDateTimeString) {
    return '';
  }

  const date = new Date(isoDateTimeString);

  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  return new Intl.DateTimeFormat('en-GB', options).format(date);
};