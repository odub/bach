import React, { Component } from 'react';
import cx from 'classnames';

import { formatNotes } from './utils/note';
import { playChord, cancelAll } from './utils/synth';

import Staff from './Staff';
import Chord from './Chord';

import './Moment.css';

const STAFF_LINES = [-2, -4, -6, -8, -10, 2, 4, 6, 8, 10];
const STAFF_EXTENT = [Math.min(...STAFF_LINES), Math.max(...STAFF_LINES)];

class Moment extends Component {
  render() {
    const {
      pitches,
      currentPitches,
      changeChord,
      disabled,
      type,
      clickable,
      playing,
      count,
    } = this.props;
    const { notes = [], ledgerLines, width } = this.props.pitches
      ? formatNotes({
          pitches: pitches,
          staffExtent: STAFF_EXTENT,
          transposition: this.props.transpose || '1P',
        })
      : {};

    return (
      <div
        className={cx([
          'Moment',
          {
            disabled,
            playing,
            [type]: !disabled,
            clickable: clickable,
          },
        ])}
        onClick={() =>
          clickable &&
          !disabled &&
          type !== 'current' &&
          changeChord &&
          changeChord(pitches)
        }
        onMouseEnter={() => {
          if (this.props.disableSound) return;
          cancelAll();
          playChord(currentPitches);
          playChord(pitches, 0.41, 0.8);
        }}
        onMouseLeave={() => cancelAll()}
      >
        <span className="Count">{count >= 0 && count}</span>
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
