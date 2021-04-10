const reverse = (input='') => {
  if(input.length === 1) return input;
  return reverse(input.slice(1)) + input[0];
}

console.log(
  reverse('helloworld')
)