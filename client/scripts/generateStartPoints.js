const fs = require('fs');
const tonal = require('tonal-note');

const { musicXmlParse } = require('../../server/src/utils/pitch');

const file = fs.readFileSync('/tmp/startPoints').toString();

const noteNumbers = file
  .split('\n')
  .slice(0, -1)
  .map(l => l.replace(/},\s*$/, '}').replace(/(^\s*\[|\]\s*$)/, ''))
  .map(JSON.parse)
  .map(o => o.notes.map(n => musicXmlParse(n)).map(tonal.midi));

const output = JSON.stringify(noteNumbers, null, '  ');
console.info(output);
