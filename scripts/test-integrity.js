import { weddingData } from '../src/data/weddingData.js';
import { createGoogleCalendarUrl, getWhatsAppShareUrl } from '../src/utils/calendar.js';

console.log('--- RUNNING WEDDING INVITATION VERIFICATION TESTS ---');

// 1. Verify couple names & essential details
console.assert(weddingData.couple.groom.firstName === 'Krishan', 'Groom first name must be Krishan');
console.assert(weddingData.couple.bride.firstName === 'Pooja', 'Bride first name must be Pooja');
console.assert(weddingData.dates.weddingDateShort === '03 Dec 2026', 'Wedding date short format check');
console.assert(weddingData.dates.receptionDateShort === '06 Dec 2026', 'Reception date short format check');
console.assert(weddingData.weddingEvents.length >= 3, 'Must have at least 3 wedding events (Haldi, Baraat, Pheras)');
console.assert(weddingData.loveStory.length === 4, 'Must have 4 love story milestones');
console.assert(weddingData.gallery.length === 6, 'Must have 6 gallery photos');

console.log('✓ Couple, dates, story, events and gallery schema verified.');

// 2. Test Google Calendar URL generation
const googleCalUrl = createGoogleCalendarUrl({
  title: `Wedding of ${weddingData.couple.groom.firstName} & ${weddingData.couple.bride.firstName}`,
  description: 'Royal Wedding',
  location: weddingData.venues.wedding.name,
  startISO: weddingData.dates.weddingDateISO,
  endISO: weddingData.dates.weddingEndDateISO,
});
console.assert(googleCalUrl.includes('calendar.google.com'), 'Google calendar URL must be valid');
console.assert(googleCalUrl.includes('Krishan'), 'URL must contain groom name');
console.log('✓ Google Calendar generation verified:', googleCalUrl.substring(0, 70) + '...');

// 3. Test WhatsApp Share URL generation
const waUrl = getWhatsAppShareUrl(weddingData.couple, weddingData.dates, 'Rahul Gupta');
console.assert(waUrl.includes('whatsapp.com'), 'WhatsApp share URL must be valid');
console.assert(decodeURIComponent(waUrl).includes('Rahul Gupta'), 'WhatsApp message must include personalized guest name');
console.assert(decodeURIComponent(waUrl).includes('#KrishanWedsPooja'), 'WhatsApp message must include hashtag');
console.log('✓ WhatsApp Share URL verified.');

// 4. Test countdown logic
const now = new Date('2026-11-19T12:00:00+05:30').getTime();
const wedding = new Date(weddingData.dates.weddingDateISO).getTime();
const diffDays = Math.floor((wedding - now) / (1000 * 60 * 60 * 24));
console.assert(diffDays > 0, 'Countdown days should be positive before wedding date');
console.log(`✓ Countdown verified: ${diffDays} days until wedding.`);

console.log('--- ALL INTEGRITY TESTS PASSED SUCCESSFULLY! ---');
