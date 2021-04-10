function someRecursive(inputArr=[], callback=() => {}) {
  if(inputArr.length === 0) return false
  if(callback(inputArr[0])) {
    return true
  }
  return someRecursive(inputArr.slice(1), callback);
}

const isEven = val => val % 2 === 0
console.log(
  someRecursive([1, 3, 4], isEven)
)