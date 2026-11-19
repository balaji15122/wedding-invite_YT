import fs from 'fs';
import path from 'path';

// Generate a soothing 12-second ambient raga meditation chime loop (WAV format with valid PCM data)
const sampleRate = 44100;
const durationSeconds = 12;
const numSamples = sampleRate * durationSeconds;
const numChannels = 2;
const bytesPerSample = 2;
const blockAlign = numChannels * bytesPerSample;
const byteRate = sampleRate * blockAlign;
const dataSize = numSamples * blockAlign;

const buffer = Buffer.alloc(44 + dataSize);

// Write WAV Header
buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write('WAVE', 8);
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16); // SubChunk1Size
buffer.writeUInt16LE(1, 20); // AudioFormat PCM
buffer.writeUInt16LE(numChannels, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(byteRate, 28);
buffer.writeUInt16LE(blockAlign, 32);
buffer.writeUInt16LE(16, 34); // BitsPerSample
buffer.write('data', 36);
buffer.writeUInt32LE(dataSize, 40);

// Raag Yaman notes (frequencies in Hz): Sa (261.63), Re (294.33), Ga (329.63), Pa (392.00), Dha (440.00), Ni (493.88), Sa' (523.25)
const notes = [
  { f: 261.63, start: 0.0, dur: 3.5, pan: 0.3 },   // Sa
  { f: 329.63, start: 1.5, dur: 3.5, pan: 0.7 },   // Ga
  { f: 392.00, start: 3.0, dur: 4.0, pan: 0.4 },   // Pa
  { f: 493.88, start: 5.0, dur: 3.5, pan: 0.6 },   // Ni
  { f: 523.25, start: 6.5, dur: 4.5, pan: 0.5 },   // Sa'
  { f: 440.00, start: 8.0, dur: 3.5, pan: 0.3 },   // Dha
  { f: 392.00, start: 9.5, dur: 4.0, pan: 0.6 },   // Pa
];

// Tambura drone base frequencies (Sa and Pa)
const drone1 = 130.81; // Low Sa
const drone2 = 196.00; // Low Pa

let offset = 44;
for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate;

  // Gentle fade-in and fade-out at edges of 12s loop
  let masterEnv = 1.0;
  if (t < 1.0) masterEnv = t;
  else if (t > durationSeconds - 1.0) masterEnv = (durationSeconds - t);

  // Drone layer (warm soothing hum)
  const dVal = (Math.sin(2 * Math.PI * drone1 * t) * 0.12 +
                Math.sin(2 * Math.PI * drone2 * t) * 0.08 +
                Math.sin(2 * Math.PI * drone1 * 2 * t) * 0.04) * masterEnv;

  // Melody chimes
  let leftMelody = 0;
  let rightMelody = 0;

  for (const n of notes) {
    if (t >= n.start && t < n.start + n.dur) {
      const noteT = t - n.start;
      // Bell/shehnai harmonic envelope: fast attack, gentle decay
      const env = Math.exp(-noteT * 1.2) * Math.sin(Math.min(1, noteT * 20) * Math.PI * 0.5);
      
      // Multi-harmonic richness
      const wave = Math.sin(2 * Math.PI * n.f * noteT) * 0.22 +
                   Math.sin(2 * Math.PI * n.f * 2 * noteT) * 0.10 +
                   Math.sin(2 * Math.PI * n.f * 3 * noteT) * 0.04;
      
      const sig = wave * env * masterEnv;
      leftMelody += sig * (1 - n.pan);
      rightMelody += sig * n.pan;
    }
  }

  const left = Math.max(-1, Math.min(1, dVal * 0.5 + leftMelody));
  const right = Math.max(-1, Math.min(1, dVal * 0.5 + rightMelody));

  buffer.writeInt16LE(Math.floor(left * 32767 * 0.75), offset);
  buffer.writeInt16LE(Math.floor(right * 32767 * 0.75), offset + 2);
  offset += 4;
}

const dir = path.resolve('public/audio');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
fs.writeFileSync(path.join(dir, 'wedding-song.mp3'), buffer);
console.log('Generated placeholder audio at public/audio/wedding-song.mp3');
