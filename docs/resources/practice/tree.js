// 先序遍历
function preorder(root) {
  if (!root) {
    return;
  }

  console.log(root.val);
  preorder(root.left);
  preorder(root.right);
}

// 中序遍历
function inorder(root) {
  if (!root) {
    return;
  }

  inorder(root.left);
  console.log(root.val);
  inorder(root.right);
}

// 后续遍历
function postorder(root) {
  if (!root) {
    return;
  }

  postorder(root.left);
  postorder(root.right);
  console.log(root.val);
}

// 全排列
function permute(nums) {
  let res = [];
  let len = nums.length;
  let curr = [];
  let visited = {};

  function dfs(nth) {
    if (nth === len) {
      res.push(curr.slice());
      return;
    }
    for (let i = 0; i < len; i++) {
      if (!visited[nums[i]]) {
        visited[nums[i]] = 1;
        curr.push(nums[i]);
        dfs(nth + 1);
        curr.pop();
        visited[nums[i]] = 0;
      }
    }
  }
  dfs(0);
  return res;
}

// 全排列
function permute(nums) {
  let res = [];
  function dfs(nth, q, path) {
    if (nth === nums.length) {
      res.push(path);
      return;
    }
    for (let i = 0; i < q.length; i++) {
      let newq = q.slice(0, i).concat(q.slice(i + 1));
      dfs(nth + 1, newq, path.concat(q[i]));
    }
  }
  dfs(0, nums, []);
  return res;
}

/**
 * 
  示例: 输入: nums = [1,2,3]
  输出:
  [
    [3],
    [1],
    [2],
    [1,2,3],
    [1,3],
    [2,3],
    [1,2],
    []
  ]
 */
function subsets(nums) {
  let res = [];
  let len = nums.length;
  let curr = [];

  function dfs(index) {
    res.push(curr.slice());

    for (let i = index; i < len; i++) {
      // 选当前
      curr.push(nums[i]);
      dfs(i + 1);
      // 不选
      curr.pop();
    }
  }
  dfs(0);
  return res;
}

// 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合
// 剪枝
function combine(n, k) {
  let res = [];
  let curr = [];

  function dfs(index) {
    if (curr.length === k) {
      res.push(curr.slice());
      return;
    }
    for (let i = index; i <= n; i++) {
      curr.push(i);
      dfs(i + 1);
      curr.pop();
    }
  }
  dfs(1);

  return res;
}
