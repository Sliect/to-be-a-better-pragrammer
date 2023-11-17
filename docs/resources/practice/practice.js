// 最长子回文
// 表格法 填表顺序 最优子结构 无后效性
function longestPalindrome(s) {
  let dp = []
  const len = s.length
  for (let i = 0; i < len; i++) {
    dp[i] = []
  }
  let st = 0,
    end = 0
  // 初始化最长回文子串的初始值为1
  for (let i = 0; i < len; i++) {
    dp[i][i] = 1
  }
  for (let i = 0; i < len - 1; i++) {
    if (s[i] === s[i + 1]) {
      dp[i][i + 1] = 1
      st = i
      end = i + 1
    }
  }

  for (let n = 3; n <= len; n++) {
    for (let i = 0; i <= len - n; i++) {
      let j = i + n - 1
      if (dp[i + 1][j - 1]) {
        if (s[i] === s[j]) {
          dp[i][j] = 1
          st = i
          end = j
        }
      }
    }
  }

  return s.slice(st, end + 1)
}

// function TreeNode(val) {
//   this.val = val
//   this.left = this.right = null
// }
// 前序遍历 preorder = [3,9,20,15,7]
// 中序遍历 inorder = [9,3,15,20,7]
function buildTree(preorder, inorder) {
  const len = preorder.length

  function build(preL, preR, inL, inR) {
    if (preL > preR) return null
    const root = new TreeNode()
    root.val = preorder[preL]
    const k = inorder.indexOf(root.val)
    const numLeft = k - inL
    root.left = build(preL + 1, preL + numLeft, inL, k - 1)
    root.right = build(preL + numLeft + 1, preR, k + 1, inR)
    return root
  }

  return build(0, len - 1, 0, len - 1)
}
// 中序遍历 左根右 [9,3,15,20,7]
// 后序遍历 左右根 [9,15,7,20,3]
function buildTree2(inorder, postorder) {
  const len = postorder.length

  function build(inL, inR, postL, postR) {
    if (postL > postR) return null
    const root = new TreeNode()
    root.val = postorder[postR]
    const k = inorder.indexOf(root.val)
    const numLeft = k - inL
    root.left = build(inL, k - 1, postL, postL + numLeft - 1)
    root.right = build(k + 1, inR, postL + numLeft, postR - 1)
    return root
  }
  return build(0, len - 1, 0, len - 1)
}

// 非递归的单边快速排序
function quickSort(arr, low = 0, high = arr.length - 1) {
  let stack = [{
    low,
    high
  }]
  while (stack.length) {
    let param = stack.pop()
    let pivot = partition(arr, param.low, param.high)
    if (param.low < pivot - 1) {
      stack.push({
        low: param.low,
        high: pivot - 1
      })
    }
    if (pivot < param.high) {
      stack.push({
        low: pivot + 1,
        high: param.high
      })
    }
  }
  return arr
}

function partition(arr, low, high) {
  let pivotValue = arr[low]
  // 慢指针 标记小于基准值的最右下标
  let mark = low
  for (let i = low + 1; i <= high; i++) {
    if (arr[i] < pivotValue) {
      // 变成大于等于基准值的最左下标
      mark++
      let p = arr[mark]
      // mark恢复成小于基准值的最右下标
      arr[mark] = arr[i]
      arr[i] = p
    }
  }
  arr[low] = arr[mark]
  arr[mark] = pivotValue

  return mark
}

// 判断正整数是否是2的整数次幂
// 二进制思维
function isPowerOf2(num) {
  return (num & num - 1) === 0
}

// 岛屿
function numIslands(grid) {
  const moveX = [0, 1, 0, -1]
  const moveY = [1, 0, -1, 0]
  if (!grid || grid.length === 0 || grid[0].length === 0) {
    return 0
  }
  let count = 0
  let row = grid.length,
    column = grid[0].length

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      if (grid[i][j] === 1) {
        dfs(grid, i, j)
        count++
      }
    }
  }

  return count

  function dfs(grid, i, j) {
    if (i < 0 || i >= row || j < 0 || j >= column || grid[i][j] === 0) {
      return
    }
    grid[i][j] = 0
    for (let k = 0; k < 4; k++) {
      dfs(grid, i + moveX[k], j + moveY[k])
    }
  }
}

