function getTargetIndex(nums, target) {
  const map = {}
  const len = nums.length
  for (let i = 0; i < len; i++) {
    // 找到
    if (map[target - nums[i]] !== undefined) {
      return [map[target - nums[i]], i]
    }
    // 没找到 则缓存起来
    map[nums[i]] = i
  }
}

function mergeArr(arr1, arr2) {
  let len1 = arr1.length
  let len2 = arr2.length
  let i = len1 - 1
  let j = len2 - 1
  let curr = len1 + len2 - 1

  while (i >= 0 && j >= 0) {
    if (arr1[i] > arr2[j]) {
      arr1[curr--] = arr1[i--]
    } else {
      arr1[curr--] = arr2[j--]
    }
  }

  while (j >= 0) {
    arr1[curr--] = arr2[j--]
  }
  return arr1
}

function threeSum(nums) {
  let res = []
  nums.sort((a, b) => a - b)
  for (let i = 0; i < nums.length; i++) {
    let j = i + 1
    let k = nums.length - 1
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue
    }
    while (j < k) {
      let sum = nums[i] + nums[j] + nums[k]
      if (sum > 0) {
        k--
        while (j < k && nums[k] === nums[k + 1]) {
          k--
        }
      } else if (sum < 0) {
        j++
        while (j < k && nums[j] === nums[j - 1]) {
          j++
        }
      } else {
        res.push([nums[i], nums[j], nums[k]])
        j++
        k--

        while (j < k && nums[j] === nums[j - 1]) {
          j++
        }
        while (j < k && nums[k] === nums[k + 1]) {
          k--
        }
      }
    }
  }
  return res
}

function validPalindrome(str) {
  let len = str.length
  let i = 0
  let j = len - 1
  while (i < j && str[i] === str[j]) {
    i++
    j--
  }
  if (isPalindrome(i + 1, j)) {
    return true
  }
  // 尝试判断跳过右指针元素后字符串是否回文
  if (isPalindrome(i, j - 1)) {
    return true
  }

  // 工具方法，用于判断字符串是否回文
  function isPalindrome(st, ed) {
    while (st < ed) {
      if (str[st] !== s[ed]) {
        return false
      }
      st++
      ed--
    }
    return true
  }
  return false
}

// 合并链表
function mergeLink(l1, l2) {
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

  cur.next = l1 !== null ? li : l2
  return head.next
}

// 删除重复元素的链表节点
function deleteDuplicates(head) {
  let cur = head
  while (cur != null && cur.next != null) {
    if (cur.val === cur.next.val) {
      cur.next = cur.next.next
    } else {
      cur = cur.next
    }
  }
  return head
}

// 删除所有相同链表节点
// 1 -> 2                  1 -> 2
// 1 -> 1 -> 2             2
// 1 -> 1                  null
function deleteDuplicates(head) {
  if (!head || !head.next) return head

  let dummy = new ListNode()
  dummy.next = head
  let cur = dummy

  while (cur.next && cur.next.next) {
    if (cur.next.val === cur.next.next.val) {
      let val = cur.next.val
      while (cur.next && cur.next.val === val) {
        cur.next = cur.next.next
      }
    } else {
      cur = cur.next
    }
  }
  return dummy.next
}

function removeNthFromEnd(head, n) {
  let dummy = new ListNode()
  dummy.next = head
  let slow = dummy
  let fast = dummy

  while (n !== 0) {
    fast = fast.next
    n--
  }

  while (fast.next) {
    fast = fast.next
    slow = slow.next
  }
  slow.next = slow.next ? slow.next.next : null

  return dummy.next
}

// 1 -> 2 -> 3
// 3 -> 2 -> 1
function reverseList(head) {
  let pre = null
  let cur = head
  while (cur) {
    let next = cur.next
    cur.next = pre

    pre = cur
    cur = next
  }
  return pre
}

function reverseBetween(head, m, n) {
  let pre, cur, leftHead
  let dummy = new ListNode()
  dummy.next = head
  let p = dummy
  for (let i = 0; i < m - 1; i++) {
    p = p.next
  }
  leftHead = p
  let start = leftHead.next
  pre = start
  cur = pre.next
  for (let i = m; i < n; i++) {
    let next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  leftHead.next = pre
  start.next = cur

  return dummy.next
}

let map = {
  '[': ']',
  '(': ')',
  '{': '}'
}

function isValid(s) {
  if (!s) return true
  let stack = []
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '[' || s[i] === '(' || s[i] === '{') {
      stack.push(s[i])
    } else {
      if (stack.length === 0 || map[stack.pop()] !== s[i]) {
        return false
      }
    }
  }
  return s.length === 0
}

