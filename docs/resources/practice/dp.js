// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
// f(n) = f(n-1) + f(n-2)
function climbStairs(n) {
  let dp = []
  dp[1] = 1
  dp[2] = 2
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[1] + dp[2]
  }
  return dp[n]
}

// 给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
// f(account) = Math.min(f(account - c1) + 1, f(account - c2) + 1, ..., f(account - cn) + 1) 
function coinChange(coins, amount) {
  const dp = [0]
  for (let i = 1; i <= amount; i++) {
    dp[i] = Infinity
    for (let j = 0; j < coins.length; j++) {
      if (i - coins[j] >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1)
      }
    }
  }
  if (dp[amount] === Infinity) {
    return -1
  }
  return dp[amount]
}

// 背包模型
// f(i, c) = f(i-1, c-w[i]) + values[i]
function knapsack(n, c, w, values) {
  const dp = []
  let res = -Infinity
  for (let i = 0; i <= n; i++) {
    for (let v = c; v >= w[i]; v--) {
      dp[v] = Math.max(dp[v], dp[v - w[i]] + values[i])
      if (dp[v] > res) {
        res = dp[v]
      }
    }
  }
  return res
}

// 最长上升子序列模型
function lengthOfLIS(nums) {
  const len = nums.length
  if (!len) return 0
  const dp = (new Array(len)).fill(1)
  let maxLen = 1

  for (let i = 1; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        // 前j个元素中最长子序列
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
    if (dp[i] > maxLen) {
      maxLen = dp[i]
    }
  }

  return maxLen
}