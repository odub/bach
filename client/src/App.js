import React, { Component } from 'react';
import './App.css';

import Moment from './Moment';
import { TEST_MOMENTS } from './constants';

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
  };
  render() {
    return (
      <div className="App">
        <select
          className="TransposeSelect"
          value={this.state.transpose}
          onChange={e => this.setState({ transpose: e.target.value })}
        >
          {intervals.map(v => (
            <option value={v}>{v}</option>
          ))}
        </select>
        {TEST_MOMENTS.map((ns, i) => (
          <Moment key={i} notes={ns} transpose={this.state.transpose} />
        ))}
      </div>
    );
  }
}

export default App;