// 找到大的值，对比之前的递减栈，直至栈顶的值比当前值大，获得相应的结果值
function dailyTemperatures(t) {
  const len = t.length
  const stack = []
  const res = Array(len).fill(0)

  for (let i = 0; i < len; i++) {
    while (stack.length && t[i] > t[stack[stack.length - 1]]) {
      let top = stack.pop()
      res[top] = i - top
    }
    stack.push(i)
  }

  return res
}

function maxSlidingWindow(nums, k) {
  const len = nums.length
  let res = []
  let stack = []

  for (let i = 0; i < len; i++) {
    // 递减栈
    while (stack.length && stack[stack.length - 1] < nums[i]) {
      stack.pop()
    }
    stack.push(i)

    // 越界删除
    if (stack.length && i - stack[0] >= k) {
      stack.shift()
    }

    if (i >= k - 1) {
      res.push(nums[stack[0]])
    }
  }

  return res
}

function allSort(nums) {
  let res = []
  let len = nums.length
  let arr = []
  let visited = {}

  function dfs(nth) {
    if (nth === len) {
      res.push(arr.slice())
      return
    }

    for (let i = 0; i < len; i++) {
      if (!visited[nums[i]]) {
        visited[nums[i]] = 1
        arr.push(nums[i])
        dfs(nth + 1)
        arr.pop()
        visited[nums[i]] = 0
      }
    }
  }
  dfs(0)

  return res
}

// 所有可能 不包含重复数字
function subsets(nums) {
  let res = []
  let arr = []
  let len = nums.length

  function dfs(index) {
    res.push(arr.slice())

    for (let i = index; i < len; i++) {
      arr.push(nums[i])
      dfs(i + 1)
      arr.pop()
    }
  }
  dfs(0)

  return res
}

// 1...n 中取k个数的组合 
function combine(n, k) {
  let res = []
  let curr = []

  function dfs(index) {
    if (curr.length === k) {
      res.push(curr.slice())
      return
    }

    for (let i = index; i <= n; i++) {
      curr.push(i)
      dfs(i + 1)
      curr.pop()
    }
  }
  dfs(1)

  return res
}

function inorder(root) {
  let res = []
  let stack = []
  let curr = root

  while (curr || stack.length) {
    while (curr) {
      stack.push(curr)
      curr = curr.left
    }

    curr = stack.pop()
    res.push(curr.val)
    curr = curr.right
  }

  return res
}

function traverseTree(node) {
  if (!node) return null
  node.left = traverseTree(node.right)
  node.right = traverseTree(node.left)
  return node
}

function minCoins(coins, amount) {
  let f = [0]

  for (let i = 1; i <= amount; i++) {
    f[i] = Infinity
    for (let j = 0; j < coins.length; j++) {
      if (i - coins[j] >= 0) {
        f[i] = Math.min(f[i - coins[j]] + 1, f[i])
      }
    }
  }

  if (f[amount] === Infinity) {
    return -1
  }
  return f[amount]
}

// n件物品 c总的包容量 w物品体积数组 value物品价值数组
// dp[i][c] = Math.max(dp[i-1][c], dp[i-1][c-w[i]] + value[i])
function knapsack(n, c, w, value) {
  let dp = Array(c + 1).fill(0)
  let res = -Infinity

  for (let i = 0; i <= n; i++) {
    for (let j = c; j >= w[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - w[i]] + value[i])
      if (dp[j] > res) {
        res = dp[j]
      }
    }
  }

  return res
}

function permute(nums) {
  let track = []
  let res = []

  function backtrack(nums, track) {
    if (track.length === nums.length) {
      res.push(track.slice())
      return
    }

    for (let i = 0; i < nums.length; i++) {
      if (track.indexOf(nums[i]) === -1) {
        track.push(nums[i])
        backtrack(nums, track)
        track.pop()
      }
    }
  }
  backtrack(nums, track)

  return res
}

