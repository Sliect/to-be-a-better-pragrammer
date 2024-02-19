function MyQueue() {
  this.stack1 = []
  this.stack2 = []
}
MyQueue.prototype.push = function (item) {
  this.stack1.push(item)
}
MyQueue.prototype.pop = function () {
  if (this.stack2.length === 0) {
    while(this.stack1.length) {
      this.stack2.push(this.stack1.pop())
    }
  }
  return this.stack2.pop()
}
MyQueue.prototype.peek = function() {
  if (this.stack2.length === 0) {
    while(this.stack1.length) {
      this.stack2.push(this.stack1.pop())
    }
  }
  return this.stack2[this.stack2.length - 1]
}
MyQueue.prototype.empty = function() {
  return !this.stack1.length && !this.stack2.length
}

// 给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值
// 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3 输出: [3,3,5,5,6,7]
function maxSlidingWindow(nums, k) {
  const len = nums.length
  let deque = []
  let res = []
  for (let i = 0; i < len; i++) {
    while(deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop()
    }
    deque.push(i)
    while(deque.length && deque[0] <= i - k) {
      deque.shift()
    }
    if (i >= k-1) {
      res.push(nums[deque[0]])
    }
  }
  return res
}