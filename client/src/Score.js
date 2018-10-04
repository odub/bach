import React, { Component } from 'react';

import Moment from './Moment';
import Staff from './Staff';
import { formatNotes } from './utils/note';

import './Score.css';

const STAFF_LINES = [-2, -4, -6, -8, -10, 2, 4, 6, 8, 10];
const STAFF_EXTENT = [Math.min(...STAFF_LINES), Math.max(...STAFF_LINES)];

class Score extends Component {
  state = {
    hidden: true,
  };
  render() {
    const { chordHistory, transpose } = this.props;
    return (
      <div
        className="Score"
        style={{ bottom: this.state.hidden ? '-250px' : 0 }}
      >
        <div
          className="ShowHideScore"
          onClick={() => this.setState({ hidden: !this.state.hidden })}
          style={{ bottom: this.state.hidden ? 0 : '250px' }}
        >
          <div
            style={{
              transform: this.state.hidden
                ? ''
                : 'rotate(.5turn) translateY(6px)',
            }}
          >
            {'⌃'}
          </div>
        </div>
        {chordHistory
          .slice()
          .reverse()
          .map((pitches, i) => (
            <Moment
              key={i}
              {...{
                type: 'current',
                pitches,
                transpose,
              }}
            />
          ))}
      </div>
    );
  }
}

export default Score;
