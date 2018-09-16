import React, { Component } from 'react';
import './Notehead.css';

import {
  NOTEHEAD_WIDTH,
  NOTEHEAD_COLUMN_WIDTH,
  STAFF_LINE_WIDTH,
} from './constants';

class Note extends Component {
  render() {
    const { staffOffset, col, width } = this.props;
    const transformX =
      (width - 1) * -0.5 * NOTEHEAD_COLUMN_WIDTH + col * NOTEHEAD_COLUMN_WIDTH;
    const transformY = staffOffset * 0.5 * -STAFF_LINE_WIDTH;
    return (
      <g className="Note" transform={`translate(${transformX}, ${transformY})`}>
        <ellipse
          cx="0"
          cy="0"
          rx={0.5 * NOTEHEAD_WIDTH}
          ry={NOTEHEAD_WIDTH / 3}
          className="Notehead"
        />
      </g>
    );
  }
}

export default Note;
