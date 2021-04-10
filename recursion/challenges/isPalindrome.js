const isPalindrome = (input='') => {
  if(!input) return true;
  if(input[0] !== input[input.length - 1]) return false;
  return isPalindrome(input.slice(1, input.length - 1));
}

function isPalindrome(input='') {
  if(input.length === 1) return true;
  if(input.length === 2) return input[0] === input[1];
  if(input[0] === input.slice(-1)) {
    return isPalindrome(
      input.slice(1, -1)
    )
  }
  return false
}

console.log(
  isPalindrome('tacocat'),
  isPalindrome('abcddcba'),
)