// 八皇后问题
function nQueens(n) {
  const board = Array.from({
    length: n
  }).map(() => Array(n).fill(''))
  const res = []

  function backtrack(board, row) {
    if (row === n) {
      res.push(
        JSON.parse(JSON.stringify(board))
      )
      return
    }

    for (let j = 0; j < n; j++) {
      if (isValid(board, row, j)) {
        board[row][j] = 'Q'
        backtrack(board, row + 1)
        board[row][j] = ''
      }
    }
  }

  function isValid(board, row, col) {
    // 上方有无重复
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') {
        return false
      }
    }
    // 左上方
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') {
        return false
      }
    }
    // 右上方
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') {
        return false
      }
    }
    return true
  }

  backtrack(board, 0)
  return res
}
nQueens(8)


function getMiddle(nums, target) {
  let left = 0,
    right = nums.length - 1

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2)
    if (nums[mid] > target) {
      right = mid - 1
    } else if (nums[mid] < target) {
      left = mid + 1
    } else if (nums[mid] === target) {
      left = mid + 1
    }
  }
  if (right < 0 || nums[right] !== target) return -1
  return right
}

// 筛选 优化 直至走完
function getStr(s, t) {
  let left = 0
  let right = 0
  let valid = 0
  let need = {}
  let window = {}

  let start = 0
  let len = Number.MAX_VALUE

  for (let c of t) {
    need[c] = need[c] ? need[c] + 1 : 1
  }

  while (right < s.length) {
    let c = s[right]
    right++

    if (need[c]) {
      window[c] = window[c] ? window[c] + 1 : 1
      if (window[c] === need[c])
        valid++
    }

    while (getSize(need) <= valid) {
      if (right - left < len) {
        start = left
        len = right - left
      }

      let d = s[left]
      left++

      if (need[d]) {
        if (window[d] === need[d])
          valid--
        window[d]--
      }
    }
  }

  return len === Number.MAX_VALUE ? '' : s.substring(start, start + len)
}

function getSize(obj) {
  return Object.values(obj).filter(item => item >= 1).length
}

// s包含t的全排列字串
function includeAllSort(s, t) {
  let left = 0
  let right = 0
  let valid = 0
  let window = {}
  let need = {}

  for (let c of t) {
    need[c] = need[c] ? need[c] + 1 : 1
  }

  while (right < s.length) {
    const c = s[right]
    right++

    // 需要该数据,更新窗口
    if (need[c]) {
      window[c] = window[c] ? window[c] + 1 : 1
      if (need[c] === window[c])
        valid++
    }

    // 收缩
    while (right - left >= t.length) {
      if (valid === getSize(need)) {
        return true
      }

      const d = s[left]
      left++

      if (need[d]) {
        if (window[d] === need[d])
          valid--
        window[d]--
      }
    }
  }
  return false
}

function getIndexArr(s, t) {
  let left = 0
  let right = 0
  let valid = 0
  let window = {}
  let need = {}
  let res = []

  for (let c of t) {
    need[c] = need[c] ? need[c] + 1 : 1
  }

  while (right < s.length) {
    const c = s[right]
    right++

    // 更新什么数据
    if (need[c]) {
      window[c] = window[c] ? window[c] + 1 : 1
      if (window[c] === need[c])
        valid++
    }

    // 需要紧缩的条件
    while (right - left >= t.length) {
      // 更新结果输出
      if (valid === getSize(need)) {
        res.push(left)
      }
      // 更新什么数据
      const d = s[left]
      left++
      if (need[d]) {
        if (window[d] === need[d])
          valid--
        window[d]--
      }
    }
  }
  return res
}

// 最长无重复子串
function minWindow(s) {
  let left = 0
  let right = 0
  let window = {}
  let res = 0

  while (right < s.length) {
    const c = s[right]
    right++

    // 更新窗口数据
    window[c] = window[c] ? window[c] + 1 : 1

    // 缩小窗口条件
    while (window[c] > 1) {
      const d = s[left]
      left++

      // 更新窗口数据
      window[d]--
    }
    res = Math.max(res, right - left)
  }
  return res
}

function subMaxArray(nums) {
  if (nums.length === 0) return 0
  let dp_0 = nums[0]
  let dp_1 = 0
  let res = dp_0

  for (let i = 1; i < nums.length; i++) {
    dp_1 = Math.max(dp_0 + nums[i], nums[i])
    dp_0 = dp_1
    res = Math.max(res, dp_1)
  }
  return res
}

