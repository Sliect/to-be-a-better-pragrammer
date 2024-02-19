/**
 * 示例 1: 输入: "aba"
 * 输出: True
 * 示例 2:
 * 输入: "abca"
 * 输出: True
 * 解释: 你可以删除c字符。
 * 注意: 字符串只包含从 a-z 的小写字母。字符串的最大长度是50000。
 */
function validPalindrome(s) {
  let i = 0
  let j = s.length - 1

  while (i < j && s[i] === s[j]) {
    i++
    j--
  }

  if (isPalindrome(i+1, j)) {
    return true
  }
  if (isPalindrome(i, j-1)) {
    return true
  }

  function isPalindrome(left, right) {
    while(left < right) {
      if (s[left] !== s[right]) {
        return false
      }
      left++
      right--
    }
    return true
  }
  return false
}

// 字符串正则匹配
const WordDirctionary = function() {
  this.words = {}
}
WordDirctionary.prototype.addWord = function(word) {
  if (this.words[word.length]) {
    this.words[word.length].push(word)
  } else {
    this.words[word.length] = [word]
  }
}
WordDirctionary.prototype.search = function(word) {
  if (!word.length) {
    return false
  }
  const len = word.length
  if (!word.includes('.')) {
    return this.words[len].includes(word)
  }

  const reg = new RegExp(word)
  return this.words[len].some(item => {
    return reg.test(item)
  })
}

// 
function atoi(str) {
  let max = Math.pow(2, 32) - 1
  let min = -max - 1
  let reg = /\s*([+-]?\d+)/
  let targetNum = 0
  const groups = str.match(reg)
  if (groups) {
    targetNum = + groups[1]
  }
  if (targetNum > max) return max
  if (targetNum < min) return min
  return targetNum
}