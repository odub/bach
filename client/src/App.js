import cx from 'classnames';
import React, { Component } from 'react';
import './App.css';

import Moment from './Moment';
import Score from './Score';
import { TEST_MOMENTS, START_POINTS } from './constants';
import { transposeVoices } from './utils/pitch';

import './milligram.css';
import './global.css';

const Note = require('tonal-note');

const basicIntervals = [
  '1P',
  '2m',
  '2M',
  '3m',
  '3M',
  '4P',
  '5P',
  '6m',
  '6M',
  '7m',
  '7M',
  '8P',
];
const intervals = [
  ...basicIntervals.slice().reverse(),
  ...basicIntervals.map(v => `-${v}`).slice(1),
];

class App extends Component {
  state = {
    transpose: '1P',
    chord: null,
    chordHistory: [],
    suggestions: [],
    suggestionsLoaded: false,
    heldNotes: Array.from({ length: 127 }, () => false),
  };
  componentDidMount() {
    this.onChordChanged({
      chord: START_POINTS[Math.floor(START_POINTS.length * Math.random())],
    });
  }
  onChordChanged({ chord, addToHistory = true }) {
    this.setState({
      chord,
      suggestionsLoaded: false,
      heldNotes: Array.from({ length: 127 }, () => false),
    });
    addToHistory &&
      this.setState({ chordHistory: [chord, ...this.state.chordHistory] });
    fetch('http://localhost:4000/api/v1/analyses/continuations/suggest/', {
      method: 'POST',
      body: JSON.stringify({ pitches: chord }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(response => response.json())
      .then(result =>
        this.setState({ suggestions: result.data, suggestionsLoaded: true }),
      );
  }
  back() {
    this.setState({
      chord: this.state.chordHistory[0],
      chordHistory: this.state.chordHistory.slice(1),
    });
  }
  render() {
    return (
      <div className="App">
        <select
          className="TransposeSelect"
          value={this.state.transpose}
          onChange={e => this.setState({ transpose: e.target.value })}
        >
          {intervals.map((v, i) => (
            <option value={v} key={i}>
              {v}
            </option>
          ))}
        </select>
        <div className="MomentWrapper">
          <div className="PrevMoment">
            {this.state.chordHistory && (
              <Moment
                type={'previous'}
                disabled={this.state.chordHistory.length <= 1}
                pitches={this.state.chordHistory[1]}
                transpose={this.state.transpose}
                changeChord={chord => {
                  this.back();
                  this.onChordChanged({ chord, addToHistory: false });
                }}
              />
            )}
          </div>
          <div className="CurrentMoment">
            <Moment
              type={'current'}
              pitches={this.state.chord}
              transpose={this.state.transpose}
            />
          </div>
          <div className="Suggestions">
            {this.state.suggestions.reduce((acc, s, i) => {
              const pitches = transposeVoices(
                this.state.suggestionsLoaded
                  ? this.state.chord
                  : this.state.chordHistory[0],
                s.continuation,
              );
              const noteNumberSet = new Set(pitches.map(Note.midi));
              const heldNoteNumbers = this.state.heldNotes.reduce(
                (acc, v, i) => (v ? [...acc, i] : acc),
                [],
              );
              if (
                (this.state.heldNotes.some(v => v) &&
                  console.log(heldNoteNumbers, noteNumberSet)) ||
                heldNoteNumbers.some(v => !noteNumberSet.has(v))
              ) {
                return acc;
              }
              return [
                ...acc,
                <Moment
                  type={'next'}
                  key={i}
                  pitches={pitches}
                  transpose={this.state.transpose}
                  count={s.count}
                  changeChord={chord => this.onChordChanged({ chord })}
                  disabled={!this.state.suggestionsLoaded}
                />,
              ];
            }, [])}
          </div>
          <div className="Keyboard">
            {this.state.heldNotes.map((n, i) => {
              return (
                <div
                  className={cx(['Key', { active: n }])}
                  key={`key${i}`}
                  onClick={() => {
                    const newHeldNotes = this.state.heldNotes;
                    newHeldNotes[i] = !newHeldNotes[i];
                    this.setState({
                      heldNotes: newHeldNotes,
                    });
                  }}
                >
                  {Note.fromMidi(i)}
                </div>
              );
            })}
          </div>
          <Score
            chordHistory={this.state.chordHistory}
            transpose={this.state.transpose}
          />
        </div>
      </div>
    );
  }
}

export default App;
