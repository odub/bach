import React, { Component } from 'react';
import './App.css';

import Moment from './Moment';
import { TEST_MOMENTS, START_POINTS } from './constants';

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
    suggestions: [],
  };
  componentDidMount() {
    this.onChordChanged(
      START_POINTS[Math.floor(START_POINTS.length * Math.random())],
    );
  }
  onChordChanged(chord) {
    this.setState({ chord, suggestions: [] });
    fetch('http://localhost:4000/api/v1/analyses/continuations/suggest/', {
      method: 'POST',
      body: JSON.stringify({ pitches: chord }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(response => response.json())
      .then(result =>
        this.setState({ suggestions: console.log(result.data) || result.data }),
      )
      .then(console.log);
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
          <div className="CurrentMoment">
            <Moment
              pitches={this.state.chord}
              transpose={this.state.transpose}
            />
          </div>
          <div className="Suggestions">
            {this.state.suggestions.map((s, i) => (
              <Moment
                key={i}
                pitches={this.state.chord}
                transpose={this.state.transpose}
                voiceTranspositions={s.continuation}
                count={s.count}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
