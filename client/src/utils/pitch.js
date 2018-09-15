const Note = require('tonal-note');

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

module.exports = {
  accidentalToAlteration,
  parsedXmlToTonal,
  tonalToParsedXml,
};
