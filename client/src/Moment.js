import React, { Component } from 'react';
import cx from 'classnames';

import { formatNotes } from './utils/note';
import { playChord, release } from './utils/synth';

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
          this.queuedChord && clearTimeout(this.queuedChord);
          release();
          playChord(currentPitches);
          this.queuedChord = setTimeout(() => playChord(pitches), 300);
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
