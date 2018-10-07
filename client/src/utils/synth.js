const Tone = require('tone');
const Note = require('tonal-note');

var polySynth = new Tone.PolySynth(8, Tone.Synth).toMaster();
polySynth.set({
  oscillator: {
    type: 'amtriangle',
    harmonicity: 0.5,
    modulationType: 'sine',
  },
  envelope: {
    attackCurve: 'exponential',
    attack: 0.02,
    decay: 0.2,
    sustain: 0.2,
    release: 1.5,
  },
  portamento: 0.05,
});

export const release = () => polySynth.releaseAll();

export const playChord = pitches => {
  const sanitizedPitches = (pitches || []).map(Note.midi).map(Note.fromMidi);
  polySynth.triggerAttackRelease(sanitizedPitches, '0.4s');
};
