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

class Keyboard extends Component {
  render() {
    const { heldPcs, setHeldPcs } = this.props;
    return (
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
    );
  }
}

export default Keyboard;
