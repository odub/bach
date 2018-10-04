import React, { Component } from 'react';

import Notehead from './Notehead';
import LedgerLines from './LedgerLines';
import Accidentals from './Accidentals';

import './Chord.css';
import { STAFF_LINE_WIDTH } from './constants';

const STAFF_LINES = [-2, -4, -6, -8, -10, 2, 4, 6, 8, 10];
const STAFF_EXTENT = [Math.min(...STAFF_LINES), Math.max(...STAFF_LINES)];

class Chord extends Component {
  render() {
    const { notes, ledgerLines, width, staffExtent, cx = 0 } = this.props;
    return (
      <g className="Chord" transform={`translate(${cx * STAFF_LINE_WIDTH}, 0)`}>
        {' '}
        {notes.map((n, i) => (
          <Notehead {...n} width={width} key={i} />
        ))}
        {ledgerLines && (
          <LedgerLines {...{ ledgerLines, staffExtent, width }} />
        )}
        {notes && <Accidentals {...{ notes, width }} />}
      </g>
    );
  }
}

export default Chord;