// 最短编辑距离
function minDistance(s1, s2) {
  function dp(i, j) {
    if (i === -1) return j + 1
    if (j === -1) return i + 1

    if (s1[i] === s2[j]) {
      return dp(i - 1, j - 1)
    } else {
      return Math.min(
        dp(i - 1, j - 1), // 修改
        dp(i - 1, j), // 删除
        dp(i, j - 1) // 新增
      ) + 1
    }
  }
  return dp(s1.length - 1, s2.length - 1)
}

function maxL(str) {
  let len = str.length
  let dp = Array.from({
    length: len
  }).map(item => Array(len).fill(0))

  for (let i = 0; i < len; i++) {
    dp[i][i] = 1
  }

  for (let i = len - 2; i >= 0; i--) {
    for (let j = i + 1; j < len; j++) {
      if (str[i] === str[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i + 1][j])
      }
    }
  }

  return dp[0][len - 1]
}

function maxL(str) {
  let len = str.length
  let dp = Array.from({
    length: len
  }).fill(1)

  for (let i = len - 2; i >= 0; i--) {
    let pre = 0
    for (let j = i + 1; j < len; j++) {
      let tmp = dp[j]
      if (str[i] === str[j]) {
        dp[j] = pre + 2
      } else {
        dp[j] = Math.max(dp[j - 1], dp[j])
      }
      pre = tmp
    }
  }

  return dp[len - 1]
}
// 最小插入回文
function minInsertions(s) {
  let len = s.length
  let dp = Array.from({
    length: len
  }).fill(0)

  for (let i = len - 2; i >= 0; i--) {
    let pre = 0
    for (let j = i + 1; j < len; j++) {
      let temp = dp[j]
      if (s[i] === s[j]) {
        dp[j] = pre
      } else {
        dp[j] = Math.min(dp[j], dp[j - 1]) + 1
      }
      pre = temp
    }
  }

  return dp[len - 1]
}

/**
 * 
 * @param {个数} count 
 * @param {单个的值} n 
 */
function main(count, n) {
  let sum = 0
  for (let i = 1; i <= count; i++) {
    sum += n * i * Math.pow(10, count - i)
  }
  return sum
}

// 状态1: n为操作次数
// 状态2：c为缓冲区数量
// 状态3：m为当前a的数量
// dp(n-1, m+1, c)
// dp(n-2, m, m)
// dp(n-1, m+c, c)
function maxA(n) {
  let memo = {}

  function dfs(n, m, c) {
    if (n <= 0) return m
    let key = `${n},${m},${c}`
    if (memo[key]) return memo[key]
    memo[key] = Math.max(
      dfs(n - 1, m + 1, c),
      dfs(n - 1, m + c, c),
      dfs(n - 2, m, m)
    )
    return memo[key]
  }

  return dfs(n, 0, 0)
}

function maxA(n) {
  let dp = [0]

  for (let i = 1; i <= n; i++) {
    dp[i] = dp[i - 1] + 1
    // 穷举所有增大缓冲区的可能
    for (let j = 2; j < i; j++) {
      dp[i] = Math.max(dp[i], dp[j - 2] * (i - j + 1))
    }
  }

  return dp[n]
}

// k个鸡蛋 n层楼
// 状态1：鸡蛋数量
// 状态2：楼层数量
function eggs(k, n) {
  let memo = {}

  function dp(k, n) {
    if (k === 1) return n
    if (n === 0) return 0
    let key = `${k},${n}`
    if (memo[key]) {
      return memo[key]
    }

    let res = Number.MAX_VALUE
    for (let i = 1; i <= n; i++) {
      res = Math.min(
        res,
        Math.max(
          dp(k - 1, i - 1),
          dp(k, n - i)
        ) + 1
      )
    }
    memo[key] = res
    return res
  }
  return dp(k, n)
}
// 即求两根线的交点
function eggs(k, n) {
  let memo = {}

  function dp(k, n) {
    if (k === 1) return n
    if (n === 0) return 0
    let key = `${k},${n}`
    if (memo[key]) {
      return memo[key]
    }

    let res = Number.MAX_VALUE
    // for (let i = 1; i <= n; i++) {
    //   res = Math.min(
    //     res,
    //     Math.max(
    //       dp(k-1, i-1),
    //       dp(k, n-i)
    //     ) + 1
    //   )
    // }
    let lo = 1
    let hi = n
    while (lo <= hi) {
      let mid = Math.floor((lo + hi) / 2)
      let broken = dp(k - 1, mid - 1)
      let not_broken = dp(k, n - mid)
      if (broken > not_broken) {
        hi = mid - 1
        res = Math.min(res, broken + 1)
      } else {
        lo = mid + 1
        res = Math.min(res, not_broken + 1)
      }
    }
    memo[key] = res
    return res
  }
  return dp(k, n)
}

