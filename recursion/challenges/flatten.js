const flatten = (input=[]) => {
  let res = [];
  for (const el of input) {
    if(Array.isArray(el)) {
      res = [...res, ...flatten(el)]
    } else {
      res = [...res, el];
    }
  }
  return res
}

console.log(
  flatten([1, [2, [4]], [[[3]]]])
)