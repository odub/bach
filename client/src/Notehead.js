import React, { Component } from 'react';
import './Notehead.css';

import { GLYPHS, NOTEHEAD_COLUMN_WIDTH, STAFF_LINE_WIDTH } from './constants';

class Notehead extends Component {
  render() {
    const { staffOffset, col, width } = this.props;
    const transformX =
      (width - 1) * -0.5 * NOTEHEAD_COLUMN_WIDTH + col * NOTEHEAD_COLUMN_WIDTH;
    const transformY = staffOffset * 0.5 * -STAFF_LINE_WIDTH;
    return (
      <g className="Note" transform={`translate(${transformX}, ${transformY})`}>
        <text className="Notehead">{GLYPHS.noteheadBlack}</text>
      </g>
    );
  }
}

export default Notehead;
