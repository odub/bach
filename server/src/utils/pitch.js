const tonal = require('tonal');

const musicXmlParse = p =>
  p && tonal.Note.from({ alt: p.alter, oct: p.octave }, p.step);

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
  const [step, accidental, octave] = tonal.Note.tokenize(p);
  const alter = accidentalToAlteration(accidental);
  return {
    ...(step && { step }),
    ...(alter && { alter }),
    ...(octave && { octave }),
  };
};

module.exports = {
  accidentalToAlteration,
  musicXmlParse,
  musicXmlSerialize,
};
