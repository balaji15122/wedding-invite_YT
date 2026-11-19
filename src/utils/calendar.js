/**
 * Calendar Utilities: iCal (.ics) generator and Google Calendar direct URLs
 */

// Format date to iCal string (e.g. 20261203T180000)
function formatToICalDate(isoString) {
  const date = new Date(isoString);
  return date.toISOString().replace(/-|:|\.\d+/g, '');
}

export function createGoogleCalendarUrl({ title, description, location, startISO, endISO }) {
  const startDate = formatToICalDate(startISO);
  const endDate = formatToICalDate(endISO || startISO);
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${startDate}/${endDate}`,
    details: description,
    location: location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadICSFile({ title, description, location, startISO, endISO, filename }) {
  const startDate = formatToICalDate(startISO);
  const endDate = formatToICalDate(endISO || startISO);
  const now = formatToICalDate(new Date().toISOString());

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Krishan & Pooja Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@krishanpoojawedding.com`,
    `DTSTAMP:${now}`,
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Wedding of Krishan & Pooja tomorrow!',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', filename || 'wedding-invitation.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function getWhatsAppShareUrl(couple, dates, guestName) {
  const url = typeof window !== 'undefined' 
    ? (window.location.origin + window.location.pathname) 
    : 'https://krishan-pooja.wedding';
  const personalizedGreeting = guestName ? `Dear ${guestName}, ` : '';
  const message = `🌸 ${personalizedGreeting}You are cordially invited to celebrate the Royal Wedding of *${couple.groom.firstName} & ${couple.bride.firstName}* on *${dates.weddingFormatted}* in Jaipur, Rajasthan! 🏰✨\n\nOpen your personal 3D interactive wedding invitation card here:\n👉 ${url}${guestName ? `?guest=${encodeURIComponent(guestName)}` : ''}\n\n${couple.hashtag} 🙏`;
  
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
}
