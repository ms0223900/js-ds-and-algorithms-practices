const power = (baseNum, ponential) => {
  if(ponential === 0) return 1;
  return baseNum * power(baseNum, ponential - 1);
}

console.log(
  power(2, 10)
)