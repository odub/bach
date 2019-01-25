const Note = require('tonal-note');
const { Piano } = require('tone-piano');

const { clock } = require('./clock');

const polySynth = new Piano([24, 96], 5).toMaster();

let queuedEvents = [];

export const load = cb => {
  polySynth.load().then(cb);
};

export const cancelAll = () => {
  queuedEvents.forEach(e => e.clear());
  polySynth.stopAll();
  queuedEvents = [];
};

export const playChord = (pitches, time = 0, duration = 0.4, cb) => {
  const sanitizedPitches = (pitches || []).map(Note.midi).map(Note.fromMidi);
  sanitizedPitches.forEach(pitch => {
    queuedEvents.push(
      clock().setTimeout(() => {
        polySynth.keyDown(pitch);
        cb && cb();
      }, time),
    );
    queuedEvents.push(
      clock().setTimeout(() => polySynth.keyUp(pitch), time + duration),
    );
  });
};