function cleanRoom(_robot) {
  const boxSet = new Set()
  let dir = 0

  function dfs(robot, boxSet, i, j, dir) {
    let box = i + '+' + j
    if (boxSet.has(box)) return
    robot.clean()
    boxSet.add(box)

    for (let k = 0; k < 4; k++) {
      if (robot.move()) {
        let x = i,
          y = j
        switch (dir) {
          case 0:
            x = i - 1
            break
          case 90:
            y = j + 1
            break
          case 180:
            x = i + 1
            break
          case 270:
            y = j - 1
            break
          default:
            break
        }
        dfs(robot, boxSet, x, y, dir)
        robot.turnLeft()
        robot.turnLeft()
        robot.move()
        robot.turnRight()
        robot.turnRight()
      }
      robot.turnRight()
      dir += 90
      dir %= 360
    }
  }
}

// 合并区间
function merge(intervals) {
  const res = []
  const len = intervals.length

  // 从小到大排序
  intervals.sort((a, b) => a[0] - b[0])
  // 处理区间的边界情况
  if (!intervals || !intervals.length) {
    return []
  }
  res.push(intervals[0])
  // 尾首对比
  for (let i = 1; i < len; i++) {
    let prev = res[res.length - 1]
    if (intervals[i][0] <= prev[1]) {
      prev[1] = Math.max(intervals[i][1], prev[1])
    } else {
      res.push(intervals[i])
    }
  }

  return res
}

// [2^(n-1)-1, 2^n-2]
function findMinRoot(root, p, q) {
  let pIndex = root.indexOf(p)
  let qIndex = root.indexOf(q)
  while (pIndex !== qIndex) {
    if (pIndex < qIndex) {
      qIndex = Math.floor((qIndex - 1) / 2)
    } else {
      pIndex = Math.floor((pIndex - 1) / 2)
    }
  }
  return root[pIndex]
}

// 刷房子 
// dp[i][j] = dp[i-1][j] + Math.min(cost[i][j])
function minCost(costs) {
  let prev = new Array(...costs[0])
  let curr = []
  const len = costs.length
  let n = 1
  while (n < len) {
    curr[0] = costs[n][0] + Math.min(prev[1], prev[2])
    curr[1] = costs[n][1] + Math.min(prev[0], prev[2])
    curr[2] = costs[n][2] + Math.min(prev[0], prev[1])
    prev = new Array(...curr)
    n++
  }

  return Math.min(...curr)
}

// 红绿灯 异步 [fn1, fn2, ...]
function wait(seconds, cb) {
  return function () {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve()
        cb()
      }, seconds)
    })
  }
}

function lightRed() {
  console.log('red')
}

function lightGreen() {
  console.log('green')
}

function lightYellow() {
  console.log('yellow')
}

function turn(fns, i = 0) {
  const fn = fns[i]
  i++
  i = i >= fns.length ? 0 : i
  return fn().then(_v => {
    return turn(fns, i)
  })
}
turn([wait(3000, lightRed), wait(2000, lightGreen), wait(1000, lightYellow)])

// 1. 基础版本
// 2. 链式调用
// 3. 加入延时机制
// 4. 增加状态
// 5. 真链式调用
// 6. thenable 对象
// 7. reject
// 8. catch finally
// 9. 静态方法

