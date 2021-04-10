function stringifyNumbers(obj={}) {
  let res = {...obj};
  for (const key in obj) {
    const el = obj[key];
    if(typeof el === 'object' && !Array.isArray(el)) {
      res[key] = stringifyNumbers(el);
    }
    if(typeof el === 'number') {
      res[key] = String(el);
    }
  }
  return res;
}

let obj = {
  a: 1,
  b: [],
  c: '1',
  d: {
    val: 10,
  }
}

console.log(
  stringifyNumbers(obj),
  obj
)