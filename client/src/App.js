import React, { Component } from 'react';
import './App.css';

import Moment from './Moment';
import Score from './Score';
import { TEST_MOMENTS, START_POINTS } from './constants';
import { transposeVoices } from './utils/pitch';

import './milligram.css';
import './global.css';

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
            {this.state.suggestions.map((s, i) => (
              <Moment
                type={'next'}
                key={i}
                pitches={transposeVoices(
                  this.state.suggestionsLoaded
                    ? this.state.chord
                    : this.state.chordHistory[0],
                  s.continuation,
                )}
                transpose={this.state.transpose}
                count={s.count}
                changeChord={chord => this.onChordChanged({ chord })}
                disabled={!this.state.suggestionsLoaded}
              />
            ))}
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