// 气球数量
// 气球分数
function maxCoins(nums) {
  let res = 0

  function backtrack(nums, score) {
    if (nums.length === 1) {
      res = Math.max(res, score + nums[0])
      return
    }
    for (let i = 0; i < nums.length; i++) {
      let point = 0
      if (i === 0) {
        point = nums[i] * nums[i + 1]
      } else if (i === nums.length - 1) {
        point = nums[i] * nums[i - 1]
      } else {
        point = nums[i] * nums[i - 1] * nums[i + 1]
      }

      let tmp = nums[i]
      nums.splice(i, 1)
      backtrack(nums, score + point)
      nums.splice(i, 0, tmp)

    }
  }
  backtrack(nums, 0)
  return res
}

function maxCoins(nums) {
  let arr = nums.slice()
  arr.unshift(1)
  arr.push(1)

  let len = nums.length
  let dp = Array.from({
    length: len + 2
  }).map(() => Array(len + 2).fill(0))

  for (let i = len; i >= 0; i--) {
    for (let j = i + 1; j <= len + 1; j++) {
      for (let k = i + 1; k < j; k++) {
        dp[i][j] = Math.max(dp[i][j], dp[i][k] + dp[k][j] + arr[i] * arr[j] * arr[k])
      }
    }
  }
  return dp[0][len + 1]
}

// 背包问题
// n个物品, w的重量, wt的物品质量数组, val的物品价值数组
function backpack(n, w, wt, val) {
  let dp = Array.from({
    length: w + 1
  }).fill(0)
  let res = 0
  for (let i = 0; i <= n; i++) {
    for (let j = w; j >= wt[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - wt[i]] + val[i])
      if (dp[j] > res) {
        res = dp[j]
      }
    }
  }
  return res
}

function backpack(n, w, wt, val) {
  // n个物品 w重量
  let dp = Array.from({
    length: n + 1
  }).map(() => Array(w + 1).fill(0))
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= w; j++) {
      if (j - wt[i - 1] < 0) {
        dp[i][j] = dp[i - 1][j]
      } else {
        dp[i][j] = Math.max(dp[i - 1][j - wt[i - 1]] + val[i - 1], dp[i - 1][j])
      }
    }
  }
  return dp[n][w]
}

// 能否分两个子集 使之和一样
// 前i个物品 sum/2 是否能刚好装满
function canPartition(nums) {
  let len = nums.length
  let sum = 0
  for (let i = 0; i < len; i++) {
    sum += nums[i]
  }
  if (sum % 2 !== 0) return false
  sum = sum / 2
  let dp = Array.from({
    length: len + 1
  }).map(() => Array(sum + 1))
  for (let j = 1; j <= sum; j++) {
    dp[0][j] = false
  }
  for (let i = 0; i <= len; i++) {
    dp[i][0] = true
  }

  for (let i = 1; i <= len; i++) {
    for (let j = 1; j <= sum; j++) {
      if (j - nums[i - 1] < 0) {
        dp[i][j] = dp[i - 1][j]
      } else {
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]]
      }
    }
  }
  return dp[len][sum]
}

function canPartition(nums) {
  let len = nums.length
  let sum = 0
  for (let i = 0; i < len; i++) {
    sum += nums[i]
  }
  if (sum % 2 !== 0) return false
  sum = sum / 2
  let dp = Array(len + 1).fill(false)
  dp[0] = true

  // 前i件物品 是否能选出刚好相加为j的物品
  for (let i = 0; i < len; i++) {
    for (let j = sum; j >= 0; j--) {
      if (j - nums[i] >= 0) {
        dp[j] = dp[j] || dp[j - nums[i]]
      }
    }
  }
  return dp[sum]
}

