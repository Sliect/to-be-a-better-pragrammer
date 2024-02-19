function ListNode(val) {
  this.val = val
  this.next = null
}

// 合并链表
// 示例： 输入：1->2->4, 1->3->4 输出：1->1->2->3->4->4
function mergetTwoLists(list1, list2) {
  // 起始标记
  let head = new ListNode()
  // 串联的线
  let cur = head

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      cur.next = list1
      list1 = list1.next
    } else {
      cur.next = list2
      list2 = list2.next
    }
    cur = cur.next
  }
  // 合并剩余的链表
  cur.next = list1 === null ? list2 : list1
  return head.next
}

// 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次
function deleteDuplicates(head) {
  let cur = head
  while (cur.val !== null && cur.next !== null) {
    // 直到找到不重复的下一个节点
    if (cur.val === cur.next.val) {
      cur.next = cur.next.next
    } else {
      cur = cur.next
    }
  }
  return head
}

// 给定一个排序链表，删除所有含有重复数字的结点，只保留原始链表中 没有重复出现的数字
// 思路：dummy节点, 跳过相同的两个或更多
function deleteAllDuplicates(head) {
  if (!head || !head.next) {
    return head
  }
  let dummy = new ListNode()
  dummy.next = head
  let cur = dummy
  while (cur.next && cur.next.next) {
    if (cur.next.val === cur.next.next.val) {
      let val = cur.next.val
      while(cur.next && cur.next.val === val) {
        cur.next = cur.next.next
      }
    } else {
      cur = cur.next
    }
  }
  return dummy.next
}

// 给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点
// 示例： 给定一个链表: 1->2->3->4->5, 和 n = 2.
// 当删除了倒数第二个结点后，链表变为 1->2->3->5.
// 找到对应节点的前驱节点和后驱节点
// 快慢指针
removeNthFromEnd(dummy.next, 2)
function removeNthFromEnd(head, n) {
  let dummy = new ListNode()
  dummy.next = head
  let fast = dummy
  let slow = dummy

  while(n !== 0) {
    fast = fast.next
    n--
  }

  while(fast.next) {
    fast = fast.next
    slow = slow.next
  }
  slow.next = slow.next.next
  return dummy.next
}

// 定义一个函数，输入一个链表的头结点，反转该链表并输出反转后链表的头结点
// 输入: 1->2->3->4->5->NULL
// 输出: 5->4->3->2->1->NULL
function reverseList(head) {
  let pre = null
  let cur = head

  while(cur !== null) {
    let next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  return pre
}

// 反转从位置 m 到 n 的链表。请使用一趟扫描完成反转
// 输入: 1->2->3->4->5->NULL, m = 2, n = 4
// 输出: 1->4->3->2->5->NULL
// 找到边界 缓存所有需要的节点 翻转中间部分 处理边界节点
function reverseBetween(head, m, n) {
  let dummy = new ListNode()
  dummy.next = head
  let leftHead, pre, cur
  let p = dummy
  for (let i=0; i < m-1; i++) {
    p = p.next
  }
  // 左边界的前驱节点
  leftHead = p
  let start = leftHead.next
  pre = start
  cur = pre.next

  for (let i=m; i < n; i++) {
    let next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  leftHead.next = pre
  start.next = cur

  return dummy.next
}

// 判断是否环形列表
function hasCircle(head) {
  while(head) {
    if (head.flag) {
      return true
    } else {
      head.flag = true
      head = head.next
    }
  }
  return false
}

// 分析
// 5 aeiou
// 5 + [1,5] = 15   a+2e+3i+4o+5u
// 12345 5+4*2+3*3+4*2+5*1=35    a+3e+6i+10o+15u   
//     a+4e+10i+20o+35u
// a+ne+(dp[n-1][i]+n)i+(dp[n-1][i]+n+dp[n-1][o])o+(dp[n-1][i]+n+dp[n-1][o]+dp[n-1][u])u
// 状态为n, aeiou的个数
var countVowelStrings = function(n) {
  let dp = []
  for (let i=0; i < 5; i++) {
    dp[i] = 1
  }
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < 5; j++) {
      dp[j] = dp[j] + dp[j-1]
    }
  }
  let res = 0
  for (let j=0; j < 5; j++) {
    res += dp[j]
  }
  return res
};

