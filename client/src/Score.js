import React, { Component } from 'react';

import Moment from './Moment';

import './Score.css';
import { playChord, cancelAll } from './utils/synth';
import { clock } from './utils/clock';

const FOOTER_HEIGHT = 255;

class Score extends Component {
  state = {
    hidden: false,
    playing: false,
    playingMoment: null,
  };
  play = () => {
    if (this.state.playing) {
      cancelAll();
      this.setState({ playing: false, playingMoment: null });
      return;
    }
    cancelAll();
    this.setState({ playing: true });
    this.props.chordHistory
      .slice()
      .reverse()
      .forEach((chord, i) => {
        playChord(chord, i * 0.45, 0.4, () => {
          this.setState({ playingMoment: i });
        });
      });
    clock.setTimeout(() => {
      this.setState({ playing: false, playingMoment: null });
      cancelAll();
    }, this.props.chordHistory.length * 0.45);
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
                playing: this.state.playingMoment === i,
                disableSound: true,
                pitches,
                transpose,
              }}
            />
          ))}
        <span
          className="PlayPause"
          style={{
            bottom: this.state.hidden ? -FOOTER_HEIGHT : '2.5rem',
          }}
          onClick={() => this.play()}
        >
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
