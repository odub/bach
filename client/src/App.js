import React, { Component } from 'react';
import cx from 'classnames';

import Moment from './Moment';
import Score from './Score';
import Devices from './Devices';
import Keyboard from './Keyboard';
import Splash from './Splash';
import { START_POINTS, API_BASE_URL } from './constants';
import { transposeVoices } from './utils/pitch';
import { listInputs } from './utils/midi';
import { clock } from './utils/clock';
import { load as loadSynth } from './utils/synth';

import './App.css';
import './milligram.css';
import './global.css';

const Note = require('tonal-note');

class App extends Component {
  state = {
    chord: null,
    chordHistory: [],
    suggestions: [],
    suggestionsLoaded: false,
    heldPcs: Array.from({ length: 12 }, () => false),
    heldPitches: new Set([]),
    midiInput: null,
    midiInputs: null,
    midiDeviceModal: false,
    splash: true,
    appLoaded: false,
  };
  componentDidUpdate(_, prevState) {
    if (
      (this.state.midiInputs &&
        this.state.midiInputs.length &&
        !prevState.midiInputs) ||
      (prevState.midiInputs &&
        this.state.midiInputs.length !== prevState.midiInputs.length &&
        !this.state.midiInputs.some(i => i.id === this.midiInput))
    ) {
      this.setMidiInput(this.state.midiInputs[0].id);
    }
  }
  componentDidMount() {
    loadSynth(() => this.setState({ appLoaded: true }));
    this.onChordChanged({
      chord: START_POINTS[Math.floor(START_POINTS.length * Math.random())],
    });
    navigator.requestMIDIAccess &&
      navigator.requestMIDIAccess().then(access => {
        this.access = access;
        this.access.onstatechange = event =>
          this.setState({ midiInputs: listInputs(event.currentTarget) });
        this.setState({ midiInputs: listInputs(this.access) });
      });
  }
  handleMidiEvent = e => {
    const { data } = e;
    if (data[0] >> 4 === 9) {
      const newState = new Set(this.state.heldPitches);
      newState.add(data[1]);
      this.setState({ heldPitches: newState });
    } else if (data[0] >> 4 === 8) {
      const newState = new Set(this.state.heldPitches);
      newState.delete(data[1]);
      this.setState({ heldPitches: newState });
    }
  };
  setMidiInput(id) {
    const oldId = this.state.midiInput;
    if (oldId) {
      this.access.inputs
        .get(oldId)
        .then(input => {
          input.onmidimessage = null;
        })
        .catch(console.info);
    }
    const input = this.access.inputs.get(id);
    input.onmidimessage = e => this.handleMidiEvent(e);
    this.setState({ midiInput: id });
  }
  onChordChanged({ chord, addToHistory = true }) {
    global.scrollTo(null, 0);
    this.setState({
      chord,
      suggestionsLoaded: false,
      heldPcs: Array.from({ length: 12 }, () => false),
      heldPitches: new Set([]),
    });
    addToHistory &&
      this.setState({ chordHistory: [chord, ...this.state.chordHistory] });
    this.controller && this.controller.abort();
    if (global.AbortController) {
      this.controller = new global.AbortController();
      this.signal = this.controller.signal;
    }
    chord &&
      fetch(`${API_BASE_URL}/api/v1/analyses/continuations/suggest/`, {
        method: 'POST',
        body: JSON.stringify({ pitches: chord }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        ...(this.signal && { signal: this.signal }),
      })
        .then(response => response.json())
        .then(result =>
          this.setState({ suggestions: result.data, suggestionsLoaded: true }),
        );
  }
  back() {
    this.setState({
      chord: this.state.chordHistory[0],
      chordHistory: this.state.chordHistory.slice(1),
    });
  }
  dismissSplash() {
    clock();
    this.setState({ splash: false });
    global.scrollTo(0, 0);
  }
  render() {
    const suggestions = this.state.suggestions.reduce((acc, s, i) => {
      const pitches = transposeVoices(
        this.state.suggestionsLoaded
          ? this.state.chord
          : this.state.chordHistory[0],
        s.continuation,
      );
      const pitchSet = new Set(pitches.map(p => Note.midi(p)));
      const pcSet = new Set(pitches.map(p => Note.midi(p) % 12));
      const heldPcs = this.state.heldPcs.reduce(
        (acc, v, i) => (v ? [...acc, i % 12] : acc),
        [],
      );
      if (this.state.heldPcs.some(v => v) && heldPcs.some(v => !pcSet.has(v)))
        return acc;
      if (
        this.state.heldPitches.size >= 1 &&
        Array.from(this.state.heldPitches).some(v => !pitchSet.has(v))
      )
        return acc;
      return [
        ...acc,
        <Moment
          type={'next'}
          key={i}
          pitches={pitches}
          currentPitches={this.state.chord}
          transpose={this.state.transpose}
          clickable={true}
          changeChord={chord => this.onChordChanged({ chord })}
          disabled={!this.state.suggestionsLoaded}
        />,
      ];
    }, []);

    return (
      <div className="App">
        {this.state.splash && (
          <Splash
            dismiss={() => this.dismissSplash()}
            ready={this.state.appLoaded}
          />
        )}
        <div
          className={cx([
            'DeviceSettings',
            {
              visible:
                this.state.midiInputs && this.state.midiInputs.length >= 2,
            },
          ])}
          onClick={() => this.setState({ midiDeviceModal: true })}
        >
          Devices
        </div>
        {this.state.midiDeviceModal && (
          <Devices
            midiInputs={this.state.midiInputs}
            midiInput={this.state.midiInput}
            handleInputSelect={input => this.setMidiInput(input)}
            handleDismiss={() => this.setState({ midiDeviceModal: false })}
          />
        )}
        <div
          className={cx([
            'MomentWrapper',
            {
              visible: !this.state.splash,
            },
          ])}
        >
          <div className="SuggestionWrapper">
            <div
              className={cx([
                'PrevMoment',
                {
                  active: this.state.chord,
                },
              ])}
            >
              {
                <Moment
                  type={'previous'}
                  clickable={this.state.chordHistory[1]}
                  disabled={!this.state.chord}
                  pitches={this.state.chord}
                  transpose={this.state.transpose}
                  changeChord={chord => {
                    this.back();
                    this.onChordChanged({
                      chord: this.state.chordHistory[1],
                      addToHistory: false,
                    });
                  }}
                />
              }
            </div>
            <div
              className={cx([
                'Suggestions',
                { active: suggestions && suggestions.length },
              ])}
            >
              {suggestions.length
                ? suggestions
                : this.state.suggestionsLoaded && (
                    <div className="NoSuggestions">No suggestions found</div>
                  )}
            </div>
          </div>
          <Keyboard
            heldPcs={this.state.heldPcs}
            setHeldPcs={heldPcs => this.setState({ heldPcs })}
            heldPitches={this.state.heldPitches}
            setHeldPitches={heldPitches => this.setState({ heldPitches })}
          />
          <Score
            chordHistory={this.state.chordHistory}
            transpose={this.state.transpose}
          />
        </div>
      </div>
    );
  }
}

export default App;
