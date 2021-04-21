const hash = (key='', arrLength=0) => {
  let total = 0;
  for (const char of key) {
    const val = char.charCodeAt(0) - 96;
    total += (total + val) % arrLength
  }
  return total;
}

class HashTable {
  constructor(size=81) {
    this.keyMap = new Array(size)
  }

  _hash(key) {
    let total = 0;
    let PRIME = 97;
    for (let i = 0; i < Math.min(key.length, 99); i++) {
      const char = key[i]
      const val = char.charCodeAt(0) - 96
      total = (total * PRIME + val) % this.keyMap.length
    }
    return total;
  }

  set(key, value) {
    const keyValuePair = [key, value]
    const idx = this._hash(key)
    if(!this.keyMap[idx]) {
      this.keyMap[idx] = []
    }
    // 覆蓋同一個key
    const keyIdx = this.keyMap[idx].findIndex(k => k[0] === key);
    if(keyIdx !== -1) {
      this.keyMap[idx][keyIdx] = keyValuePair
    } else {
      this.keyMap[idx].push(keyValuePair)
    }
    return this;
  }

  get(key) {
    const idx = this._hash(key);
    if(!this.keyMap[idx]) return undefined;
    for (let i = 0; i < this.keyMap[idx].length; i++) {
      const _key = this.keyMap[idx][i][0]
      if(_key === key) {
        return this.keyMap[idx][i][1]
      }
    };
  }

  keys() {
    let keys = []
    for (const keyMap of this.keyMap) {
      if(keyMap) {
        for (const keyValue of keyMap) {
          const key = keyValue[0]
          if(!keys.includes(key)) {
            keys.push(key)
          }
        }
      }
    }
    return keys
  }

  values() {
    let values = []
    for (const keyMap of this.keyMap) {
      if(keyMap) {
        for (const keyValue of keyMap) {
          const value = keyValue[1]
          if(!values.includes(value)) {
            values.push(value)
          }
        }
      }
    }
    return values
  }
}

const hashTable = new HashTable()
hashTable.set('red', '#f00').set('yellow', '#ff0').set('cyan', '#000fff').set('red', '#ff0000')

console.log(
  'hash table sample: ',
  // hashTable,
  hashTable.get('red'),
  hashTable.get('cyan'),
  hashTable.get('green'),
  hashTable.keys(),
  hashTable.values(),
)