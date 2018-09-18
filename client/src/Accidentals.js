import React, { Component } from 'react';
import './Accidentals.css';

import { GLYPHS, NOTEHEAD_COLUMN_WIDTH, STAFF_LINE_WIDTH } from './constants';

const alterationGlyphs = {
  [-2]: GLYPHS.accidentalDoubleFlat,
  [-1]: GLYPHS.accidentalFlat,
  1: GLYPHS.accidentalSharp,
  2: GLYPHS.accidentalDoubleSharp,
};

class Accidentals extends Component {
  render() {
    const { notes, width } = this.props;

    const offset = -0.5 * width * NOTEHEAD_COLUMN_WIDTH;
    const padding = -0.5 * NOTEHEAD_COLUMN_WIDTH;
    const accidentals = notes.reduce((acc, n, i) => {
      const glyph = alterationGlyphs[n.alteration];
      if (glyph) {
        const yOffset = -0.5 * n.staffOffset * STAFF_LINE_WIDTH;
        acc.push(<text transform={`translate(0, ${yOffset})`}>{glyph}</text>);
      }
      return acc;
    }, []);

    return (
      <g
        className="Accidentals"
        transform={`translate(${offset + padding}, 0)`}
      >
        {accidentals}
      </g>
    );
  }
}

export default Accidentals;