// resolve 是触发器 触发的是下一个回调函数
// then 是注册事件 
class Promise {
  callbacks = []
  state = 'pending'
  value = null
  constructor(fn) {
    fn(this._resolve.bind(this), this._reject.bind(this))
  }
  then(onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      this._handle({
        onFulfilled: onFulfilled || null,
        onRejected: onRejected || null,
        resolve,
        reject
      })
    })
  }
  _handle(callback) {
    if (this.state === 'pending') {
      this.callbacks.push(callback)
      return
    }
    let cb = this.state === 'fulfilled' ? callback.onFulfilled : callback.onRejected
    if (!cb) {
      cb = this.state === 'fulfilled' ? callback.resolve : callback.reject
      cb(this.value)
      return
    }
    let ret
    try {
      ret = cb(this.value)
      cb = this.state === 'fulfilled' ? callback.resolve : callback.reject
    } catch (error) {
      cb = callback.reject
      ret = error
    } finally {
      cb(ret)
    }
  }
  catch (onError) {
    return this.then(null, onError)
  } finally(onDone) {
    let Promise = this.constructor
    return this.then(
      value => Promise.resolve(onDone()).then(() => value),
      reason => Promise.resolve(onDone()).then(() => {
        throw reason
      })
    )
  }
  _resolve(value) {
    if (value && typeof value === 'object' || typeof value === 'function') {
      let then = value.then
      if (typeof then === 'function') {
        then.call(value, this._resolve.bind(this))
        return
      }
    }
    this.state = 'fulfilled'
    this.value = value
    this.callbacks.forEach(callback => this._handle(callback))
  }
  _reject(reason) {
    this.state = 'rejected'
    this.value = reason
    this.callbacks.forEach(callback => this._handle(callback))
  }

  static resolve(value) {
    if (value instanceof Promise) {
      return value
    } else if (value && typeof value === 'object' && typeof value.then === 'function') {
      let then = value.then
      return new Promise(resolve => {
        then(resolve)
      })
    } else if (value) {
      return new Promise(resolve => resolve(value))
    } else {
      return new Promise(resolve => resolve())
    }
  }
  static reject(value) {
    if (value && typeof value === 'object' && typeof value.then === 'function') {
      let then = value.then
      return new Promise((_, reject) => {
        then(reject)
      })
    } else {
      return new Promise((_, reject) => reject(value))
    }
  }
  static all(promises) {
    return new Promise((resolve, reject) => {
      let index = 0
      let len = promises.length
      let arr = []

      promises.forEach((promise, i) => {
        Promise.resolve(promise)
          .then(res => {
            index++
            arr[i] = res
            if (index === len) {
              resolve(arr)
            }
          }, reason => reject(reason))
      })
    })
  }
  static race(promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i])
          .then(val => resolve(val), reason => reject(reason))
      }
    })
  }
}

let promiseCount = 1;
//完整的实现 测试Demo
class Promise {
  callbacks = [];
  name = '';
  state = 'pending'; //增加状态
  value = null; //保存结果
  constructor(fn) {
    this.name = `Promse-${promiseCount++}`;
    console.log('[%s]:constructor', this.name);
    fn(this._resolve.bind(this));
  }
  then(onFulfilled) {
    console.log('[%s]:then', this.name);
    return new Promise(resolve => {
      this._handle({
        onFulfilled: onFulfilled || null,
        resolve: resolve
      });
    });
  }
  _handle(callback) {
    console.log('[%s]:_handle', this.name, 'state=', this.state);

    if (this.state === 'pending') {
      this.callbacks.push(callback);
      console.log('[%s]:_handle', this.name, 'callbacks=', this.callbacks);
      return;
    }
    //如果then中没有传递任何东西
    if (!callback.onFulfilled) {
      callback.resolve(this.value);
      return;
    }
    var ret = callback.onFulfilled(this.value);
    callback.resolve(ret);
  }
  _resolve(value) {
    console.log('[%s]:_resolve', this.name);
    console.log('[%s]:_resolve', this.name, 'value=', value);

    if (value && (typeof value === 'object' || typeof value === 'function')) {
      var then = value.then;
      if (typeof then === 'function') {
        then.call(value, this._resolve.bind(this));
        return;
      }
    }

    this.state = 'fulfilled'; //改变状态
    this.value = value; //保存结果
    this.callbacks.forEach(callback => this._handle(callback));
  }
}
/**
 * 模拟异步请求
 * @param {*} url 
 * @param {*} s 
 * @param {*} callback 
 */
