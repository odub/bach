import React, { Component } from 'react';
import cx from 'classnames';
import './Moment.css';

import { pitchToPosition, musicXmlParse } from './utils/pitch';
import { formatNotes } from './utils/note';

import Staff from './Staff';
import Notehead from './Notehead';

const STAFF_LINES = [-2, -4, -6, -8, -10, 2, 4, 6, 8, 10];
const STAFF_EXTENT = [Math.min(...STAFF_LINES), Math.max(...STAFF_LINES)];

class Moment extends Component {
  state = {
    debug: false,
  };
  render() {
    const { debug } = this.state;

    const { notes, ledgerLines, width } = formatNotes({
      notes: this.props.notes,
      staffExtent: STAFF_EXTENT,
    });

    return (
      <div className="Moment">
        <a
          className="MomentDebugToggle"
          onClick={() => console.info({ notes, ledgerLines })}
        >
          src
        </a>
        <Staff staffLines={STAFF_LINES}>
          {notes.map((n, i) => (
            <Notehead {...n} width={width} key={i} />
          ))}
        </Staff>
      </div>
    );
  }
}

export default Moment;
