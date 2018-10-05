const Tone = require('tone');
const Note = require('tonal-note');

var synth = new Tone.Synth({
  oscillator: {
    type: 'pwm',
    modulationFrequency: 0.2,
  },
  envelope: {
    attack: 0.02,
    decay: 0.1,
    sustain: 0.2,
    release: 0.9,
  },
}).toMaster();

var polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();

export const playChord = pitches => {
  const sanitizedPitches = (pitches || []).map(Note.midi).map(Note.fromMidi);
  polySynth.triggerAttackRelease(sanitizedPitches, '4n');
};
