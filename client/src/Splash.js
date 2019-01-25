import React, { Component } from 'react';
import './Splash.css';
import { Buffer } from 'tone';

class Splash extends Component {
  state = {
    progress: 0,
  };
  constructor(props) {
    super(props);
    Buffer.on('progress', progress => {
      if (progress !== 1 && progress < this.state.progress + 0.1) return;
      this.setState({ progress });
    });
  }
  render() {
    return (
      <div className="Splash">
        <div>
          <h4>Welcome to Voice Graph.</h4>
          <p>
            Voice Graph is a new interactive way of exploring musical harmony.
          </p>
          <br />
        </div>
        <div>
          <button onClick={this.props.dismiss} disabled={!this.props.ready}>
            Start exploring
          </button>
        </div>
        <div className="Loading" style={{ opacity: this.props.ready ? 0 : 1 }}>
          <div>Loading sounds…</div>
          <div className="Progress">
            <div
              className="ProgressBar"
              style={{ width: `${this.state.progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Splash;
