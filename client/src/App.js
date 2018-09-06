import React, { Component } from 'react';
import './App.css';

import Moment from './Moment';
import { TEST_MOMENTS } from './constants';

import './milligram.css';
import './global.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {TEST_MOMENTS.map((ns, i) => (
          <Moment key={i} notes={ns} />
        ))}
      </div>
    );
  }
}

export default App;
