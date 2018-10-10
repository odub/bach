import React, { Component } from 'react';
import './Devices.css';

class Devices extends Component {
  render() {
    const { midiInputs } = this.props;
    return (
      <div className="Devices">
        <div className="DeviceList">
          <select
            onChange={e => this.props.handleInputSelect(e.currentTarget.value)}
            value={this.props.midiInput}
            ref={this.deviceSelect}
          >
            {midiInputs &&
              midiInputs.map((input, i) => (
                <option value={input.id} key={input.id}>
                  {input.name}
                </option>
              ))}
          </select>
          <div className="DeviceButtonWrapper">
            <button
              className="button-outline"
              onClick={() => this.props.handleDismiss()}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Devices;
