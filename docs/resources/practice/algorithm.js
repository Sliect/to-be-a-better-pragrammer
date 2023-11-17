function fib(n) {
  if (n === 1 || n === 2) return 1;
  let prev = 1;
  let curr = 1;
  for (let i = 2; i < n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}

function coinChange(coins, amount) {
  // 下标表示amount 值表示最少硬币数量
  const dp = [0];
  for (let i = 1; i <= amount; i++) {
    dp[i] = Infinity;
    for (let j = 0; j < coins.length; j++) {
      if (i >= coins[j]) {
        dp[i] = Math.min(dp[i - coins[j]] + 1, dp[i]);
      }
    }
  }
  if (dp[amount] === Infinity) {
    return -1;
  }
  return dp[amount];
}

let res = [];
function permute(nums) {
  let track = [];
  backtrack(nums, track);
  return res;
}
function backtrack(nums, track) {
  if (track.length === nums.length) {
    res.push(new Array(...track));
    return;
  }
  for (let i = 0; i < nums.length; i++) {
    if (track.includes(nums[i])) {
      continue;
    }
    track.push(nums[i]);
    backtrack(nums, track);
    track.pop();
  }
}

function lengthOfLIS(nums) {
  let len = nums.length;
  let dp = Array(len).fill(1);
  let maxLen = 1;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[j] + 1, dp[i]);
      }
    }
    if (dp[i] > maxLen) maxLen = dp[i];
  }

  return maxLen;
}

// 最短编辑距离
// s1 转化为 s2
function minDistance(s1, s2) {
  let m = s1.length;
  let n = s2.length;
  let dp = Array.from({ length: m + 1 }).map(() => Array(n + 1));

  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let i = 1; i <= n; i++) {
    dp[0][i] = i;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      }
    }
  }

  return dp[m][n];
}

function robHouse(nums) {
  // 两个守卫设为0
  let dp_i_1 = 0;
  let dp_i_2 = 0;
  let tmp = 0;

  for (let i = 0; i < nums.length; i++) {
    tmp = Math.max(dp_i_1, dp_i_2 + nums[i]);
    dp_i_2 = dp_i_1;
    dp_i_1 = tmp;
  }
  return dp_i_1;
}

// 穷举法 缓存法 表格法 找到状态转移方程
// 状态不好找的时候 罗列所有状态 把每个状态列为一个维度 注意转移的过程
// 数组可以设守卫状态 重点是逐步缩减规模且包含所有情况
// 找到初始化状态
// 循环
function maxSub(s1, s2) {
  let m = s1.length;
  let n = s2.length;
  let dp = Array.from({ length: m + 1 }).map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
}

function dailyTemperatures(nums) {
  let res = [];
  let stack = [];

  for (let i = nums.length - 1; i >= 0; i--) {
    while (stack.length && nums[stack[stack.length - 1]] <= nums[i]) {
      stack.pop();
    }

    res[i] = stack.length === 0 ? 0 : stack[stack.length - 1] - i;
    stack.push(i);
  }
  return res;
}
// 环形下一个更大值
function nextGreaterElements(nums) {
  let res = [];
  let s = [];
  let len = nums.length;

  for (let i = 2 * len - 1; i >= 0; i--) {
    while (s.length && s[s.length - 1] <= nums[i % len]) {
      s.pop();
    }

    res[i % len] = s.length === 0 ? -1 : s[s.length - 1];
    s.push(nums[i % len]);
  }
  return res;
}

function subsets(nums) {
  let res = [];
  let track = [];
  backtrack(0);

  function backtrack(start) {
    res.push(track.slice());
    for (let i = start; i < nums.length; i++) {
      track.push(nums[i]);
      backtrack(i + 1);
      track.pop();
    }
  }
  return res;
}

function combine(n, k) {
  let res = [];
  let curr = [];
  backtrack(1);

  function backtrack(start) {
    if (curr.length === k) {
      res.push(curr.slice());
      return;
    }
    for (let i = start; i <= n; i++) {
      curr.push(i);
      backtrack(i + 1);
      curr.pop();
    }
  }

  return res;
}

function allSort(nums) {
  let res = [];
  let curr = [];

  backtrack();

  function backtrack() {
    if (curr.length === nums.length) {
      res.push(curr.slice());
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (curr.includes(nums[i])) {
        continue;
      }
      curr.push(nums[i]);
      backtrack(i + 1);
      curr.pop();
    }
  }

  return res;
}

function trap(nums) {
  let len = nums.length;
  let left = 0;
  let right = len - 1;
  let l_max = (r_max = 0);
  let res = 0;

  while (left <= right) {
    l_max = Math.max(l_max, nums[left]);
    r_max = Math.max(r_max, nums[right]);

    if (l_max < r_max) {
      res += l_max - nums[left];
      left++;
    } else {
      res += r_max - nums[right];
      right--;
    }
  }

  return res;
}

