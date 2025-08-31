const Note = require('tonal-note');
const { Piano } = require('tone-piano');

const { clock } = require('./clock');

const polySynth = new Piano([24, 96], 5).toMaster();

let queuedEvents = [];

export const load = (cb) => {
  polySynth.load('https://tambien.github.io/Piano/audio/').then(cb);
};

export const cancelAll = () => {
  queuedEvents.forEach((e) => e.clear());
  polySynth.stopAll();
  queuedEvents = [];
};

export const playChord = (
  pitches,
  options = { time: 0, duration: 0.4, velocity: 0.6 },
  cb,
) => {
  const { time, duration, velocity } = options;
  const sanitizedPitches = (pitches || []).map(Note.midi).map(Note.fromMidi);
  sanitizedPitches.forEach((pitch) => {
    queuedEvents.push(
      clock().setTimeout(() => {
        polySynth.keyDown(pitch, undefined, velocity);
        cb && cb();
      }, time),
    );
    queuedEvents.push(
      clock().setTimeout(() => polySynth.keyUp(pitch), time + duration),
    );
  });
};