const mockAjax = (url, s, callback) => {
  setTimeout(() => {
    callback(url + '异步请求耗时' + s + '秒');
  }, 1000 * s)
}
const pUserId = new Promise(resolve => { // p1
  mockAjax('getUserId', 1, function (result) {
    resolve(result);
  })
})
const pUserName = new Promise(resolve => { // p2
  mockAjax('getUserName', 2, function (result) {
    resolve(result);
  })
})
pUserId.then(id => {
  console.log(id)
  return pUserName
}).then(name => {
  console.log(name)
})
// p1 构造函数初始化
// p2 构造函数初始化
// ------- 第一个then ---------
// p1 then
// p3 构造函数初始化
// p1 _handle 注册
// ------- 第二个then ---------
// p3 then
// p4 构造函数初始化
// p3 _handle
// ------- 同步执行完毕 ----------
// 1秒后 p1 _resolve 更改状态 
// p1 _handle 执行下个 onFulfilled
// 打印 id
// p3 _resolve   p2 是thenable对象
// p2 then
// p5 构造函数初始化
// 2秒后 p2 _resolve 更改状态
// p2 _handle 执行下个 onFulfilled
// 打印 name

// p4 _resolve
// p5 _resolve











/** 前缀和 */
// 1. 子矩阵之和
function getSubSum(board, x1, y1, x2, y2) {
  const row = board.length + 1
  const col = board[0].length + 1
  const preSumBoard = Array.from({
    length: row
  }).map(() => new Array(col).fill(0))

  for (let i = 1; i <= row; i++) {
    for (let j = 1; j <= col; j++) {
      preSumBoard[i][j] = preSumBoard[i][j - 1] + preSumBoard[i - 1][j] - preSumBoard[i - 1][j - 1] + board[i - 1][j - 1]
    }
  }
  return preSumBoard[x2 + 1][y2 + 1] - preSumBoard[x2 + 1][y1] - preSumBoard[x1][y2 + 1] + preSumBoard[x1][y1]
}
// 2. 和为k的子数组
function subArrSum(arr, k) {
  const preSum = [0]
  let res = 0
  for (let i = 0; i < arr.length; i++) {
    preSum[i + 1] = preSum[i] + arr[i]
  }

  for (let i = 1; i <= arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (preSum[i] - preSum[j] == k) {
        res++
      }
    }
  }
  return res
}
// 优化：记录有几个 preSum[i] - k 和 preSum[j] 相等
function subArrSum(arr, k) {
  // 自身等于 k
  const map = {
    0: 1
  }
  let sum0_i = 0
  let res = 0
  for (let i = 0; i < arr.length; i++) {
    sum0_i += arr[i]
    let sum0_j = sum0_i - k
    if (map[sum0_j]) {
      res += map[sum0_j]
    }
    map[sum0_i] = (map[sum0_i] || 0) + 1
  }
  return res
}

/** 差分数组 */
class Difference {
  diff = []
  constructor(arr) {
    if (arr.length > 0) {
      this.diff = Array.from({
        length: arr.length
      })
      this.diff[0] = arr[0]
      for (let i = 1; i < arr.length; i++) {
        this.diff[i] = arr[i] - arr[i - 1]
      }
    }
  }

  increment(i, j, val) {
    this.diff[i] += val
    if (j < this.diff.length - 1) {
      this.diff[j + 1] -= val
    }
  }

  result() {
    let res = [this.diff[0]]
    for (let i = 1; i < this.diff.length; i++) {
      res[i] = res[i - 1] + this.diff[i]
    }
    return res
  }
}

