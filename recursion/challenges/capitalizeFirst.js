const capitalizeFirst = (input=[]) => {
  console.log(input);
  if(input.length === 1) {
    return [`${input[0][0].toUpperCase()}${input[0].slice(1)}`]
  }
  let res = capitalizeFirst(input.slice(0, -1));
  res = [
    ...res,
    `${input[input.length - 1][0].toUpperCase()}${input[input.length - 1].slice(1)}`,
  ]
  return res;
}

console.log(
  capitalizeFirst(['cat', 'dog', 'seal', 'bear'])
)