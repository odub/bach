import React, { Component } from 'react';
import './Moment.css';

import { pitchToPosition, musicXmlParse } from './utils/pitch';
import Staff from './Staff';
import Note from './Note';

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
          <Staff>
            {Array.from({ length: 13 }, (v, i) => (
              <Note staffOffset={-12 + i * 2} key={i} />
            ))}
          </Staff>
        )}
      </div>
    );
  }
}

export default Moment;