/** 滑动窗口 */
// 1. 查找t的排列是否是s的子串
function checkInclusion(t, s) {
  let need = {}
  let window = {}
  let valid = 0
  let left = 0
  let right = 0

  for (let c of t) {
    need[c] = need[c] ? need[c] + 1 : 1
  }

  while (right < s.length) {
    const c = s[right]
    right++

    if (need[c]) {
      window[c] = window[c] ? window[c] + 1 : 1
      if (need[c] === window[c]) valid++
    }

    while (right - left >= t.length) {
      if (valid === Object.values(need).filter(item => item > 0).length) {
        return true
      }
      const d = s[left]
      left++

      if (need[d]) {
        if (window[d] === need[d]) valid--
        window[d]--
      }
    }
  }

  return false
}
// 2. 找所有异位词的索引起始位置
function findAnagrams(s, p) {
  let need = {}
  let window = {}
  let valid = 0
  let left = 0
  let right = 0

  let res = []

  for (let c of p) {
    need[c] = need[c] ? need[c] + 1 : 1
  }

  while (right < s.length) {
    const c = s[right]
    right++

    if (need[c]) {
      window[c] = window[c] ? window[c] + 1 : 1
      if (window[c] === need[c]) valid++
    }

    while (p.length <= right - left) {
      // 满足条件 记录索引位置
      if (valid === Object.values(need).filter(item => item > 0).length) {
        res.push(left)
      }
      const d = s[left]
      left++

      if (need[d]) {
        if (window[d] === need[d]) valid--
        window[d]--
      }
    }
  }
  return res
}
// 3. 最长无重复子串
function lengthOfLongestSubstring(s) {
  let window = {}
  let left = 0
  let right = 0

  let res = 0

  while (right < s.length) {
    const c = s[right]
    right++

    window[c] = window[c] ? window[c] + 1 : 1

    while (window[c] > 1) {
      const d = s[left]
      left++

      window[d]--
    }
    res = Math.max(res, right - left)
  }
  return res
}

/** 二分查找 */
function binarySearch(nums, target) {
  let left = 0
  let right = nums.length - 1

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2)
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] < target) {
      left = mid + 1
    } else if (nums[mid] > target) {
      right = mid - 1
    }
  }
  return -1
}
// 最左侧的目标索引
function left_bound_binary_search(nums, target) {
  let left = 0
  let right = nums.length - 1

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2)
    if (nums[mid] < target) {
      left = mid + 1
    } else if (nums[mid] > target) {
      right = mid - 1
    } else if (nums[mid] == target) {
      right = mid - 1
    }
  }
  if (left >= nums.length || nums[left] != target) return -1
  return left
}

/** 原地数组 */
// 1. 去除有序的重复项
function removeDuplicates(nums) {
  let slow = 0
  let fast = 0

  while (fast < nums.length) {
    if (nums[slow] != nums[fast]) {
      slow++
      nums[slow] = nums[fast]
    }
    fast++
  }
  nums.length = slow + 1
  return nums
}
// 2. 移动所有0到末尾
function moveZeros(nums) {
  let slow = 0
  let fast = 0

  while (fast < nums.length) {
    if (nums[fast] != 0) {
      nums[slow] = nums[fast]
      slow++
    }
    fast++
  }
  for (; slow < nums.length; slow++) {
    nums[slow] = 0
  }
}

/** 链表 */
function ListNode(val) {
  this.val = val
  this.next = null
}
// 1. 合并有序链表
function mergeTwoLists(l1, l2) {
  let head = new ListNode()
  let cur = head

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      cur.next = l1
      l1 = l1.next
    } else {
      cur.next = l2
      l2 = l2.next
    }
    cur = cur.next
  }
  cur.next = l1 !== null ? l1 : l2
  return head.next
}
// 2. 倒数K个节点
function findFromEnd(head, k) {
  let slow = head
  let fast = head
  while (k--) {
    fast = fast.next
  }
  while (fast) {
    slow = slow.next
    fast = fast.next
  }
  return slow
}
// 3. 删除倒数第K个节点
function removeNthFromEnd(head, k) {
  let dummy = new ListNode()
  dummy.next = head
  let slow = dummy
  let fast = dummy

  while (k--) {
    fast = fast.next
  }
  while (fast.next) {
    slow = slow.next
    fast = fast.next
  }
  // slow 即倒数第K+1个节点
  slow.next = slow.next ? slow.next.next : null
  return dummy.next
}

