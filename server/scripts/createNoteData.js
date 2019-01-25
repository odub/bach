const process = require('process');
const fs = require('fs');
const MusicXML = require('musicxml-interfaces');
const jsonpath = require('jsonpath');

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

const extractPartIdMapping = document => {
  const partObjects = jsonpath.query(
    document,
    "$.partList..[?(@._class === 'ScorePart')]",
  );
  const partIdMapping = partObjects.reduce((acc, part) => {
    const id = part.id;
    const name = part.partName.partName.split(/\v/)[0];
    switch (name) {
      case 'Soprano':
      case 'S.':
        return { ...acc, [id]: 0 };
      case 'Alto':
      case 'A.':
        return { ...acc, [id]: 1 };
      case 'Tenor':
      case 'T.':
        return { ...acc, [id]: 2 };
      case 'Bass':
      case 'B.':
        return { ...acc, [id]: 3 };
      default:
        return acc;
    }
  }, {});

  return partIdMapping;
};

const extractNoteData = (document, filename) => {
  const partIdMapping = extractPartIdMapping(document);
  const extractableParts = Object.keys(partIdMapping);

  let notes = [];
  let attributes = {};
  let offsets = {};
  let indexes = {};

  // Filter out chorales with more or less than 4 parts
  if (extractableParts.length !== 4) {
    return [];
  }

  document.measures.forEach(measure => {
    // Exit measures with non-integer names
    if (/[^0-9]/.test(measure.number)) return;

    extractableParts.forEach(part => {
      const partId = partIdMapping[part];
      const contents = measure.parts[part];
      // Exit empty voices
      if (!contents) return;
      contents.forEach((parsedXml, i, a) => {
        switch (parsedXml._class) {
          case 'Attributes':
            attributes[part] = { ...attributes[part], ...parsedXml };
            break;
          case 'Note': {
            const durationQuarters =
              (parsedXml.duration || 0) / attributes[part].divisions;
            const durationTicks = durationQuarters * TICKS_PER_QUARTER;
            const index = indexes[part] || 0;
            const offset = offsets[part] || 0;
            const timespan = [offset, offset + durationTicks];
            timespan.inclusive = [true, false];
            const newNote = {
              duration: durationTicks,
              source: filename,
              part: partId,
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