// 有几种方法凑零钱，硬币数量无限 
function change(amount, coins) {
  let len = coins.length
  let dp = Array.from({
    length: amount + 1
  }).fill(0)
  dp[0] = 1
  for (let i = 0; i < len; i++) {
    for (let j = 1; j <= amount; j++) {
      if (j - coins[i] >= 0) {
        dp[j] = dp[j] + dp[j - coins[i]]
      }
    }
  }
  return dp[amount]
}


function rob(nums) {
  let dp_0 = 0
  let dp_1 = nums[0]

  for (let i = 1; i <= nums.length; i++) {
    let tmp = dp_1
    dp_1 = Math.max(dp_1, dp_0 + nums[i])
    dp_0 = tmp
  }
  return dp_1
}
// 环形
function rob(nums) {
  let len = nums.length
  if (len === 1) return nums[0]

  function rob_range(start, end) {
    let dp_0 = 0
    let dp_1 = nums[start]
    debugger
    for (let i = start + 1; i <= end; i++) {
      let tmp = dp_1
      dp_1 = Math.max(dp_1, dp_0 + nums[i])
      dp_0 = tmp
    }
    return dp_1
  }

  return Math.max(
    rob_range(0, len - 2),
    rob_range(1, len - 1)
  )
}

function greaterNums(nums) {
  let stack = []
  let res = []

  for (let i = nums.length - 1; i >= 0; i--) {
    while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
      stack.pop()
    }
    res[i] = stack.length === 0 ? 0 : stack[stack.length - 1] - i
    stack.push(i)
  }
  return res
}


function decreaseStack(nums) {
  let s = []
  let res = []
  let len = nums.length

  for (let i = 2 * len - 1; i >= 0; i--) {
    while (s.length && s[s.length - 1] <= nums[i % len]) {
      s.pop()
    }
    res[i % len] = s.length ? s[s.length - 1] : -1
    s.push(nums[i % len])
  }
  return res
}



function DecreaseQueue() {
  this.queue = []
}
DecreaseQueue.prototype.push = function (n) {
  let q = this.queue
  while (q.length && q[q.length - 1] < n) {
    q.pop()
  }
  q.push(n)
}
DecreaseQueue.prototype.pop = function (n) {
  if (n === this.queue[0]) {
    this.queue.shift()
  }
}
DecreaseQueue.prototype.max = function () {
  return this.queue[0]
}

function maxSlidingWindow(nums, k) {
  let window = new DecreaseQueue()
  let res = []

  for (let i = 0; i < nums.length; i++) {
    if (i < k - 1) {
      window.push(nums[i])
    } else {
      window.push(nums[i])
      res.push(window.max())
      window.pop(nums[i - k + 1])
    }
  }
  return res
}


function isValid(inNums, outNums) {
  let len = inNums.length
  let i = 0
  let j = 0
  let s = []
  let prev = -1

  while (i + j !== prev) {
    prev = i + j
    // 入栈元素和出栈元素相同
    if (i < len) {
      let num = inNums[i]
      s.push(num)
      i++
    }
    if (s.length > 0 && s[s.length - 1] === outNums[j]) {
      s.pop()
      j++
    }
  }
  return s.length ? false : true
}

function printScreen(n) {
  let mid = Math.floor(n / 2)
  let res = ''

  for (let i = 0; i <= mid; i++) {
    let str = ''
    for (let j = 0; j <= mid + i; j++) {
      if (j < mid - i) {
        str += ' '
      } else {
        str += '*'
      }
    }
    res += str + '\n'
  }
  for (let i = mid + 1; i < n; i++) {
    let str = ''
    for (let j = 0; j < mid + n - i; j++) {
      if (j < i - mid) {
        str += ' '
      } else {
        str += '*'
      }
    }
    res += str + '\n'
  }
  console.log(res)
}

function maxSubArr(nums) {
  let len = nums.length
  let dp_0 = nums[0]
  let res = 0

  for (let i = 1; i < len; i++) {
    dp_0 = Math.max(nums[i], dp_0 + nums[i])
    res = Math.max(res, dp_0)
  }
  return res
}

function traverse(str) {
  let dp_0 = 1
  let dp_1 = 1

  for (let i = 2; i <= str.length; i++) {
    if (+(str[i - 2] + str[i - 1]) < 26) {
      let tmp = dp_1
      dp_1 += dp_0
      dp_0 = tmp
    } else {
      dp_0 = dp_1
    }
  }
  return dp_1
}