/********************************************* 算法4 ***************************************************************/
// 选择排序 O(n^2)
function selectSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    let min = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    [arr[min], arr[i]] = [arr[i], arr[min]];
  }

  return arr;
}

// 插入排序 O(n^2)
function insertSort(arr) {
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    let curr = arr[i];
    let j = i;
    for (; j > 0; j--) {
      if (curr < arr[j - 1]) {
        // 大的数右移
        arr[j] = arr[j - 1];
      } else {
        // 因为已经有序，无需再比较
        break;
      }
    }
    arr[j] = curr;
  }
  return arr;
}

// 希尔排序 使间隔为h的元素有序  运行时间不到平方级
function shellSort(arr) {
  const len = arr.length;
  let h = 1;
  while (h < len / 3) h = 3 * h + 1;
  while (h >= 1) {
    // 间隔h的所有组合对
    for (let i = h; i < len; i++) {
      // 截止当前的间隔h有序
      // 当目前项不小于之前的最大项时，无须继续回头比较
      for (let j = i; j >= h && arr[j] < arr[j - h]; j -= h) {
        [arr[j], arr[j - h]] = [arr[j - h], arr[j]];
      }
    }
    h = Math.floor(h / 3);
  }
  return arr;
}

// 归并排序 自顶向下
function mergeSort(arr, lo = 0, hi = arr.length - 1) {
  if (lo >= hi) return;
  let mid = lo + Math.floor((hi - lo) / 2);
  mergeSort(arr, lo, mid);
  mergeSort(arr, mid + 1, hi);
  merge(arr, lo, mid, hi);
}
// 左数组和右数组从小到大合并
function merge(arr, lo, mid, hi) {
  let aux = [];
  let i = lo,
    j = mid + 1; // 指向原数组的左右其实指针
  // 复制原数组
  for (let k = 0; k <= hi; k++) {
    aux[k] = arr[k];
  }
  for (let k = lo; k <= hi; k++) {
    if (i > mid) {
      // 左边已完
      arr[k] = aux[j++]; // 右值赋值给当前
    } else if (j > hi) {
      // 右边已完
      arr[k] = aux[i++]; // 左值赋值给当前
    } else if (aux[j] < aux[i]) {
      // 右边的数小于左边的数
      arr[k] = aux[j++]; // 右值赋值给当前 且指向新的右边的数
    } else {
      // 右边的数大于等于左边的数
      arr[k] = aux[i++]; // 左值赋值给当前 且指向新的左边的数
    }
  }
}

