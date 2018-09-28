const Note = require('tonal-note');
const { transpose } = require('tonal-distance');

const parsedXmlToTonal = p =>
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
    default:
      return null;
  }
};

const tonalToParsedXml = p => {
  if (!p) return null;
  const [step, accidental, octave] = Note.tokenize(p);
  const alter = accidentalToAlteration(accidental);
  return {
    ...(step && { step }),
    ...(alter && { alter }),
    ...(octave && { octave }),
  };
};

const transposeVoices = (pitches, transpositions) => {
  return pitches.map((n, i) => transpose(n, transpositions[i]));
};

module.exports = {
  accidentalToAlteration,
  parsedXmlToTonal,
  tonalToParsedXml,
  transposeVoices,
};
