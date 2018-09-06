const Note = require('tonal-note');

const musicXmlParse = p =>
  p && Note.from({ alt: p.alter, oct: p.octave }, p.step);

const accidentalToAlteration = acc => {
  switch (acc) {
    case '##':
      return 2;
    case '#':
      return 1;
    case 'b':
      return -1;
    case 'bb':
      return -2;
  }
};

const musicXmlSerialize = p => {
  if (!p) return null;
  const [step, accidental, octave] = Note.tokenize(p);
  const alter = accidentalToAlteration(accidental);
  return {
    ...(step && { step }),
    ...(alter && { alter }),
    ...(octave && { octave }),
  };
};

const C_CHAR_CODE = 67;
const MID_C_OCTAVE = 4;
const NOTE_SPACES_IN_OCTAVE = 7;

const stepToStaffStep = step =>
  (NOTE_SPACES_IN_OCTAVE + step.toUpperCase().charCodeAt(0) - C_CHAR_CODE) %
  NOTE_SPACES_IN_OCTAVE;

const pitchToPosition = p => {
  const [step, accidental, octave] = Note.tokenize(p);
  const alter = accidentalToAlteration(accidental);
  const staffStep = stepToStaffStep(step);
  const octaveOffset = octave - MID_C_OCTAVE;
  const staffOffset = staffStep + octaveOffset * NOTE_SPACES_IN_OCTAVE;
  return [staffOffset, alter];
};

module.exports = {
  accidentalToAlteration,
  musicXmlParse,
  musicXmlSerialize,
  pitchToPosition,
};
