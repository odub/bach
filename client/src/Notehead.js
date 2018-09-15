import React, { Component } from 'react';
import './Notehead.css';

class Note extends Component {
  render() {
    const { staffOffset, col, width } = this.props;
    return (
      <g
        className="Note"
        transform={`translate(${(width - 1) * -5 + col * 11.5}, ${staffOffset *
          5})`}
      >
        {/* <line
          x1="-12.5"
          x2="12.5"
          y1="0"
          y2="0"
          className="StaffLine LedgerLine"
        /> */}
        <ellipse cx="0" cy="0" rx="6" ry="4" className="Notehead" />
      </g>
    );
  }
}

export default Note;
