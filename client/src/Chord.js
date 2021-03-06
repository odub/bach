import React, { Component } from 'react';

import Notehead from './Notehead';
import LedgerLines from './LedgerLines';
import Accidentals from './Accidentals';

import './Chord.css';
import { STAFF_LINE_WIDTH } from './constants';

class Chord extends Component {
  render() {
    const { notes, ledgerLines, width, staffExtent, cx = 0 } = this.props;
    return (
      <g className="Chord" transform={`translate(${cx * STAFF_LINE_WIDTH}, 0)`}>
        {' '}
        {notes.filter(n => n.staffOffset || n.staffOffset === 0).map((n, i) => (
          <Notehead {...n} width={width} key={i} />
        ))}
        {ledgerLines && (
          <LedgerLines {...{ ledgerLines, staffExtent, width }} />
        )}
        {notes.length && <Accidentals {...{ notes, width }} />}
      </g>
    );
  }
}

export default Chord;
