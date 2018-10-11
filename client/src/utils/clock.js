import WAAClock from 'waaclock';

const context = new AudioContext();
export const clock = new WAAClock(context);
clock.start();
