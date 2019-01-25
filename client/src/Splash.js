import React, { Component } from 'react';
import './Splash.css';

class Splash extends Component {
  render() {
    return (
      <div className="Splash">
        <div>Hello World!</div>
        <div>
          <div style={{ visibility: this.props.ready ? 'hidden' : 'initial' }}>
            Loading…
          </div>
          <button
            onClick={this.props.dismiss}
            style={{ visibility: this.props.ready ? 'initial' : 'hidden' }}
          >
            Hi
          </button>
        </div>
      </div>
    );
  }
}

export default Splash;
