import WAAClock from 'waaclock';

let _context;
let _clock;

export const clock = () => {
  if (!_context) {
    _context = new AudioContext();
  }
  if (!_clock) {
    _clock = new WAAClock(_context);
    _clock.start();
  }
  return _clock;
};
