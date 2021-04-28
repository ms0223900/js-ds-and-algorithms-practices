function constructNote(message='', letters='') {
  if(!message) return true;
  if(!letters) return false;
  let lettersCount = {};

  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    if(!lettersCount[letter]) {
      lettersCount[letter] = 1
    } else {
      lettersCount[letter]++;
    }
  }

  for (let i = 0; i < message.length; i++) {
    const char = message[i];
    typeof lettersCount[char] === 'number' && lettersCount[char]--;
    if(lettersCount[char] < 0) return false;
  }
  return true;
}

function findAllDuplicates(nums=[]) {
  if(!nums.length) return [];
  let res = [];
  let visited = {};

  nums.forEach(num => {
    if(!visited[num]) {
      visited[num] = 1
    } else {
      visited[num]++;
    }
    if(visited[num] > 1) {
      res.push(num);
    }
  });

  return res;
}

const getDiffs = (num=0, diff=0) => [num + Math.abs(diff), num - Math.abs(diff)]

function findPair(nums=[], difference=0) {
  if(!nums.length) return false;
  let diffs = {};

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if(diffs[num]) return true;
    const differences = getDiffs(num, difference);
    diffs[differences[0]] = true;
    diffs[differences[1]] = true;
  }

  return false;
}

const checkPair = (nums=[], diff=0) => {
  if(!nums.length) return false;
  if(nums.length === 2) {
    if(getDiffs(nums[0], diff).includes(nums[1])) return true;
  }
  if(nums.length === 3) {
    if(getDiffs(nums[0], diff).includes(nums[1])) return true;
    if(nums[2] === getDiffs(nums[0], diff)) return true;
    if(nums[1] === getDiffs(nums[1], diff)) return true;
  }
  return false;
}

function findPairRecursion(nums=[], difference=0) {
  // let res = false;
  if(nums.length <= 3) return checkPair(nums, difference);
  let middleIdx = Math.floor(nums.length / 2);
  const left = findPairRecursion(nums.slice(0, middleIdx), difference);
  const right = findPairRecursion(nums.slice(middleIdx), difference);
  return (left || right);
}

// console.log(
//   'construct note: ',
//   constructNote('aa', 'abc'),
//   constructNote('abc', 'dcba'),
//   constructNote('aabbcc', 'bcabcaaddff'),
// )

// console.log(
//   'find all duplicate: ',
//   findAllDuplicates([4,3,2,7,8,2,3,1]),
//   findAllDuplicates([4,3,2,1,0,1,2,3]),
// )

console.log(
  'find pair: ',
  findPair([6,1,4,10,2,4], 2),
  findPair([6,1,4,10,2,4], 22),
  findPairRecursion([6,1,4,10,2,4], 2),
)