// 4 = 2*2
// 5 = 2*3
// 6 = 3*3
// 7 = 3*4
// 8 = 3*3*2
var cuttingRope = function(n) {
  if (n === 2) return 1
  if (n === 3) return 2

  let res = 1
  while(n >= 3) {
    if (n === 4) break
    n -= 3
    res *= 3
  }
  if (n > 0) res = res * n
  return res
};

// [0, 1000)
var countNumbersWithUniqueDigits = function(n) {
  if (n === 1) return 10
  let res = 9
  let sum = 10
  let size = Math.min(10, n)
  for (let i = 1; i < size; i++) {
    res *= (10 - i)
    sum += res
  }
  return res
};

// 利润
// 不买 买 卖
// dp[i][j]
var maxProfit = function(prices, fee) {
  let len = prices.length
  let dp = Array.from({ length: len }).map(() => Array(2).fill(0))
  dp[0][0] = 0
  dp[0][1] = -prices[0]

  for (let i = 1; i < len; i++) {
    dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i] - fee)
    dp[i][1] = Math.max(dp[i-1][1], dp[i-1][0] - prices[i])
  }

  return dp[len-1][0]
};

// 1. 使空间为target的背包尽可能装满
var lastStoneWeightII = function(stones) {
  let len = stones.length
  let sum = 0
  for (let i = 0; i < len; i++) {
    sum += stones[i]
  }
  let target = Math.floor(sum / 2)
  let dp = Array(target + 1).fill(0)

  for (let i = 0; i < len; i++) {
    for (let j = target; j >= 0; j--) {
      if (j - stones[i] >= 0) {
        dp[j] = Math.max(dp[j], dp[j-stones[i]] + stones[i])
      }
    }
  }
  return sum - dp[target] - dp[target]
};


var maxProfit = function(k, prices) {
  if (k === 0 || prices.length === 0) return 0
  let n = prices.length
  let dp = Array.from({ length: k+1 }).map(() => Array(2).fill(0))
  if (k >= n / 2) {
    return fn(prices)
  }
  for (let i = 1; i <= k; i++) {
    dp[i][0] = 0
    dp[i][1] = -prices[0]
  }

  for (let i = 1; i < n; i++) {
    for (let j = k; j > 0; j--) {
      dp[j][0] = Math.max(dp[j][0], dp[j][1] + prices[i])
      dp[j][1] = Math.max(dp[j][1], dp[j-1][0] - prices[i])
    }
  }
  return dp[k][0]

  function fn(prices) {
    let prev = 0
    let curr = -prices[0]

    for (let i = 1; i < prices.length; i++) {
      let newprev = Math.max(prev, curr + prices[i])
      let newcurr = Math.max(curr, prev - prices[i])
      prev = newprev
      curr = newcurr
    }
    return prev
  }
};

var maxProfit = function(prices) {
  let n = prices.length
  let not_buy = 0
  let buy = -prices[0]

  for (let i = 1; i < n; i++) {
    not_buy = Math.max(not_buy, buy + prices[i])
    buy = Math.max(buy, -prices[i])
  }
  return not_buy
};



var maxCoins = function(nums) {
  let arr = [1, ...nums, 1]
  let n = nums.length
  let dp = Array.from({ length: n + 2 }).map(() => Array(n + 2).fill(0))

  for (let i = n; i >= 0; i--) {
    for (let j = i+1; j <= n+1; j++) {
      for (let k = i + 1; k < j; k++) {
        dp[i][j] = Math.max(dp[i][j], dp[i][k] + dp[k][j] + arr[i]*arr[j]*arr[k])
      }
    }
  }

  return dp[0][n+1]
};