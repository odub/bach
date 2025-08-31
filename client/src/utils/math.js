export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function createLogScale(
  domainMin,
  domainMax,
  rangeMin,
  rangeMax,
  base = 10,
) {
  const logMin = Math.log(domainMin) / Math.log(base);
  const logMax = Math.log(domainMax) / Math.log(base);
  const scale = (rangeMax - rangeMin) / (logMax - logMin);

  return function (value) {
    const logValue = Math.log(value) / Math.log(base);
    return rangeMin + (logValue - logMin) * scale;
  };
}

export function logScale(value, fromMin, fromMax, toMin, toMax, base = 10) {
  const scale = createLogScale(fromMin, fromMax, toMin, toMax, base);
  return scale(value);
}
