const fs = require('fs');
const distance = require('tonal-distance');

const { musicXmlParse } = require('../../server/src/utils/pitch');

const file = fs.readFileSync('/tmp/startPoints').toString();

const noteNumbers = file
  .split('\n')
  .slice(0, -1)
  .map(l => l.replace(/},\s*$/, '}').replace(/(^\s*\[|\]\s*$)/, ''))
  .map(JSON.parse)
  .map(o => o.notes.map(n => musicXmlParse(n)))
  .filter(a => !a.some(v => v === null))
  .sort((a, b) => {
    let cmp = 0;
    for (let i = a.length - 1; i >= 0; i--) {
      cmp = distance.semitones('C4', a[i]) - distance.semitones('C4', b[i]);
      if (cmp) {
        return cmp;
      }
    }
    return cmp;
  })
  .filter((v, i, a) => !a[i + 1] || a[i + 1].join(',') !== a[i].join(','))
  .map(a => a.map(v => distance.interval('C4', v)));
const output = JSON.stringify(noteNumbers, null, '  ');
console.info(output);
