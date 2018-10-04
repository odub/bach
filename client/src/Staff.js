import React, { Component } from 'react';
import './Staff.css';

import { STAFF_LINE_WIDTH } from './constants';

class Staff extends Component {
  render() {
    const { staffLines, width = 7, ...props } = this.props;
    return (
      <svg
        viewBox={`0 -75 ${width * STAFF_LINE_WIDTH} 150`}
        xmlns="http://www.w3.org/2000/svg"
        className="Staff"
        style={{ width: width * STAFF_LINE_WIDTH }}
        {...props}
      >
        {staffLines.map((v, i) => (
          <line
            x1={0}
            x2={width * STAFF_LINE_WIDTH}
            y1={v * 0.5 * STAFF_LINE_WIDTH}
            y2={v * 0.5 * STAFF_LINE_WIDTH}
            key={i}
            className="StaffLine"
          />
        ))}
        {this.props.children}
      </svg>
    );
  }
}

export default Staff;
