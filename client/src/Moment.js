import React, { Component } from 'react';
import cx from 'classnames';

import { formatNotes } from './utils/note';
import { playChord } from './utils/midi';

import Staff from './Staff';
import Chord from './Chord';
import Notehead from './Notehead';
import LedgerLines from './LedgerLines';
import Accidentals from './Accidentals';

import './Moment.css';

const STAFF_LINES = [-2, -4, -6, -8, -10, 2, 4, 6, 8, 10];
const STAFF_EXTENT = [Math.min(...STAFF_LINES), Math.max(...STAFF_LINES)];

class Moment extends Component {
  render() {
    const { pitches, changeChord, disabled, type } = this.props;
    const { notes = [], ledgerLines, width } = this.props.pitches
      ? formatNotes({
          pitches: pitches,
          staffExtent: STAFF_EXTENT,
          transposition: this.props.transpose || '1P',
        })
      : {};

    return (
      <div
        className={cx(['Moment', { disabled, [type]: !disabled }])}
        onClick={() =>
          !disabled && type !== 'current' && changeChord && changeChord(pitches)
        }
        onMouseEnter={() => {
          playChord(pitches);
        }}
      >
        <Staff staffLines={STAFF_LINES}>
          <Chord
            {...{
              notes,
              ledgerLines,
              width,
              staffExtent: STAFF_EXTENT,
              cx: 3.5,
            }}
          />
        </Staff>
      </div>
    );
  }
}

export default Moment;
