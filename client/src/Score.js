import React, { Component } from 'react';
import WAAClock from 'waaclock';

import Moment from './Moment';

import './Score.css';
import { playChord } from './utils/synth';

const FOOTER_HEIGHT = 232;

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
          this.clock.setTimeout(() => playChord(chord), i * 0.45),
        );
      });
    this.events.push(
      this.clock.setTimeout(() => {
        this.setState({ playing: false });
        this.clock.stop();
      }, this.props.chordHistory.length * 0.45),
    );
  };
  render() {
    const { chordHistory, transpose } = this.props;
    return (
      <div
        className="Score"
        style={{
          height: FOOTER_HEIGHT,
          bottom: this.state.hidden ? -FOOTER_HEIGHT : 0,
        }}
      >
        <div
          className="ShowHideScore"
          onClick={() => this.setState({ hidden: !this.state.hidden })}
          style={{ bottom: this.state.hidden ? 0 : FOOTER_HEIGHT }}
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
        </div>
        {chordHistory
          .slice()
          .reverse()
          .map((pitches, i) => (
            <Moment
              key={i}
              {...{
                type: 'current',
                disableSound: true,
                pitches,
                transpose,
              }}
            />
          ))}
        <span className="PlayPause" onClick={() => this.play()}>
          <div
            style={{
              transform: this.state.playing
                ? 'translate(-1px, 2px) rotate(0.25turn) scale(1.25, 1.25)'
                : 'translate(1px, 2px) rotate(0.25turn)',
            }}
          >
            {this.state.playing ? '◼' : '▲'}
          </div>
        </span>
      </div>
    );
  }
}

export default Score;
