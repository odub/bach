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
      placeholder,
    } = this.props;
    const {
      notes = [],
      ledgerLines,
      width,
    } = this.props.pitches
      ? formatNotes({
          pitches: pitches,
          staffExtent: STAFF_EXTENT,
          transposition: this.props.transpose || '1P',
        })
      : {};
    const height = Math.min(8, count);

    return (
      <div
        className={cx([
          'Moment',
          {
            disabled,
            playing,
            [type]: !disabled,
            clickable,
            placeholder,
          },
        ])}
        style={{
          top: -height * 2,
          boxShadow:
            height > 1
              ? [...Array(height)].reduce((acc, _, i, __) => {
                  const h = i * 2;
                  return (
                    (acc ? acc + ', ' : '') +
                    `0px ${h + 1}px 0px white, 0px ${h + 2}px 0px #ccc`
                  );
                }, '')
              : 'none',
        }}
        onClick={() =>
          clickable &&
          !disabled &&
          type !== 'current' &&
          changeChord &&
          changeChord(pitches)
        }
        onMouseEnter={() => {
          if (this.props.disabled) return;
          cancelAll();
          if (count >= 0) {
            playChord(currentPitches);
            playChord(pitches, 0.41, 0.8);
            return;
          }
          playChord(pitches, 0, 0.8);
        }}
        onMouseLeave={() => cancelAll()}
      >
        <div className="MomentContent">
          {placeholder ? (
            <React.Fragment>
              <div className="Placeholder" />
            </React.Fragment>
          ) : (
            <React.Fragment>
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
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default Moment;
