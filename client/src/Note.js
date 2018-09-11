import React, { Component } from 'react';
import './Note.css';

class Note extends Component {
  render() {
    const { staffOffset } = this.props;
    return (
      <g className="Note" transform={`translate(0, ${staffOffset * 5})`}>
        <line
          x1="-12.5"
          x2="12.5"
          y1="0"
          y2="0"
          className="StaffLine LedgerLine"
        />
        <ellipse
          cx="0"
          cy="0"
          rx="7.5"
          ry="4.95"
          className="NoteHead"
          style={{}}
        />
      </g>
    );
  }
}

export default Note;
