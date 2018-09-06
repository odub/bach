import React, { Component } from 'react';
import './Moment.css';

import { pitchToPosition, musicXmlParse } from './utils/pitch';

class Moment extends Component {
  state = {
    debug: false,
  };
  render() {
    const { notes } = this.props;
    const { debug } = this.state;

    return (
      <div className="Moment">
        <a
          className="MomentDebugToggle"
          onClick={() => this.setState({ debug: !debug })}
        >
          src
        </a>
        {debug ? (
          <pre className="MomentDebug">
            {notes
              .map(
                n =>
                  n.parsedXml.pitch &&
                  JSON.stringify(
                    pitchToPosition(musicXmlParse(n.parsedXml.pitch)),
                  ),
              )
              .join('\n')}
          </pre>
        ) : (
          <span>Hi</span>
        )}
      </div>
    );
  }
}

export default Moment;
