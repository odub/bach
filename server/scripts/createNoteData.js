const process = require('process');
const fs = require('fs');
const MusicXML = require('musicxml-interfaces');

const { TICKS_PER_QUARTER } = require('../src/constants/time');
const {
  CATALOGUE,
  CATALOGUE_BWVS,
  CATALOGUE_BWVS_SET,
  SOURCE_FILES,
  SOURCE_BWVS,
  SOURCE_BWVS_SET,
  DB_BWVS,
  MISSING_XML,
} = require('../src/constants/choraleCatalogue');

// console.info(`${DB_BWVS.length} chorales available with metadata`);
// console.info(
//   `${MISSING_XML.length} with metadata missing XML:`,
//   `${MISSING_XML.join(', ')}`,
// );

const loadXML = (filename, next) => {
  return fs.readFile(`./data/corpus/bwv${filename}.xml`, next);
};

const parseXML = xml => {
  return MusicXML.parseScore(xml);
};

const extractNoteData = (document, filename) => {
  const extractableParts = document.partList
    .filter(v => v._class === 'ScorePart')
    .map(v => v.id);

  let notes = [];
  let attributes = {};
  let offsets = {};
  let indexes = {};

  document.measures.forEach(measure => {
    extractableParts.forEach(part => {
      const contents = measure.parts[part];
      if (!contents) return;
      contents.forEach((parsedXml, i, a) => {
        switch (parsedXml._class) {
          case 'Attributes':
            attributes[part] = { ...attributes[part], ...parsedXml };
            break;
          case 'Note': {
            const durationQuarters =
              parsedXml.duration / attributes[part].divisions;
            const durationTicks = durationQuarters * TICKS_PER_QUARTER;
            const index = indexes[part] || 0;
            const offset = offsets[part] || 0;
            const timespan = [offset, offset + durationTicks];
            timespan.inclusive = [true, false];
            const newNote = {
              duration: durationTicks,
              source: filename,
              part: part,
              measure: measure.number,
              index,
              offset,
              timespan,
              parsedXml,
            };
            notes.push(newNote);
            offsets[part] = durationTicks + (offsets[part] || 0);
            indexes[part] = 1 + (indexes[part] || 0);
            break;
          }
        }
      });
    });
  });

  return notes;
};

DB_BWVS.forEach(filename => {
  loadXML(filename, (error, xml) => {
    if (error) throw error;
    const document = parseXML(xml);
    const notes = extractNoteData(document, filename);
    notes.forEach(note => {
      console.info(JSON.stringify(note));
    });
  });
});
