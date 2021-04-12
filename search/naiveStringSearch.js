const naiveStringSearch = (str='', matchStr='') => {
  if(!str || !matchStr) {
    return 0;
  }
  let count = 0;
  const matchStrLen = matchStr.length;

  for (let i = 0; i < str.length; i++) {
    // origin
    // for (let j = 0; j < matchStr.length; j++) {
    //   const matchStrChar = matchStr[j];
    //   if(matchStrChar !== str[i + j]) {
    //     break;
    //   }
    //   if(j === matchStr.length - 1) {
    //     count += 1;
    //   }
    // }

    // refactor
    const sliced = str.slice(i, i + matchStrLen);
    count = (sliced === matchStr) ? count + 1 : count;
  }

  return count;
}

console.log(
  naiveStringSearch('abcwowsssswow', 'wow'),
  naiveStringSearch('lorie loled', 'lo'),
)