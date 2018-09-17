import React, { Component } from 'react';
import './LedgerLines.css';

import {
  STAFF_LINE_WIDTH,
  LEDGER_LINE_PADDING,
  NOTEHEAD_COLUMN_WIDTH,
} from './constants';

class LedgerLines extends Component {
  render() {
    const { ledgerLines, staffExtent, width } = this.props;
    const xs = key => {
      const offset =
        (width - ledgerLines[key].width) *
        (width - 1) *
        -0.5 *
        NOTEHEAD_COLUMN_WIDTH;
      return {
        x1:
          offset -
          0.5 * ledgerLines[key].width * NOTEHEAD_COLUMN_WIDTH -
          LEDGER_LINE_PADDING,
        x2:
          offset +
          0.5 * ledgerLines[key].width * NOTEHEAD_COLUMN_WIDTH +
          LEDGER_LINE_PADDING,
      };
    };
    const shared = {
      className: 'StaffLine LedgerLine',
    };
    const lines = [
      ...Array.from({ length: ledgerLines.above.number }, (_, i) => (
        <line
          {...xs('above')}
          {...shared}
          y1={(staffExtent[0] / 2 - (i + 1)) * STAFF_LINE_WIDTH}
          y2={(staffExtent[0] / 2 - (i + 1)) * STAFF_LINE_WIDTH}
          key={`above${i}`}
        />
      )),
      ...Array.from({ length: ledgerLines.between.number }, (_, i) => (
        <line
          {...xs('between')}
          {...shared}
          y1="0"
          y2="0"
          key={`between${i}`}
        />
      )),
      ...Array.from({ length: ledgerLines.below.number }, (_, i) => (
        <line
          {...xs('below')}
          {...shared}
          y1={-(staffExtent[0] / 2 - (i + 1)) * STAFF_LINE_WIDTH}
          y2={-(staffExtent[0] / 2 - (i + 1)) * STAFF_LINE_WIDTH}
          key={`below${i}`}
        />
      )),
    ];
    return <g className="LedgerLines">{lines}</g>;
  }
}

export default LedgerLines;
