function validAnagram(prev, next) {
  const prevFreq = {};
  const nextFreq = {};

  for (const str of prev) {
    prevFreq[str] = (prevFreq[str] || 0) + 1;
  }
  for (const str of next) {
    nextFreq[str] = (nextFreq[str] || 0) + 1;
  }
  console.log(prevFreq);
  console.log(nextFreq);

  for (const key in prevFreq) {
    if (prevFreq[key] !== nextFreq[key]) {
      return false;
    }
  }

  return true;
}

function validAnagram(prev, next) {
  if (prev.length !== next.length) {
    return false;
  }
  const lookup = {};

  for (const str of prev) {
    lookup[str] = (lookup[str] || 0) + 1;
  }

  for (const str of next) {
    if (typeof lookup[str] !== 'number') {
      return false;
    }
    lookup[str] -= 1;
  }

  return true;
}