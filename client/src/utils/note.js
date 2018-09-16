const Note = require('tonal-note');

const { parsedXmlToTonal } = require('./pitch');

const C_CHAR_CODE = 67;
const MID_C_OCTAVE = 4;
const NOTE_SPACES_IN_OCTAVE = 7;

const stepToStaffStep = step =>
  (NOTE_SPACES_IN_OCTAVE + step.toUpperCase().charCodeAt(0) - C_CHAR_CODE) %
  NOTE_SPACES_IN_OCTAVE;

const formatNotes = ({ notes, staffExtent }) => {
  notes = notes.filter(n => n.parsedXml.pitch);
  const tonalNotes = notes.map(n => parsedXmlToTonal(n.parsedXml.pitch));
  const tokenizedNotes = tonalNotes.map(tn => Note.tokenize(tn));
  const staffOffsets = tokenizedNotes.map((tkn, i, a) => {
    const step = tkn[0];
    const octave = tkn[2];
    const staffStep = stepToStaffStep(step);
    const octaveOffset = octave - MID_C_OCTAVE;
    const staffOffset = staffStep + octaveOffset * NOTE_SPACES_IN_OCTAVE;
    return staffOffset;
  });
  const accidentals = tokenizedNotes.map(tkn => {
    const accidental = tkn[1];
    return accidental;
  });
  const staffOffsetsSet = new Set(staffOffsets);
  const cols = staffOffsets.map(o => {
    if (staffOffsetsSet.has(o - 1) && !staffOffsetsSet.has(o - 2)) return 1;
    return 0;
  });
  const width = new Set(cols).size;
  const notesAbove = [];
  const notesBetween = [];
  const notesBelow = [];
  staffOffsets.forEach((o, i) => {
    if (o > staffExtent[1]) notesAbove.push(i);
    if (Math.abs(o) <= 1) notesBetween.push(i);
    if (o < staffExtent[0]) notesBelow.push(i);
  });
  const ledgerLineWidths = [notesAbove, notesBetween, notesBelow].map(
    indices => new Set(indices.map(i => cols[i])).size,
  );
  const ledgerLines = {
    above: {
      number:
        ledgerLineWidths[0] &&
        parseInt(
          0.5 *
            (Math.max(...notesAbove.map(i => staffOffsets[i])) -
              staffExtent[1]),
          10,
        ),
      width: ledgerLineWidths[0],
    },
    between: {
      number:
        ledgerLineWidths[1] &&
        new Set(notesBetween.map(i => staffOffsets[i])).has(0)
          ? 1
          : 0,
      width: ledgerLineWidths[1],
    },
    below: {
      number:
        ledgerLineWidths[2] &&
        parseInt(
          0.5 *
            (staffExtent[0] -
              Math.min(...notesBelow.map(i => staffOffsets[i]))),
          10,
        ),
      width: ledgerLineWidths[2],
    },
  };
  return {
    ledgerLines,
    width,
    notes: notes.map((_, i) => ({
      note: notes[i],
      staffOffset: staffOffsets[i],
      accidental: accidentals[i],
      col: cols[i],
    })),
  };
};

module.exports = {
  formatNotes,
};
