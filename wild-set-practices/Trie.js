class Trie {
  constructor() {
    this.characters = {};
    this.isWord = false;
  }
  
  addWord(word='') {
    let currentTrie = this;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if(!currentTrie.characters[char]) {
        currentTrie.characters[char] = new Trie();
      }
      currentTrie = currentTrie.characters[char];
    }
    currentTrie.isWord = true
    return this;
  }

  // recursion
  addWord(word='', index=0) {
    if(index === word.length) {
      this.isWord = true;
    }
    if(index < word.length) {
      const char = word[index];
      const nextTrie = this.characters[char] || new Trie();
      nextTrie.addWord(word, index+1);
      this.characters[char] = nextTrie; // 這個很重要，要把trie連結起來
    }
    return this;
  }

  findWord(word='', idx=0, trie=this) {
    // console.log(word, idx, trie);
    if(idx === word.length) {
      return trie;
    }
    if(trie) {
      const char = word[idx];
      const nextTrie = trie.characters[char];
      return nextTrie ? nextTrie.findWord(word, idx+1, nextTrie) : undefined;
    }

    return undefined;
  }

  // 原本解法
  findWord(word='', idx=0) {
    const char = word[idx];
    if(idx < word.length - 1 && this.characters[char]) {
      idx ++;
      return this.characters[char].findWord(word, idx)
    } else {
      return this.characters[char];
    }
  }

  getWords(words=[], currentWord='') {
    if(this.isWord) {
      words.push(currentWord);
    }
    for (const char in this.characters) {
      const nextWord = currentWord + char;
      this.characters[char].getWords(words, nextWord);  
    }
    return words;
  }

  getWordsStack(startTrie=this, currentWord='') {
    let currentTrie = startTrie;
    let words = [];
    let stack = [{
      trie: currentTrie,
      currentWord,
    }];

    while(stack.length > 0) {
      const popped = stack.pop();
      const currentTrie = popped.trie;
      // console.log(popped);
      if(currentTrie.isWord) {
        words.push(popped.currentWord);
      }
      for (const char in currentTrie.characters) {
        stack.push({
          trie: currentTrie.characters[char],
          currentWord: popped.currentWord + char,
        });
      }
    }

    return words;
  }

  getCharsLength(characters={}) {
    return Object.keys(characters).length;
  }

  removeWord(word='') {
    let i = 0;
    let current = this;
    let onlyOneCharTrie;
    let warningChar = false;

    while(i < word.length) {
      const char = word[i];
      const trie = current.characters[char];
      if(i === word.length - 1) {
        current.characters[char].isWord = false;
      }
      // 如果還有字
      if(trie) {
        if(
          !warningChar && 
          current.characters[char] && 
          this.getCharsLength(current.characters[char].characters) === 1
        ) {
          warningChar = char;
          onlyOneCharTrie = current;
        }
        // 如果下一個還找得到「其他的」字
        if(
          (current.characters[char] && 
          this.getCharsLength(current.characters[char].characters) > 1)
        ) {
          warningChar = undefined;
        }
        // 到最後一個，但是還有字的話，就不砍掉了
        if(
          i === word.length - 1 &&
          this.getCharsLength(trie.characters) > 0
        ) {
          warningChar = undefined;
        }
        
        current = current.characters[char];
        i++;
      } else {
        current.characters[char] = undefined;
        break;
      };
    }

    if(warningChar) {
      onlyOneCharTrie.characters[warningChar] = undefined;
    }

    return this;
  }

  autoComplete(prefix='') {
    let currentTrie = this;
    let i = 0;
    while(i < prefix.length && currentTrie) {
      currentTrie = currentTrie.characters[prefix[i]];
      i++;
    }
    if(!currentTrie) return [];
    const words = currentTrie.getWordsStack(currentTrie, prefix);
    return words;
  }

  autoComplete(prefix='') {
    const currentTrie = this.findWord(prefix);
    if(currentTrie) {
      return currentTrie.getWords([], prefix);
    } else {
      return [];
    }
  }
}

const firstTrie = new Trie();
firstTrie.addWord('fun')

// console.log(
//   firstTrie.characters.f.characters.u.isWord,
//   firstTrie.characters.f.characters.u.characters.n.isWord,
//   firstTrie.characters.f.characters.u.characters.l,
// )

const secondTrie = new Trie();
secondTrie
  .addWord('ha').addWord('hat').addWord('has').addWord('have').addWord('hate')
  .addWord('awesome').addWord('argue');

// console.log(
//   secondTrie.characters.h.characters.a.isWord,
//   secondTrie.characters.h.characters.a.characters.t.isWord,
//   secondTrie.characters.h.characters.a.characters.v.isWord,
//   secondTrie.characters.h.characters.a.characters.v.characters.e.isWord,
//   secondTrie.characters.h.characters.a.characters.t.characters.e.isWord,
//   Object.keys(secondTrie.characters.h.characters.a.characters).length,
// )

// secondTrie.removeWord('hat');
// secondTrie.removeWord('argue');
// console.log(
//   secondTrie.characters.h.characters.a.characters.t.isWord,
//   secondTrie.characters.h.characters.a.characters.t.characters.e.isWord,
//   secondTrie.characters.h.characters.a.isWord,
//   secondTrie.characters.h.characters.a.characters.v.characters.e.isWord,
//   secondTrie.characters.a.characters.r,
// )

// console.log(
//   secondTrie.findWord('tacobell'),
//   secondTrie.findWord('hat').characters,
//   secondTrie.findWord('have').characters,
// )

// console.log(
//   secondTrie.getWords(),
//   secondTrie.getWordsStack(),
// )

console.log(
  'auto complete: ',
  secondTrie.autoComplete('ha'),
)