// 快排
function quickSort(arr, lo = 0, hi = arr.length - 1) {
  if (lo >= hi) return;
  let j = partition(arr, lo, hi);
  quickSort(arr, lo, j - 1);
  quickSort(arr, j + 1, hi);
  return arr;
}
function partition(arr, lo, hi) {
  let i = lo,
    j = hi + 1;
  let v = arr[lo];

  while (true) {
    while (arr[++i] < v) {
      if (i === hi) break;
    }
    while (arr[--j] > v) {
      if (j === lo) break;
    }
    if (i >= j) break;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // j是最右侧不大于基准值的下标
  [arr[lo], arr[j]] = [arr[j], arr[lo]];
  return j;
}

/****************** leetcode tree  ******************** */
var levelOrder = function (root) {
  if (!root) return [];
  let q = [root];
  let res = [];
  let len;
  while ((len = q.length)) {
    // 移除队列中的所有元素到res
    let tmp = [];
    while (len--) {
      let top = q.shift();
      tmp.push(top.val);
      top.left && q.push(top.left);
      top.right && q.push(top.right);
    }
    res.push(tmp);
  }
  return res;
};

var BSTIterator = function (root) {
  this.stack = [];
  this.inorder(root);
};
BSTIterator.prototype.inorder = function (x) {
  while (x) {
    this.stack.push(x);
    x = x.left;
  }
};
BSTIterator.prototype.next = function () {
  let top = this.stack.pop();
  this.inorder(top.right);
  return top.val;
};
BSTIterator.prototype.hasNext = function () {
  return this.stack.length > 0;
};

// 思路：拆分为 当前节点开始的路径数 + 左孩子节点开始的路径数 + 右孩子节点开始的路径数
var pathSum = function (root, sum) {
  if (!root) return 0;
  let fromCurr = dfs(root, sum);
  let l = pathSum(root.left, sum);
  let r = pathSum(root.right, sum);

  return fromCurr + l + r;
  // 当前路径向下路径和为sum的有几条路径
  function dfs(root, sum) {
    if (!root) return 0;
    let curr = sum === root.val ? 1 : 0;
    let left = dfs(root.left, sum - root.val);
    let right = dfs(root.right, sum - root.val);
    return left + right + curr;
  }
};

// 思路：整体思维 换或者不换
var flipEquiv = function (root1, root2) {
  if (root1 == root2) return true;
  if (root1 == null || root2 == null || root1.val != root2.val) return false;
  return (
    (flipEquiv(root1.left, root2.right) &&
      flipEquiv(root1.right, root2.left)) ||
    (flipEquiv(root1.left, root2.left) && flipEquiv(root1.right, root2.right))
  );
};

function TreeNode(v) {
  this.val = v;
  this.left = this.right = null;
}
let map = {};
var allPossibleFBT = function (N) {
  if (!map[N]) {
    let ans = [];
    if (N === 1) {
      ans.push(new TreeNode(0));
    } else if (N % 2 === 1) {
      for (let x = 0; x < N; x++) {
        let y = N - x - 1;
        for (let left of allPossibleFBT(x)) {
          for (let right of allPossibleFBT(y)) {
            let bns = new TreeNode(0);
            bns.left = left;
            bns.right = right;
            ans.push(bns);
          }
        }
      }
    }
    map[N] = ans;
  }

  return map[N];
};

var sumEvenGrandparent = function (root) {
  let sum = 0;
  function dfs(x) {
    if (!x) return;
    if (x.val % 2 === 0) {
      if (x.left) {
        x.left.left && (sum += x.left.left.val);
        x.left.right && (sum += x.left.right.val);
      }
      if (x.right) {
        x.right.left && (sum += x.right.left.val);
        x.right.right && (sum += x.right.right.val);
      }
    }
    dfs(x.left);
    dfs(x.right);
  }

  dfs(root);
  return sum;
};

var delNodes = function (root, to_delete) {
  let res = [];

  function dfs(root) {
    if (!root) return;
    dfs(root.left);
    dfs(root.right);
    if (to_delete.indexOf(root.val) > -1) {
      root.left &&
        to_delete.indexOf(root.left.val) == -1 &&
        res.push(root.left);
      root.right &&
        to_delete.indexOf(root.right.val) == -1 &&
        res.push(root.right);
    }
    if (root.left && to_delete.indexOf(root.left.val) > -1) {
      root.left = null;
    }
    if (root.right && to_delete.indexOf(root.right.val) > -1) {
      root.right = null;
    }
  }
  dfs(root);
  to_delete.indexOf(root.val) == -1 && res.push(root);
  return res;
};

var connect = function (root) {
  let q = [root];
  while (q.length) {
    let len = q.length;
    while (len--) {
      let top = q.shift();
      top.next = len === 0 ? null : q[0];
      top.left && q.push(top.left);
      top.right && q.push(top.right);
    }
  }
  return root;
};

// 递归的子递归
var maxAncestorDiff = function (root) {
  let max = 0;
  // 1. 递归当前节点开始往下找到最大值
  // 2. 递归整棵树，重复步骤1
  function dfs(x, curr) {
    if (!x) return;
    max = Math.max(Math.abs(x.val - curr.val), max);
    dfs(x.left, curr);
    dfs(x.right, curr);
  }
  function outerDfs(x) {
    if (!x) return;
    dfs(x, x);
    outerDfs(x.left);
    outerDfs(x.right);
  }

  outerDfs(root);
  return max;
};
// 递归缓存
var maxAncestorDiff = function (root) {
  // 1. 前序遍历
  // 2. 找到当前节点 记录最大和最小值
  // 3. 记录结果值
  let res = 0;
  function dfs(x, max, min) {
    if (!x) return;
    res = Math.max(Math.abs(x.val - max), Math.abs(x.val - min), res);
    max = Math.max(max, x.val);
    min = Math.min(min, x.val);
    dfs(x.left, max, min);
    dfs(x.right, max, min);
  }

  dfs(root, root.val, root.val);
  return res;
};

var countNodes = function (root) {
  if (!root) return 0;
  let res = 0;
  let q = [root];
  while (q.length) {
    let len = q.length;
    while (len--) {
      let top = q.shift();
      res++;
      top.left && q.push(top.left);
      top.right && q.push(top.right);
    }
  }
  return res;
};
var countNodes = function (root) {
  if (root == null) return 0;
  let left = countLevel(root.left);
  let right = countLevel(root.right);
  if (left == right) {
    return countNodes(root.right) + Math.pow(2, left);
  } else {
    return countNodes(root.left) + Math.pow(2, right);
  }

  function countLevel(root) {
    let level = 0;
    while (root) {
      root = root.left;
      level++;
    }
    return level;
  }
};

var isSubStructure = function (A, B) {
  function isSame(a, b) {
    if (b == null) return true;
    if (a == null || a.val != b.val) return false;
    return isSame(a.left, b.left) && isSame(a.right, b.right);
  }

  return (
    !A &&
    !B &&
    (isSame(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B))
  );
};

// 中序遍历 栈模拟
var isValidBST = function (root) {
  let prev;
  let s = [];
  let curr = root;

  while (curr != null || s.length) {
    while (curr) {
      s.push(curr);
      curr = curr.left;
    }
    let top = s.pop();
    if (prev) {
      if (prev.val >= top.val) return false;
    }
    prev = top;
    curr = top.right;
  }
  return true;
};

var addOneRow = function (root, v, d) {
  let q = [root];
  let level = 1;
  if (d == 1) {
    let n = new TreeNode(v);
    n.left = root;
    return n;
  }
  while (q.length) {
    let len = q.length;
    while (len--) {
      let top = q.shift();
      if (level === d - 1) {
        let l = new TreeNode(v);
        let r = new TreeNode(v);
        if (top.left) {
          l.left = top.left;
        }
        top.left = l;
        if (top.right) {
          r.right = top.right;
        }
        top.right = r;
      }
      top.left && q.push(top.left);
      top.right && q.push(top.right);
    }
    level++;
  }
  return root;
};

var isCompleteTree = function (root) {
  let q = [root];
  let prev = root;
  while (q.length) {
    let curr = q.shift();
    if (prev == null && curr != null) {
      return false;
    }
    if (curr != null) {
      q.push(curr.left);
      q.push(curr.right);
    }
    prev = curr;
  }
  return true;
};

// 层次遍历 取最右侧的值放入
var rightSideView = function (root) {
  let res = [];
  let q = [root];
  while (q.length) {
    let len = q.length;
    res.push(q[len - 1]);
    while (len--) {
      let top = q.shift();

      if (top.left) {
        q.push(top.left);
      }
      if (top.right) {
        q.push(top.right);
      }
    }
  }

  return res;
};

// 返回翻转的节点值
var flipMatchVoyage = function (root, voyage) {
  let res = [];
  let index = 0;
  dfs(root);

  function dfs(root) {
    if (!root) return;
    if (root.val != voyage[index++]) {
      res.length = 0;
      res.push(-1);
      return;
    }

    if (
      index < voyage.length &&
      root.left != null &&
      node.left.val != voyage[index]
    ) {
      res.push(root.val);
      dfs(root.right);
      dfs(root.left);
    } else {
      dfs(root.left);
      dfs(root.right);
    }
  }

  return res;
};

var findFrequentTreeSum = function (root) {
  if (root == null) return [0];
  let memo = {};
  let max = 0;
  function dfs(root) {
    if (!root) return 0;
    let curr = root.val;
    let left = dfs(root.left);
    let right = dfs(root.right);
    curr += left + right;
    memo[curr] = (memo[curr] ? memo[curr] : 0) + 1;
    max = Math.max(max, memo[curr]);

    return curr;
  }
  dfs(root);
  let res = [];
  for (let k in memo) {
    if (memo[k] == max) {
      res.push(k);
    }
  }

  return res;
};

function ProNode(node, depth, pos) {
  this.node = node;
  this.depth = depth;
  this.pos = pos;
}
var widthOfBinaryTree = function (root) {
  let q = [new ProNode(root, 0, 0)];
  let max = 0;
  let left = 0;
  let currDepth = 0;
  while (q.length) {
    let top = q.shift();
    if (top.node != null) {
      q.push(new ProNode(top.node.left, top.depth + 1, top.pos * 2));
      q.push(new ProNode(top.node.right, top.depth + 1, top.pos * 2 + 1));
      if (currDepth != top.depth) {
        currDepth = top.depth;
        left = top.pos;
      }
      max = Math.max(max, top.pos - left + 1);
    }
  }
  return max;
};

// 找到对应节点下最大的左侧节点 或 最小的右侧节点
// 对应节点为 叶子节点 单孩子节点 双孩子节点
// 1. 重复利用同一个删除递归
// 2. 整体思路和按条件拆分，利用返回值
var deleteNode = function (root, key) {
  if (root == null) return null;
  if (root.val > key) root.left = deleteNode(root.left, key);
  else if (root.val < key) root.right = deleteNode(root.right, key);
  else {
    if (root.left == null && root.right == null) root = null;
    else if (root.right != null) {
      root.val = getMinRight(root);
      root.right = deleteNode(root.right, root.val);
    } else {
      root.val = getMaxLeft(root);
      root.left = deleteNode(root.left, root.val);
    }
  }
  return root;

  function getMaxLeft(x) {
    if (!x) return null;
    let root = x.left;
    while (root.right != null) {
      root = root.right;
    }
    return root.val;
  }
  function getMinRight(x) {
    if (!x) return null;
    let root = x.right;
    while (root.left != null) {
      root = root.left;
    }
    return root.val;
  }
};

// 1. 沿着当前交叉路径计算
// 2. 从当前节点重新计算
var longestZigZag = function (root) {
  let max = 0;
  function dfs(x, dir, length) {
    if (!x) return;
    max = Math.max(max, length);
    if (dir) {
      dfs(x.left, !dir, length + 1);
      dfs(x.right, dir, 1);
    } else {
      dfs(x.right, !dir, length + 1);
      dfs(x.left, dir, 1);
    }
  }
  // 先往左
  dfs(root, true, 0);
  // 先往右
  dfs(root, false, 0);
  return max;
};

function ProNode(node, depth) {
  this.node = node;
  this.depth = depth;
}
var subtreeWithAllDeepest = function (root) {
  function dfs(x) {
    if (!x) return new ProNode(null, 0);
    let l = dfs(x.left);
    let r = dfs(x.right);
    if (l.depth > r.depth) return new ProNode(l.node, l.depth + 1);
    if (l.depth < r.depth) return new ProNode(r.node, r.depth + 1);
    return new ProNode(x, l.depth + 1);
  }
  return dfs(root).node;
};

var bstFromPreorder = function (preorder) {
  let idx = 0;
  let n = preorder.length;
  function helper(low, high) {
    if (idx === n) return null;
    let val = preorder[idx];
    if (val < low || val > high) return null;
    idx++;
    let root = new TreeNode(val);
    root.left = helper(low, val);
    root.right = helper(val, high);
    return root;
  }
  return helper(-Infinity, Infinity);
};

var flatten = function (root) {
  if (!root) return null;
  let res = root;
  flatten(root.left);
  let right = root.right;
  root.right = root.left;
  root.left = null;
  while (root.right) {
    root = root.right;
  }
  flatten(right);
  root.right = right;
  return res;
};

var lowestCommonAncestor = function (root, p, q) {
  if (!root || root == p || root == q) return root;
  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  if (left) return left;
  return right;
};

var largestValues = function (root) {
  let res = [];
  function dfs(x, level) {
    if (!x) return;
    res[level] = res[level] != undefined ? Math.max(res[level], x.val) : x.val;
    dfs(x.left, level + 1);
    dfs(x.right, level + 1);
  }
  dfs(root, 0);
  return res;
};

var pathSum = function (root, sum) {
  let res = [];
  function dfs(x, sum, path) {
    if (!x) return;
    path = path.concat(x.val);
    let rest = sum - x.val;
    if (!x.left && !x.right && sum === x.val) {
      res.push(path);
    }
    dfs(x.left, rest, path);
    dfs(x.right, rest, path);
  }
  dfs(root, sum, []);
  return res;
};

// 回溯
var smallestFromLeaf = function (root) {
  let res = "";
  function dfs(x, s) {
    if (!x) return;
    s += String.fromCharCode(97 + x.val);
    if (!x.left && !x.right) {
      let curr = s.split("").reverse().join("");
      if (res === "" || curr < res) res = curr;
    }
    dfs(x.left, s);
    dfs(x.right, s);
    s = s.slice(0, -1);
  }
  dfs(root, "");
  return res;
};

var buildTree = function (preorder, inorder) {
  if (preorder.length === 0) return null;
  let val = preorder[0];
  let mid = inorder.indexOf(val);
  let leftInorder = inorder.slice(0, mid);
  let rightInorder = inorder.slice(mid + 1);
  let leftPreorder = preorder.slice(1, mid + 1);
  let rightPreorder = preorder.slice(mid + 1);
  let left = buildTree(leftPreorder, leftInorder);
  let right = buildTree(rightPreorder, rightInorder);
  let root = new TreeNode(val);
  root.left = left;
  root.right = right;
  return root;
};

var sumNumbers = function (root) {
  let res = 0;
  dfs(root, 0);
  function dfs(x, sum) {
    if (!x) return;
    sum = sum * 10 + x.val;
    if (!x.left && !x.right) {
      res += sum;
    }
    dfs(x.left, sum);
    dfs(x.right, sum);
    sum = Math.floor(x / 10);
  }
  return res;
};

var verticalTraversal = function (root) {
  // 记录所有节点从上往下 从左到右排序
  let arr = [];
  dfs(root, 0, 0);
  arr.sort((a, b) => {
    if (a.x != b.x) {
      return a.x - b.x;
    } else if (a.y != b.y) {
      return a.y - b.y;
    } else {
      return a.v - b.v;
    }
  });
  let res = [[]];
  // 上一个横向坐标
  let prev = arr[0].x;
  for (let item of arr) {
    if (item.x != prev) {
      prev = item.x;
      res.push([]);
    }
    res[res.length - 1].push(item.v);
  }

  function dfs(node, x, y) {
    if (!node) return;
    arr.push({
      x,
      y,
      v: node.val,
    });
    dfs(node.left, x - 1, y + 1);
    dfs(node.right, x + 1, y + 1);
  }
  return res;
};

var listOfDepth = function (tree) {
  let res = [];
  dfs(tree, 0);
  function dfs(x, level) {
    if (!x) return null;
    if (res[level] != undefined) {
      let head = new ListNode(x.val);
      head.next = res[level];
      res[level] = head;
    } else {
      res[level] = new ListNode(x.val);
    }
    dfs(x.right, level + 1);
    dfs(x.left, level + 1);
  }
  return res;
};

// 沿途上的所有节点不大于当前节点 则count++
var goodNodes = function (root) {
  let count = 0;
  dfs(root, -Infinity);
  function dfs(x, max) {
    if (!x) return;
    if (x.val >= max) {
      count++;
      max = x.val;
    }
    dfs(x.left, max);
    dfs(x.right, max);
  }
  return count;
};

var inorderSuccessor = function (root, p) {
  function dfs(x) {
    if (!x) return;
    dfs(x.left);
    if (prev) {
      if (prev == p) {
        res = x;
      }
    }
    prev = x;
    dfs(x.right);
  }
  let prev;
  let res = null;
  dfs(root);
  return res;
};

var insertIntoBST = function (root, val) {
  if (root == null) return new TreeNode(val);
  if (root.val > val) root.left = insertIntoBST(root.left, val);
  else root.right = insertIntoBST(root.right, val);
  return root;
};
var insertIntoBST = function (root, val) {
  let curr = root;
  while (curr != null) {
    if (curr.val > val) {
      if (curr.left == null) {
        curr.left = new TreeNode(val);
        return root;
      } else {
        curr = curr.left;
      }
    } else {
      if (curr.right == null) {
        curr.right = new TreeNode(val);
        return root;
      } else {
        curr = curr.right;
      }
    }
  }
  return new TreeNode(val);
};

var removeLeafNodes = function (root, target) {
  if (!root) return null;
  let left = removeLeafNodes(root.left, target);
  let right = removeLeafNodes(root.right, target);
  root.left = left;
  root.right = right;
  if (!left && !right) {
    if (root.val == target) {
      root = null;
    }
    return root;
  }
  return root;
};

// 任意一段向下的路径求和
var pathSum = function (root, sum) {
  let count = 0;
  function outerDfs(x) {
    if (!x) return;
    dfs(x, sum);
    outerDfs(x.left);
    outerDfs(x.right);
  }
  function dfs(x, rest) {
    if (!x) return;
    if (x.val == rest) {
      count++;
    }
    dfs(x.left, rest - x.val);
    dfs(x.right, rest - x.val);
  }
  outerDfs(root);
  return count;
};

var zigzagLevelOrder = function (root) {
  if (!root) return [];
  let q = [root];
  let res = [];
  let flag = true;
  while (q.length) {
    let len = q.length;
    let tmp = [];
    while (len--) {
      let top = q.shift();
      if (flag) {
        tmp.push(top.val);
      } else {
        tmp.unshift(top.val);
      }
      if (top.left) {
        q.push(top.left);
      }
      if (top.right) {
        q.push(top.right);
      }
    }
    res.push(tmp);
    flag = !flag;
  }
  return res;
};

var getAllElements = function (root1, root2) {
  let res = [];
  let arr1 = [];
  let arr2 = [];
  function dfs(x, arr) {
    if (!x) return;
    dfs(x.left, arr);
    arr.push(x.val);
    dfs(x.right, arr);
  }
  dfs(root1, arr1);
  dfs(root2, arr2);

  let len1 = arr1.length;
  let len2 = arr2.length;
  let i = (j = 0);
  while (i < len1 && j < len2) {
    if (arr1[i] < arr2[j]) {
      res.push(arr1[i++]);
    } else {
      res.push(arr2[j++]);
    }
  }
  if (i === len1 && j < len2) {
    res = res.concat(arr2.slice(j));
  }
  if (j === len2 && i < len1) {
    res = res.concat(arr1.slice(i));
  }
  return res;
};

// 能分解成子问题 返回值就有意义
var rob = function (root) {
  function dfs(root) {
    if (!root) return [0, 0];
    let left = dfs(root.left);
    let right = dfs(root.right);
    let selected = root.val + left[1] + right[1];
    let notSelected = Math.max(...left) + Math.max(...right);
    return [selected, notSelected];
  }
  return Math.max(...dfs(root));
};

var isValidBST = function (root) {
  function dfs(x, low, high) {
    if (!x) return true;
    if (x.val <= low || x.val >= high) return false;
    return dfs(x.left, low, x.val) && dfs(x.right, x.val, high);
  }
  return dfs(root, -Infinity, Infinity);
};

var constructMaximumBinaryTree = function (nums) {
  if (nums.length === 0) return null;
  let val = Math.max(...nums);
  let idx = nums.indexOf(val);
  let root = new TreeNode(val);
  root.left = constructMaximumBinaryTree(nums.slice(0, idx));
  root.right = constructMaximumBinaryTree(nums.slice(idx + 1));
  return root;
};

var findBottomLeftValue = function (root) {
  let maxLevel = 0;
  let res = root;
  dfs(root, 0);
  function dfs(x, level) {
    if (!x) return;
    if (level > maxLevel) {
      res = x;
      maxLevel = level;
    }
    dfs(x.left, level + 1);
    dfs(x.right, level + 1);
  }
  return res;
};

var kthSmallest = function (root, k) {
  let i = 0;
  let res;
  function dfs(x) {
    if (!x) return;
    dfs(x.left);
    if (++i === k) {
      res = x.val;
    }
    dfs(x.right);
  }
  dfs(root);
  return res;
};

var deepestLeavesSum = function (root) {
  let max = -1;
  let sum = 0;
  function dfs(x, level) {
    if (!x) return;
    if (level > max) {
      max = level;
      sum = x.val;
    } else if (level === max) {
      sum += x.val;
    }
    dfs(x.left, level + 1);
    dfs(x.right, level + 1);
  }
  dfs(root, 0);
  return sum;
};

// 兄弟节点和父子节点合并-1
var minTime = function (n, edges, hasApple) {
  let res = 0;
  for (let i = 0; i < edges.length; i++) {
    if (hasApple[edges[i][1]]) {
      hasApple[edges[i][0]] = true;
    }
  }
  for (let i = 0; i < edges.length; i++) {
    if (hasApple[edges[i][1]]) {
      res += 2;
    }
  }
  return res;
};

var checkSubTree = function (t1, t2) {
  if (t1 === null) return t2 === null;
  function isSame(t1, t2) {
    if (!t1 && !t2) return true;
    if (!t1 || !t2) return false;
    return (
      t1.val === t2.val &&
      isSame(t1.left, t2.left) &&
      isSame(t1.right, t2.right)
    );
  }
  return (
    isSame(t1, t2) || checkSubTree(t1.left, t2) || checkSubTree(t1.right, t2)
  );
};

/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  if (postorder.length === 0) return null;
  let len = postorder.length;
  let val = postorder[len - 1];
  let i = inorder.indexOf(val);
  let root = new TreeNode(val);
  root.left = buildTree(inorder.slice(0, i), postorder.slice(0, i));
  root.right = buildTree(inorder.slice(i + 1), postorder.slice(i, -1));
  return root;
};

