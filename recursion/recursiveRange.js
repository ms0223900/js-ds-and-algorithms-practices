const recursiveRange = (num=1) => {
  if(num <= 1) return num;
  return num + recursiveRange(num - 1);
};

console.log(
  recursiveRange(10)
);