const genKey = (arr=[], target=0) => arr.join(',') + ',' + String(target);
const findMemo = (memo={}) => (denos=[], target=0) => memo[genKey(denos, target)];

function coinChange(denominations=[], target=0) {
  let memo = {};

  function coinChangeHelper(_denominations=[], _target=0) {
    const foundMemo = findMemo(memo)(_denominations, _target);
    // console.log(_denominations, _target, foundMemo);
    if(foundMemo) return foundMemo;
    let plansCount = 0;
    if(_denominations.length === 0) return plansCount;
    if(_denominations.length === 1) {
      return 1;
    };
    
    const lastDeno = _denominations[_denominations.length - 1];
    const remainDenos = _denominations.slice(0, -1);
    let i = 0;
    let current = lastDeno * i;
    
    while(current <= _target) {
      const remains = _target - current;
      plansCount += coinChangeHelper(remainDenos, remains);
      
      i++;
      current = lastDeno * i;
    }
    const key = genKey(_denominations, _target)
    memo[key] = plansCount;
    return plansCount;
  }
  coinChangeHelper(denominations, target);

  // console.log(memo);
  return findMemo(memo)(denominations, target);
}

function coinChangeRecursion(_denominations=[], _target=0) {
  let plansCount = 0;
  if(_denominations.length === 0) return plansCount;
  if(_denominations.length === 1) {
    return _target % _denominations[0] === 0 ? 1 : 0;
  };
  let i = 0;
  let current = _denominations.slice(-1) * i;
  while(current <= _target) {
    const remains = _target - current;
    plansCount += coinChangeRecursion(_denominations.slice(0, -1), remains);
    i++;
    current = _denominations.slice(-1) * i;
  }
  return plansCount;
}

const denominations = [1, 5, 10, 25];
console.log(
  // coinChangeRecursion(denominations, 1541),
  coinChange(denominations, 1541),
)
