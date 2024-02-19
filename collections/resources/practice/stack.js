// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效
function isValid(str) {
  if (!str) return true
  let stack = []
  let len = str.length
  let obj = {
    '{': '}',
    '(': ')',
    '[': ']'
  }

  for (let i = 0; i < len; i++) {
    const ch = str[i]
    if (ch === '(' || ch === '[' || ch === '{') {
      stack.push(obj[ch])
    } else {
      if (!stack.length || stack.pop() !== ch) {
        return false
      }
    }
  }
  return stack.length === 0
}

// 根据每日气温列表，请重新生成一个列表，对应位置的输出是需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，请在该位置用 0 来代替
// 给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]
function dailyTemperatures(list) {
  let len = list.length
  let stack = []
  let res = new Array(len).fill(0)
  for (let i = 0; i < len; i++) {
    while(stack.length && list[i] > list[stack[stack.length - 1]]) {
      let top = stack.pop()
      res[top] = i - top
    }
    stack.push(i)
  }
  return res
}

// 最小栈
/**
 * MinStack minStack = new MinStack();
 * minStack.push(-2);
 * minStack.push(0);
 * minStack.push(-3);
 * minStack.getMin(); --> 返回 -3.
 * minStack.pop();
 * minStack.top(); --> 返回 0.
 * minStack.getMin(); --> 返回 -2.
 */
function MinStack() {
  this.stack = []
  this.stack2 = []
}
MinStack.prototype.pop = function() {
  if (this.stack.pop() === this.stack2[this.stack2.length - 1]) {
    this.stack2.pop()
  }
}
MinStack.prototype.push = function(item) {
  this.stack.push(item)
  if (this.stack2.length === 0 || this.stack2[this.stack2.length - 1] >= item) {
    this.stack2.push(item)
  }
}
MinStack.prototype.top = function() {
  if (!this.stack.length) return 
  return this.stack[this.stack.length-1]
}
MinStack.prototype.getMin = function() {
  return this.stack2[this.stack2.length - 1]
}