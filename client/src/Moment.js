import React, { Component } from 'react';
import './Moment.css';

import { formatNotes } from './utils/note';

import Staff from './Staff';
import Notehead from './Notehead';
import LedgerLines from './LedgerLines';
import Accidentals from './Accidentals';

const STAFF_LINES = [-2, -4, -6, -8, -10, 2, 4, 6, 8, 10];
const STAFF_EXTENT = [Math.min(...STAFF_LINES), Math.max(...STAFF_LINES)];

class Moment extends Component {
  render() {
    const { notes = [], ledgerLines, width } =
      this.props.notes || this.props.pitches
        ? formatNotes({
            notes: this.props.notes,
            pitches: this.props.pitches,
            voiceTranspositions: this.props.voiceTranspositions,
            staffExtent: STAFF_EXTENT,
            transposition: this.props.transpose || '1P',
          })
        : {};

    return (
      <div className="Moment">
        {this.props.count && <div className="Count">{this.props.count}</div>}
        <Staff staffLines={STAFF_LINES}>
          {notes.map((n, i) => (
            <Notehead {...n} width={width} key={i} />
          ))}
          {ledgerLines && (
            <LedgerLines
              {...{ ledgerLines, staffExtent: STAFF_EXTENT, width }}
            />
          )}
          {notes && <Accidentals {...{ notes, width }} />}
        </Staff>
      </div>
    );
  }
}

export default Moment;
