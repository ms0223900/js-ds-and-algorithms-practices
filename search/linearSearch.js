const linearFind = (arr=[], val=0) => {
  if(arr.length === 0) return -1;
  if(arr[0] === val) {
    return true
  }
  return linearFind(arr.slice(1), val)
}

const linearSearch = (arr=[], val=0) => {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if(element === val) {
      return i;
    }
  }
  return -1;
}

console.log(linearFind([1, 2, 3, 4], 40))