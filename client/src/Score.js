import React, { Component } from 'react';
import WAAClock from 'waaclock';

import Moment from './Moment';

import './Score.css';
import { playChord } from './utils/midi';

const STAFF_LINES = [-2, -4, -6, -8, -10, 2, 4, 6, 8, 10];
const STAFF_EXTENT = [Math.min(...STAFF_LINES), Math.max(...STAFF_LINES)];

class Score extends Component {
  state = {
    hidden: false,
    playing: false,
  };
  events = [];
  play = () => {
    if (!this.clock) {
      this.context = new AudioContext();
      this.clock = new WAAClock(this.context);
    }
    if (this.state.playing) {
      this.clock.stop();
      this.setState({ playing: false });
      return;
    }
    if (this.events.length) {
      this.events.forEach(e => e.clear());
      this.events = [];
    }
    this.clock.start();
    this.setState({ playing: true });
    this.props.chordHistory
      .slice()
      .reverse()
      .forEach((chord, i) => {
        this.events.push(
          this.clock.setTimeout(() => playChord(chord), i * 0.8),
        );
      });
    this.events.push(
      this.clock.setTimeout(() => {
        this.setState({ playing: false });
        this.clock.stop();
      }, this.props.chordHistory.length * 0.8),
    );
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
          <span
            className="AccordeonArrow"
            style={{
              transform: this.state.hidden
                ? 'rotate(.5turn) translateY(6px)'
                : '',
            }}
          >
            {'⌃'}
          </span>
          <span className="AccordeonLabel">Score</span>
        </div>
        <span className="PlayPause" onClick={() => this.play()}>
          {this.state.playing ? 'Stop' : 'Play'}
        </span>
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
