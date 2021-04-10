function collectStrings(obj={}) {
  let res = [];
  for (const key in obj) {
    const el = obj[key];
    if(typeof el === 'object') {
      res = [...res, ...collectStrings(el)];
    }
    if(typeof el === 'string') {
      res.push(el)
    }
  }
  return res
}

let obj = {
  stuff: "foo",
  data: {
      val: {
          thing: {
              info: "bar",
              moreInfo: {
                  evenMoreInfo: {
                      weMadeIt: "baz"
                  }
              }
          }
      }
  }
}

console.log(
  collectStrings(obj)
)