// 1 2 3 5 
function ugilyNumber(n) {
  let nums = [1, 2, 3]
  let two = 2
  let three = 3
  let five = 5

  for (let i = 1; i < n; i++) {
    for (let j = 1; j <= i; j++) {
      if (nums[j - 1] * 2 <= nums[i] && nums[j] * 2 > nums[i]) {
        two = nums[j] * 2
      }
      if (nums[j - 1] * 3 <= nums[i] && nums[j] * 3 > nums[i]) {
        three = nums[j] * 3
      }
      if (nums[j - 1] * 5 <= nums[i] && nums[j] * 5 > nums[i]) {
        five = nums[j] * 5
      }
    }

    if (two <= three && two <= five) {
      nums[i + 1] = two
    } else if (three <= two && three <= five) {
      nums[i + 1] = three
    } else if (five <= two && five <= three) {
      nums[i + 1] = five
    }
  }
  return nums[n - 1]
}

// 递归
var reverseList = function (head) {
  if (head == null || head.next == null) return head
  let newHead = reverseList(head.next)
  head.next.next = head
  head.next = null
  return newHead
};
var reverseList = function (head) {
  let prev = null
  let curr = head
  while (curr) {
    let next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }
  return prev
};

var hasCycle = function (head) {
  if (head == null || head.next == null) return false
  let slow = head
  let fast = head
  while (fast.next && fast.next.next) {
    fast = fast.next.next
    slow = slow.next
    if (fast === slow) {
      return true
    }
  }
  return false
};


var mergeTwoLists = function (l1, l2) {
  let head = new ListNode()
  let curr = head
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      curr.next = l1
      l1 = l1.next
    } else {
      curr.next = l2
      l2 = l2.next
    }
    curr = curr.next
  }
  curr.next = l1 ? l1 : l2

  return head.next
}

function removeNthFromEnd(head, n) {
  let dummy = new ListNode()
  dummy.next = head
  let slow = dummy
  let fast = dummy

  while (n !== 0) {
    fast = fast.next
    n--
  }

  while (fast.next) {
    fast = fast.next
    slow = slow.next
  }
  slow.next = slow.next ? slow.next.next : null

  return dummy.next
}

// 1 -> 2 -> null
// 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
var middleNode = function (head) {
  if (head == null || head.next == null) return head
  let slow = head
  let fast = head

  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }
  return slow
};

// 快速排序
function quickSort(nums) {
  function help(lo, hi) {
    if (lo >= hi) return
    let mid = partition(nums, lo, hi)
    help(lo, mid - 1)
    help(mid + 1, hi)
  }
  help(0, nums.length - 1)
  return nums
}

function partition(nums, lo, hi) {
  let n = nums.length - 1
  let pivot = nums[n]
  let i = lo
  for (let j = lo; j < hi; j++) {
    if (nums[j] < pivot) {
      let tmp = nums[i]
      nums[i] = nums[j]
      nums[j] = tmp
      i++
    }
  }
  let tmp = nums[i]
  nums[i] = nums[hi]
  nums[hi] = tmp
  return i
}

// 查找第一个等于n的数
function bsearch(nums, n) {
  let lo = 0
  let hi = nums.length - 1
  while (lo <= hi) {
    let mid = Math.floor((hi - lo) / 2) + lo
    if (nums[mid] >= n) {
      hi = mid - 1
    } else {
      lo = mid + 1
    }
  }
  if (nums[lo] === n) return lo
  else return -1
}
// 查找最后一个等于n的数
function bsearch(nums, n) {
  let lo = 0
  let hi = nums.length - 1
  while (lo <= hi) {
    let mid = Math.floor((hi - lo) / 2) + lo
    if (nums[mid] <= n) {
      lo = mid + 1
    } else {
      hi = mid - 1
    }
  }
  if (nums[hi] === n) return hi
  else return -1
}
// 查找第一个大于等于n的数
function bsearch(nums, n) {
  let lo = 0
  let hi = nums.length - 1
  while (lo <= hi) {
    let mid = Math.floor((hi - lo) / 2) + lo
    if (nums[mid] >= n) {
      if (mid === 0 || nums[mid - 1] < n) return mid
      else hi = mid - 1
    } else {
      lo = mid + 1
    }
  }
  return -1
}
// 查找最后一个小于等于n的数
function bsearch(nums, n) {
  let lo = 0
  let hi = nums.length - 1
  while (lo <= hi) {
    let mid = Math.floor((hi - lo) / 2) + lo
    if (nums[mid] <= n) {
      if (mid === nums.length - 1 || nums[mid + 1] > n) return mid
      else lo = mid + 1
    } else {
      hi = mid - 1
    }
  }
  return -1
}