// 4. 反转链表
function reverse(head) {
  if (head === null || head.next === null) return head
  let last = reverse(head.next)
  head.next.next = head
  head.next = null
  return last
}
// 5. 反转前n个链表
let successor = null

function reverseN(head, n) {
  if (head === null || head.next === null) return head
  if (n === 1) {
    successor = head.next
    return head
  }

  let nthNode = reverseN(head.next, n - 1)
  head.next.next = head
  head.next = successor
  return nthNode
}
// 6. 反转部分链表
function reverseBetween(head, m, n) {
  if (m === 1) return reverseN(head, n)
  head.next = reverseBetween(head.next, m - 1, n - 1)
  return head
}

/** 递减栈 */
// 1. 下一个更大值的索引
function nextGreaterElement(nums) {
  let res = []
  let s = []
  for (let i = nums.length - 1; i >= 0; i--) {
    // 形成递减栈
    while (s.length > 0 && s[s.length - 1] <= nums[i]) {
      s.pop()
    }
    res[i] = s.length > 0 ? s[s.length - 1] : -1
    s.push(nums[i])
  }
  return res
}

// 2. 下一个更暖和的天
function dailyTemperatures(nums) {
  let res = []
  let s = []
  for (let i = nums.length - 1; i >= 0; i--) {
    // 形成递减栈
    while (s.length > 0 && nums[s[s.length - 1]] <= nums[i]) {
      s.pop()
    }
    res[i] = s.length > 0 ? s[s.length - 1] - i : 0
    s.push(i)
  }
  return res
}

// 滑动窗口最大值
function maxSlidingWindow(nums, k) {
  let res = []
  // 递减栈
  let queue = new DecreaseQueue()
  for (let i = 0; i < nums.length; i++) {
    if (i < k - 1) {
      queue.push(nums[i])
    } else {
      queue.push(nums[i])
      res.push(queue.max())
      queue.pop(nums[i - k + 1])
    }
  }
  return res
}
class DecreaseQueue {
  arr = []
  push(v) {
    while (this.arr.length > 0 && this.arr[this.arr.length - 1] < v) {
      this.arr.pop()
    }
    this.arr.push(v)
  }
  pop(v) {
    if (this.arr[0] === v) {
      this.arr.shift()
    }
  }
  max() {
    return this.arr[0]
  }
}

/** 递归 */
// 1. 反转二叉树
function reverseTree(node) {
  if (!node) return null

  const left = reverseTree(node.left)
  const right = reverseTree(node.right)
  node.left = right
  node.right = left

  return node
}

// 2. 填充完美树右侧节点
function connect(node) {
  if (!node) return null
  connectTwoNode(node.left, node.right)
  return node
}

function connectTwoNode(left, right) {
  if (!left || !right) return

  left.next = right
  connectTwoNode(left.left, left.right)
  connectTwoNode(left.right, right.left)
  connectTwoNode(right.left, right.right)
}
// 3. 将二叉树转为链表 
function flatten(root) {
  if (!root) return null

  flatten(root.left)
  flatten(root.right)

  const left = root.left
  const right = root.right
  root.left = null
  root.right = left
  let curr = root
  while (curr.right != null) {
    curr = curr.right
  }
  curr.right = right

  return root
}
// 4. 最大二叉树
function constructMaximumBinaryTree(nums) {
  return helper(nums, 0, nums.length - 1)
}

