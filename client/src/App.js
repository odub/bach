import React, { Component } from 'react';
import cx from 'classnames';

import Moment from './Moment';
import Score from './Score';
import { START_POINTS } from './constants';
import { transposeVoices } from './utils/pitch';

import './App.css';
import './milligram.css';
import './global.css';

const Note = require('tonal-note');

const pcs = [
  'C',
  'C#/Db',
  'D',
  'D#/Eb',
  'E',
  'F',
  'F#/Gb',
  'G',
  'G#/Gb',
  'A',
  'A#/Bb',
  'B',
];

class App extends Component {
  state = {
    chord: null,
    chordHistory: [],
    suggestions: [],
    suggestionsLoaded: false,
    heldPcs: Array.from({ length: 12 }, () => false),
  };
  componentDidMount() {
    this.onChordChanged({
      chord: START_POINTS[Math.floor(START_POINTS.length * Math.random())],
    });
  }
  onChordChanged({ chord, addToHistory = true }) {
    global.scrollTo(null, 0);
    this.setState({
      chord,
      suggestionsLoaded: false,
      heldPcs: Array.from({ length: 12 }, () => false),
    });
    addToHistory &&
      this.setState({ chordHistory: [chord, ...this.state.chordHistory] });
    this.controller && this.controller.abort();
    if (global.AbortController) {
      this.controller = new global.AbortController();
      this.signal = this.controller.signal;
    }
    chord &&
      fetch('http://localhost:4000/api/v1/analyses/continuations/suggest/', {
        method: 'POST',
        body: JSON.stringify({ pitches: chord }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        ...(this.signal && { signal: this.signal }),
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
    const suggestions = this.state.suggestions.reduce((acc, s, i) => {
      const pitches = transposeVoices(
        this.state.suggestionsLoaded
          ? this.state.chord
          : this.state.chordHistory[0],
        s.continuation,
      );
      const pcSet = new Set(pitches.map(p => Note.midi(p) % 12));
      const heldPcs = this.state.heldPcs.reduce(
        (acc, v, i) => (v ? [...acc, i % 12] : acc),
        [],
      );
      if (this.state.heldPcs.some(v => v) && heldPcs.some(v => !pcSet.has(v))) {
        return acc;
      }
      return [
        ...acc,
        <Moment
          type={'next'}
          key={i}
          pitches={pitches}
          currentPitches={this.state.chord}
          transpose={this.state.transpose}
          changeChord={chord => this.onChordChanged({ chord })}
          disabled={!this.state.suggestionsLoaded}
        />,
      ];
    }, []);

    return (
      <div className="App">
        <div className="MomentWrapper">
          <div className="SuggestionWrapper">
            <div
              className={cx([
                'PrevMoment',
                { active: this.state.chordHistory.length > 1 },
              ])}
            >
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
            <div
              className={cx(['Suggestions', { active: suggestions.length }])}
            >
              {suggestions.length
                ? suggestions
                : this.state.suggestionsLoaded && (
                    <div className="NoSuggestions">No suggestions found</div>
                  )}
            </div>
          </div>
          <div className="Keyboard">
            {this.state.heldPcs.map((n, i) => {
              return (
                <div
                  className={cx(['Key', { active: n }])}
                  key={`key${i}`}
                  onClick={() => {
                    const newheldPcs = this.state.heldPcs;
                    newheldPcs[i] = !newheldPcs[i];
                    this.setState({
                      heldPcs: newheldPcs,
                    });
                  }}
                >
                  {pcs[i]}
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