/**
 * @param {Node} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  let res = [];
  function dfs(x, level) {
    if (!x) return;
    if (res[level]) {
      res[level].push(x.val);
    } else {
      res[level] = [x.val];
    }
    for (let k in x.children) {
      dfs(x.children[k], level + 1);
    }
  }
  dfs(root, 0);
  return res;
};

/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function (root, sum) {
  let res = [];
  dfs(root, sum, []);
  function dfs(x, rest, path) {
    if (!x) return;
    path.push(x.val);
    if (x.left === null && x.right === null && x.val === rest) {
      res.push(path.slice());
    }
    dfs(x.left, rest - x.val, path);
    dfs(x.right, rest - x.val, path);
    path.pop();
  }
  return res;
};

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
// 后序遍历
var lcaDeepestLeaves = function (root) {
  let maxDepth = 0;
  let res = root;
  function dfs(x, depth) {
    if (!x) return depth;
    depth++;
    let left = dfs(x.left, depth);
    let right = dfs(x.right, depth);
    // 当前节点深度
    depth = Math.max(left, right);
    if (left === right && depth >= maxDepth) {
      res = x;
      maxDepth = depth;
    }
    return depth;
  }
  dfs(root, 0);
  return res;
};

var pruneTree = function (root) {
  return containOne(root) ? root : null;

  function containOne(x) {
    if (!x) return false;
    let left = containOne(x.left);
    let right = containOne(x.right);
    // 重点是想清楚什么情况下进行操作
    if (!left) x.left = null;
    if (!right) x.right = null;
    // 什么情况更有利于进行逻辑判断
    return x.val === 1 || left || right;
  }
};

var levelOrder = function (root) {
  let res = [];
  function dfs(x, depth) {
    if (!x) return;
    if (res[depth]) {
      res[depth][depth % 2 === 0 ? "push" : "unshift"](x.val);
    } else {
      res[depth] = [x.val];
    }
    dfs(x.left, depth + 1);
    dfs(x.right, depth + 1);
  }
  dfs(root, 0);
  return res;
};

// 后序遍历得到每个节点的最大贡献值 (当前节点单边向下的最大值)
// 缓存当前节点 + 左孩子的最大贡献值 + 右孩子的最大贡献值 为最大值
// 返回最大值
var maxPathSum = function(root) {
  let res = -Infinity
  function dfs(x) {
    if (!x) return 0
    let left = Math.max(dfs(x.left), 0)
    let right = Math.max(dfs(x.right), 0)
    let val = x.val + left + right
    res = Math.max(res, val)
    return x.val + Math.max(left, right)
  }
  dfs(root)
  return res
};


// 使用一个queue存储下个所有可能的节点
// 然后选择其中一个作为path的下一个元素
// 递归直到queue元素为空
// 将对应的path加入结果中
// 由于二叉搜索树没有重复元素, 而且每次递归的使用元素的顺序都不一样, 所以自动做到了去重
var BSTSequences = function(root) {
  if (!root) return [[]]
  let res = []
  function findPath(curr, q, path) {
    if (curr.left) {
      q.push(curr.left)
    }
    if (curr.right) {
      q.push(curr.right)
    }
    if (!q.length) {
      res.push(path)
      return
    }
    for (let i=0; i < q.length; i++) {
      let newq = q.slice(0, i).concat(q.slice(i+1))
      findPath(q[i], newq, path.concat(q[i].val))
    }
  }
  findPath(root, [], [root.val])
  return res
};

var postorderTraversal = function(root) {
  if (!root) return []
  let left = postorderTraversal(root.left)
  let right = postorderTraversal(root.right)
  return [...left, ...right].concat([root.val])
};
// 迭代
var postorderTraversal = function(root) {
  if (!root) return []
  let s = [root]
  let res = []

  while(s.length) {
    let top = s.pop()
    res.unshift(top.val)
    if (top.left) {
      s.push(top.left)
    }
    if (top.right) {
      s.push(top.right)
    } 
  }
  return res
};

// 中序遍历 迭代
var inorderTraversal = function(root) {
  let s = []
  let curr = root
  let res = []

  while(curr || s.length) {
    while(curr.left) {
      s.push(curr)
      curr = curr.left
    }
    curr = s.pop()
    res.push(curr.val)
    curr = curr.right
  }
  return res
}


var recoverFromPreorder = function(S) {
  let stack = []
  let pos = 0
  while(pos < S.length) {
    let level = 0
    while(S[pos] === '-') {
      level++
      pos++
    }
    let val = 0
    while(pos < S.length && S[pos] !== '-') {
      val = val * 10 + Number(S[pos])
      pos++
    }
    // val 为当前节点的值 pos 为当前下标位置 level 为当前层级
    let node = new TreeNode(val)
    if (level === stack.length) {
      if (stack.length) {
        stack[stack.length-1].left = node
      }
    } else {
      while(level !== stack.length) {
        stack.pop()
      }
      stack[stack.length-1].right = node
    }
    stack.push(node)
  }
  while(stack.length > 1) {
    stack.pop()
  }
  return stack[0]
};

// f(n-1) + f(n-2) + f(n-3)
var waysToStep = function(n) {
  let dp = [0, 1, 2, 4]
  for (let i = 4; i <= n; i++) {
    dp[n] = dp[i-1] + dp[i-2] + dp[i-3]
  }
  return dp[n]
};

// f(n) = Math.max(f(n-2) + arr[n], f(n-1))
var massage = function(nums) {
  if (nums.length === 0) return 0
  let dp0 = 0
  let dp1 = nums[0]
  for (let i = 1; i < nums.length; i++) {
    let tmp = dp1
    dp1 = Math.max(dp0 + nums[1], dp1)
    dp0 = tmp
  }
  return dp[nums.length-1]
};

var uniquePaths = function(m, n) {
  let dp = Array(m).fill(1)
  for (let i = 1; i < m; i++) {
    dp[0] = 1
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j-1]
    }
  }
  return dp[n-1]
};

// 插入 删除 替换 将w1转换成w2的最小操作次数
// 前i个w1元素转换成前j个w2元素 需要多少步
function minDistance(w1, w2) {
  let m = w1.length
  let n = w2.length
  let dp = Array(m+1).fill(null).map(() => Array(n+1).fill(0))
  for (let i = 1; i <= m; i++) {
    dp[i][0] = dp[i-1][0] + 1
  }
  for (let j = 1; j <= n; j++) {
    dp[0][j] = dp[0][j-1] + 1
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (w1[i-1] === w2[j-1]) {
        dp[i][j] = dp[i-1][j-1]
      } else {
        dp[i][j] = Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]) + 1
      }
    }
  }
  return dp[m][n]
}

// 前缀即除最后一个字符外，以头字符开始的所有可能
// 后缀即除首字符以外，以尾字符结尾的所有可能
// ABABABC ABABC
// ABABC
// 00120       PMT  最长的匹配前后缀长度
// -1,0,0,1,2  next 不等的时候开始的位置
// 已匹配的字符数 4
// 部分匹配的字符数 2
// 移动的位数 4-2
function KMP(str, pattern) {
  // 部分匹配值
  let next = [-1]

  function genNext() {
    // 生成next数组
    let i = 0
    let j = -1
    while(i < pattern.length) {
      if (j === -1 || pattern[i] === pattern[j]) { // 从头开始或匹配
        i++ 
        j++ 
        next[i] = j // [-1, 0, 0, 1, 2] j在不匹配的时候开始的位置,也就是前面已经匹配的个数
      } else { // 不匹配
        j = next[j] 
      }
    }
  }

  genNext()
  let i = 0
  let j = 0
  while(i < str.length && j < pattern.length) {
    if (j === -1 || str[i] === pattern[j]) {
      i++
      j++
    } else {
      j = next[j]
    }
  }
  if (j === pattern.length) {
    return i - j
  } else {
    return -1
  }
}