function helper(nums, lo, hi) {
  if (lo > hi) return null
  if (lo == hi) return new TreeNode(nums[lo])
  let max = -1
  let maxIndex = -1
  let i = lo
  while (i <= hi) {
    if (nums[i] > max) {
      max = nums[i]
      maxIndex = i
    }
    i++
  }

  let root = new TreeNode(max)
  root.left = helper(nums, lo, maxIndex - 1)
  root.right = helper(nums, maxIndex + 1, hi)

  return root
}
// 5. 前、中遍历构造二叉树
function buildTree(preorder, inorder) {
  if (preorder.length === 0) return null
  if (preorder.length === 1) return new TreeNode(preorder[0])
  const root = new TreeNode(preorder[0])
  const rootIdx = inorder.indexOf(preorder[0])

  root.left = buildTree(preorder.slice(0, rootIdx), inorder.slice(0, rootIdx))
  root.right = buildTree(preorder.slice(1, rootIdx + 1), inorder.slice(rootIdx + 1))

  return root
}
// 5. 中、后遍历构造二叉树
function buildTree(inorder, postorder) {
  const len = postorder.length
  if (len === 0) return null
  if (len === 1) return new TreeNode(postorder[0])
  const root = new TreeNode(postorder[len-1])
  const rootIdx = inorder.indexOf(postorder[len-1])

  root.left = buildTree(inorder.slice(0, rootIdx), postorder.slice(0, rootIdx))
  root.right = buildTree(inorder.slice(rootIdx + 1), postorder.slice(rootIdx, -1))

  return root  
}
// 6. 寻找重复子树
let memo = {}
let res = []
function findDuplicateSubtrees(root) {
  dfs(root)
  return res
}
function dfs(root) {
  if (!root) return '#'

  const left = dfs(root.left)
  const right = dfs(root.right)

  let str = left.value + ',' + right.value + ',' + root.value 
  let count = memo[str] ? memo[str] : 0
  if (count === 1) {
    res.push(root)
  }
  memo[str] = count + 1

  return str
}
// 7. 最大之和的二叉搜索子树
// 左右子树是否是BST
// 左子树的最大值和右子树的最小值
// 左右子树节点之和
let maxSum = 0
function maxSumBST(root) {
  traverse(root)
  return maxSum
}
function traverse(root) {
  if (!root) return [
    1,
    Number.MAX_VALUE,
    -Number.MAX_VALUE,
    0
  ]

  const left = traverse(root.left)
  const right = traverse(root.right)

  let res = []
  if (left[0] === 1 && right === 1 && left[2] < root.val && right[1] > root.val) {
    res[0] = 1
    res[1] = Math.max(root.val, left[1])
    res[2] = Math.min(root.val, right[2])
    res[3] = left[3] + right[3] + root.val
    maxSum = Math.max(res[3], maxSum)
  } else {
    res[0] = 0
  }
  return res
}

/** 二叉搜索树 */
// 1. 寻找第k小的元素
function kthSmallest(root, k) {
  let res = [0, 0]
  traverse(root, k, res)
  return res[0]
}
function traverse(root, k, res) {
  if (!root) return 

  traverse(root.left, k, res)

  res[1]++
  if (res[1] === k) {
    res[0] = root.val
    return 
  }

  traverse(root.right, k, res)
}

// 2. BST转换为累加树
function convertBST(root) {
  let sum = 0
  function traverse(root) {
    if (!root) return 

    traverse(root.right)

    sum += root.val
    root.val = sum

    traverse(root.left)
  }
  traverse(root)
  return root
}
// 3. 删除BST的某个节点
function deleteNode(root, key) {
  if (!root) return null

  if (root.val === key) {
    // 仅右子树
    if (!root.left) return root.right
    // 仅左子树
    if (!root.right) return root.left 

    // 左右子节点都有
    const minRight = findMin(root.right)
    root.val = minRight.val
    root.right = deleteNode(root.right, minRight.val)

  } else if (root.val < key) {
    root.right = deleteNode(root.right, key)
  } else {
    root.left = deleteNode(root.left, key)
  }
  return root
}
function findMin(root) {
  while(root.left) {
    root = root.left
  }
  return root
}
// 4. 不同的二叉搜索树
function numTrees(n) {
  return count(1, n)
}
function count(lo, hi) {
  if (lo > hi) return 1

  let res = 0
  for (let i = lo; i <= hi; i++) {
    let left = count(lo, i-1)
    let right = count(i+1, hi)
    res += left * right
  }
  return res
}