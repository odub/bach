const Note = require('tonal-note');
const { Piano } = require('tone-piano');

const { clock } = require('./clock');

const polySynth = new Piano([24, 96], 5).toMaster();

let queuedEvents = [];

polySynth.load().then(() => console.info('piano loaded'));

export const cancelAll = () => {
  queuedEvents.forEach(e => e.clear());
  polySynth.stopAll();
  queuedEvents = [];
};

export const playChord = (pitches, time = 0) => {
  const sanitizedPitches = (pitches || []).map(Note.midi).map(Note.fromMidi);
  sanitizedPitches.forEach(pitch => {
    queuedEvents.push(clock.setTimeout(() => polySynth.keyDown(pitch), time));
    queuedEvents.push(
      clock.setTimeout(() => polySynth.keyUp(pitch), time + 0.4),
    );
  });
};
