function findLongestSubstring(str='') {
  if(!str) {
    return 0;
  }
  let strLookup = {};
  let start = 0;
  let end = 0;
  let longestSubStrLength = 0;

  while(end < str.length) {
    const endStr = str[end];
    if(!strLookup[endStr]) {
      strLookup[endStr] = 1;
      // console.log(strLookup)
      longestSubStrLength = Math.max(
        longestSubStrLength,
        end - start + 1,
      )
      end++;
    } else {
      strLookup[str[start]] = undefined;
      start++;
    }
  }

  return longestSubStrLength;
}

function findLongestSubstring(str='') {
  let longest = 0;
  let lookup = {};
  let start = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    console.log(lookup);
    if(lookup[char]) {
      start = Math.max(start, lookup[char]);
    }
    console.log(start, i);
    const size = i - start + 1;
    longest = Math.max(longest, size);
    // 更新並存char出現的index
    lookup[char] = i + 1;
  }

  return longest;
}

console.log(
  // findLongestSubstring('longestsubstring'),
  findLongestSubstring('thisisawesome'),
)