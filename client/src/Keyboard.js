import React, { Component } from 'react';
import cx from 'classnames';

import './Keyboard.css';

const pcs = [
  'C',
  'C#/Db',
  'D',
  'D#/Eb',
  'E',
  'F',
  'F#/Gb',
  'G',
  'G#/Gb',
  'A',
  'A#/Bb',
  'B',
];

const VISIBLE_RANGE = [36, 84];
const WHITE_KEYS = new Set([0, 2, 4, 5, 7, 9, 11]);

class Keyboard extends Component {
  render() {
    const { heldPcs, setHeldPcs, heldPitches, setHeldPitches } = this.props;
    return (
      <div className="Filters">
        <div className="Keyboard">
          {Array.from(
            { length: VISIBLE_RANGE[1] - VISIBLE_RANGE[0] + 1 },
            (_, i) => {
              const noteNumber = VISIBLE_RANGE[1] - i;
              return (
                <div
                  key={`key${noteNumber}`}
                  className={cx([
                    'Key',
                    {
                      WhiteKey: WHITE_KEYS.has(noteNumber % 12),
                      BlackKey: !WHITE_KEYS.has(noteNumber % 12),
                      MiddleC: noteNumber === 60,
                      active: heldPitches.has(noteNumber),
                    },
                  ])}
                  onClick={() => {
                    const newHeldPitches = new Set(heldPitches);
                    if (heldPitches.has(noteNumber)) {
                      newHeldPitches.delete(noteNumber);
                    } else {
                      newHeldPitches.add(noteNumber);
                    }
                    setHeldPitches(newHeldPitches);
                  }}
                />
              );
            },
          )}
        </div>
        <div className="PitchClasses">
          {heldPcs.map((n, i) => {
            return (
              <div
                className={cx(['PitchClass', { active: n }])}
                key={`pc${i}`}
                onClick={() => {
                  const newheldPcs = heldPcs;
                  newheldPcs[i] = !newheldPcs[i];
                  setHeldPcs(newheldPcs);
                }}
              >
                {pcs[i]}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Keyboard;
