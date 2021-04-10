const isEven = val => typeof val === 'number' && val % 2 === 0;

const nestedEvenSum = (obj={}) => {
  let res = 0;
  for (const key in obj) {
    const el = obj[key];
    if(typeof el === 'object') {
      res += nestedEvenSum(el);
    }
    if(isEven(el)) {
      res += el;
    }
  }
  return res;
}

const obj1 = {
  a: 2,
  b: {
    b1: 3,
    b2: 4,
    b3: '',
    c: {
      c1: 10,
    }
  }
}

console.log(
  nestedEvenSum(obj1),
)