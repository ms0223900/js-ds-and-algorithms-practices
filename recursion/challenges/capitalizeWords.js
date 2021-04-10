const capitalizeWords = (words=[], res=[]) => {
  if(words.length === 0) {
    return res;
  }
  res = [
    words[0].toUpperCase(), 
    ...capitalizeWords(words.slice(1), res)
  ]
  return res;
}

function capitalizeWords(words=[]) {
  if(words.length === 1) {
    return [words[0].toUpperCase()]
  }
  let res = capitalizeWords(words.slice(0, -1))
  res = [
    ...res, words[words.length - 1].toUpperCase()
  ]
  return res
}

console.log(
  capitalizeWords(['cats', 'dogs', 'seals'])
)