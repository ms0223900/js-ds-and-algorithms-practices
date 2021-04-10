const isPalindrome = (input='') => {
  if(!input) return true;
  if(input[0] !== input[input.length - 1]) return false;
  return isPalindrome(input.slice(1, input.length - 1));
}

console.log(
  isPalindrome('tacocat')
)