// 到(i,j)时的最小值
var minPathSum = function (grid) {
  let m = grid.length
  let n = grid[0].length
  for (let i = 1; i < m; i++) {
    grid[i][0] += grid[i - 1][0]
  }
  for (let j = 1; j < n; j++) {
    grid[0][j] += grid[0][j - 1]
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      grid[i][j] = Math.min(grid[i - 1][j], grid[i][j - 1]) + grid[i][j]
    }
  }
  return grid[m - 1][n - 1]
};

function numGenerator() {
  let num = 1
  num++
  return () => {
    console.log(num)
  }
}
var getNum = numGenerator()
getNum()


let failedList = []

function getDataById(id) {
  return new Promise((resolve, reject) => {
    getResponse(id, resolve, reject)
  }).catch(err => {
    failedList.push(getDataById(id))
  })
}

function getResponse(id, resolve, reject) {
  setTimeout(() => {
    if (Math.random() > 0.5) resolve({
      id,
      msg: 'ok'
    })
    else reject({
      id,
      msg: 'error'
    })
  }, 1000)
}
const requestList = [getDataById(1), getDataById(2), getDataById(3)]
let result = []
let i = 1

function handlePromiseDone(requestList) {
  Promise.all(requestList)
    .then(res => {
      result = result.concat(res.filter(item => item))
      console.log(`第${i++}次发送，总共发送${result.length + failedList.length}个，当前成功${result.length}个，失败${failedList.length}个`)
      if (failedList.length > 0) {
        let arr = failedList.slice(0)
        failedList.length = 0
        handlePromiseDone(arr)
      }
    })
}
handlePromiseDone(requestList)

function chunk(arr, size) {
  let len = arr.length
  let res = []
  let start = 0
  if (size === 0) return res

  for (let i = size; i < len + size; i += size) {
    res.push(arr.slice(start, i))
    start = i
  }
  return res
}

const sleep = time => new Promise((resolve, reject) => {
  setTimeout(resolve, time)
})
const slicePostTask = async (names, chunkSize, time) => {
  // todo
  let len = names.length
  let start = 0
  let end = chunkSize
  while (start < len) {
    console.time()
    console.log(names.slice(start, end))
    start = end
    end = end + chunkSize
    await sleep(time)
    console.timeEnd()
  }
  console.log('end')
}





function main(arr) {
  const map = {
    MAIN: 0,
    CUSTOM: 1,
    FIRST: 2,
    LIMIT: 3
  }
  return arr.sort((a, b) => {
    return map[a.key] - map[b.key]
  })
}
main([{
    order: 2,
    key: 'first'
  },
  {
    order: 1,
    key: 'custom'
  },
  {
    order: 0,
    key: 'main'
  },
  {
    order: 0,
    key: 'main'
  },
  {
    order: 3,
    key: 'limit'
  },
])

function groupBy(arr) {
  // 快指针
  let slow = 0
  let fast = 1
  let res = []
  const len = arr.length
  while (slow < len) {
    while (fast < len && arr[fast] === arr[i]) {
      fast++
    }
    arr[slow].children = arr.slice(i + 1, fast)
    res.push(arr[slow])
    slow = fast
    fast++
  }
  return res
}



function main() {
  let slow = 20
  while (slow < 500) {
    fast = slow + 1

    while (arr[slow] === arr[fast]) {
      // slow即ANE
      // 如果fast指向的大于slow指向的值 标红slow区域
      fast++
    }
    slow = fast
  }
}

// n对括号的所有方式
let res = []
function dfs(left, right, n, s) {
  if (left === n && right === n) {
    res.push(s)
    return
  }
  if (left < n) {
    dfs(left + 1, right, n, s + '(')
  }
  if (right < left) {
    dfs(left, right + 1, n, s + ')')
  }
}
dfs(0, 0, n, '')


