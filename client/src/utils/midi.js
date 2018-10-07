const Tone = require('tone');
const Note = require('tonal-note');

var polySynth = new Tone.PolySynth(8, Tone.Synth).toMaster();
polySynth.set({
  oscillator: {
    type: 'square',
    //     modulationFrequency: 0.2,
  },
  envelope: {
    attack: 0.02,
    decay: 0.1,
    sustain: 0.2,
    release: 0.9,
  },
});

export const release = () => polySynth.releaseAll();

export const playChord = pitches => {
  const sanitizedPitches = (pitches || []).map(Note.midi).map(Note.fromMidi);
  polySynth.triggerAttackRelease(sanitizedPitches, '0.4s');
};
