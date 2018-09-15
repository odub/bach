import React, { Component } from 'react';
import './Staff.css';

class Staff extends Component {
  render() {
    const { staffLines } = this.props;
    return (
      <svg viewBox="-50 -100 100 200" xmlns="http://www.w3.org/2000/svg">
        <svg width="1rem" height="1rem" overflow="visible" viewBox="0 0 10 10">
          {staffLines.map((v, i) => (
            <line
              x1="-25"
              x2="25"
              y1={v * 5}
              y2={v * 5}
              key={i}
              className="StaffLine"
            />
          ))}
          {this.props.children}
        </svg>
      </svg>
    );
  }
}

export default Staff;
