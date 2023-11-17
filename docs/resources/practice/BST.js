// 二叉搜索树 左孩子 <= 根结点 <= 右孩子
function search(root, n) {
  if (!root) return;
  if (root.val === n) {
    console.log(root);
  } else if (root.val > n) {
    search(root.left, n);
  } else {
    search(root.right, n);
  }
}

function insert(root, n) {
  // 当前可插入
  if (!root) {
    root = new TreeNode(n);
    return;
  }
  if (root.val === n) {
    return;
  } else if (root.val > n) {
    insert(root.left, n);
  } else {
    insert(root.right, n);
  }
}

function deleteBST(root, n) {
  if (!root) return;
  if (root.val === n) {
    // 叶子节点 直接删除
    if (!root.left && !root.right) {
      root = null;
    } else if (root.left) {
      // 取左孩子的最大值覆盖，并删除左孩子
      const maxLeft = findMax(root.left);
      root.val = maxLeft.val;
      deleteBST(root.left, maxLeft.val);
    } else {
      // 取右孩子的最小值覆盖，并删除右孩子
      const minRight = findMin(root.right);
      root.val = minRight.val;
      deleteBST(root.right, minRight.val);
    }
  } else if (root.val > n) {
    deleteBST(root.left, n);
  } else {
    deleteBST(root.right, n);
  }
}

function findMax(root) {
  while (root.right) {
    root = root.right;
  }
}

function findMin(root) {
  while (root.left) {
    root = root.left;
  }
}

// 验证二叉搜索树
function valid(root) {
  function dfs(root, min, max) {
    if (!root) return;
    if (root.val <= min || root.val >= max) return false;
    return dfs(root.left, min, root.val) && dfs(root.right, root.val, max);
  }

  return dfs(root, -Infinity, Infinity);
}

// 数组转平衡二叉树
function sortedArrayToBST(nums) {
  if (!nums.length) return;

  const root = buildBST(0, nums.length - 1);

  function buildBST(low, high) {
    if (low > high) return;
    const mid = Math.floor(low + (high - low) / 2);
    const cur = new TreeNode(nums[mid]);
    cur.left = buildBST(low, mid - 1);
    cur.right = buildBST(mid + 1, high);
    return cur;
  }

  return root;
}

// 平衡二叉树是任意结点的左右子树高度差绝对值都不大于1的二叉搜索树
function isBalanced(root) {
  let flag = true;

  function dfs(root) {
    if (!root || !flag) return 0;
    const left = dfs(root.left);
    const right = dfs(root.right);
    if (Math.abs(left - right) > 1) {
      flag = false;
      return 0;
    }
    return Math.max(left, right) + 1;
  }
  dfs(root);
  return flag;
}

// 1. 中序遍历获得有序数组
// 2. 数组转平衡二叉树
function balanceBST(root) {
  let nums = [];

  function inorder(root) {
    if (!root) return;
    inorder(root.left);
    nums.push(root.val);
    inorder(root.right);
  }

  function buildAVL(low, high) {
    if (low > high) return;
    const mid = Math.floor(low + (high - low) / 2);
    const cur = new TreeNode(nums[mid]);
    cur.left = buildAVL(low, mid - 1);
    cur.right = buildAVL(mid + 1, high);
    return cur;
  }

  inorder(root);
  return buildAVL(0, nums.length - 1);
}

// 完全二叉树 特性 2n+1 2n+2
// 删除堆顶元素，以大顶堆为例
// 1. 最末元素替换堆顶元素
// 2. 对比堆顶元素的左右孩子和堆顶的大小，如果其中一个值大于堆顶，则交换两者的位置
// 3. 向下对比 重复第二步
function downHeap(low, high) {
  let i = low;
  let j = i * 2 + 1;

  while (j < high) {
    // 取左右孩子中较大的作为下标
    if (j + 1 <= high && heap[j + 1] > heap[j]) {
      j = j + 1;
    }
    // 当前值比 较大的孩子小
    if (heap[i] < heap[j]) {
      // 交换位置
      const temp = heap[i];
      heap[i] = heap[j];
      heap[j] = temp;

      i = j;
      j = j * 2 + 1;
    } else {
      break;
    }
  }
}

// 堆增加元素
// 1. 尾部添加
// 2. 与父元素对比，大于父元素就交换
// 该算法把末尾添加的元素不断往上迭代
function upHeap(low, high) {
  let i = high;
  // 父节点
  let j = Math.floor((i - 1) / 2);
  while (j >= low) {
    if (heap[j] < heap[i]) {
      const temp = heap[j];
      heap[j] = heap[i];
      heap[i] = temp;

      i = j;
      j = Math.floor((i - 1) / 2);
    } else {
      break;
    }
  }
}

// 在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
// 输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
// 输出: 4
// 1. 用小堆顶维护n个元素中最大的k个元素
// 2. 小堆顶中的堆顶元素就是所求值
function findKthLargest(nums, k) {
  const heap = [];
  let n = 0;

  function createHeap() {
    for (let i = 0; i < k; i++) {
      insert(nums[i]);
    }
  }

  function updateHeap() {
    for (let i = k; i < nums.length; i++) {
      if (nums[i] > heap[0]) {
        heap[0] = nums[i];
        downHeap(0, k);
      }
    }
  }

  function downHeap(low, high) {
    let i = low;
    let j = i * 2 + 1;

    while (j <= high) {
      if (j + 1 <= high && heap[j] > heap[j + 1]) {
        j++;
      }
      if (heap[i] > heap[j]) {
        const temp = heap[i];
        heap[i] = heap[j];
        heap[j] = temp;

        i = j;
        j = i * 2 + 1;
      } else {
        break;
      }
    }
  }

  function insert(x) {
    heap[n] = x;
    upHeap(0, n);
    n++;
  }

  function upHeap(low, high) {
    let i = high;
    let j = Math.floor((i - 1) / 2);
    while (j >= low) {
      if (heap[j] > heap[i]) {
        const temp = heap[i];
        heap[i] = heap[j];
        heap[j] = temp;

        i = j;
        j = Math.floor((i - 1) / 2);
      } else {
        break;
      }
    }
  }

  createHeap();
  updateHeap();
  return heap[0];
}

// 堆排序
// 1. 创造大堆顶
// 2. 首尾互换,固定末尾
// 3. 剩余部分重新排列成新的大堆顶
// 4. 重复2,3步骤,直到都固定 就是从小到大的顺序
function heapSort(nums) {
  const heap = [];
  let n = 0

  function createHeap() {
    for (let i = 0; i < nums.length; i++) {
      insert(nums[i])
    }
  }

  function updateHeap(low, high) {
    for (let i = 0; i < high; i++) {
      swap(low, high - i)
      downHeap(0, high - 1 - i)
    }
  }

  function downHeap(low, high) {
    let i = low
    let j = i * 2 + 1

    while (j <= high) {
      if (j + 1 <= high && heap[j] < heap[j + 1]) {
        j++
      }
      if (heap[j] > heap[i]) {
        swap(i, j)

        i = j
        j = i * 2 + 1
      } else {
        break
      }
    }
  }

  function insert(x) {
    heap[n] = x
    upHeap(0, n)
    n++
  }

  function upHeap(low, high) {
    let i = high
    let j = Math.floor((i - 1) / 2)

    while (j >= low) {
      if (heap[j] < heap[i]) {
        swap(i, j)

        i = j
        j = Math.floor((i - 1) / 2)
      } else {
        break
      }
    }
  }

  function swap(i, j) {
    const temp = heap[i]
    heap[i] = heap[j]
    heap[j] = temp
  }

  createHeap();
  updateHeap(0, heap.length - 1);
  return heap;
}

function heapSort2(arr) {
  // 最大的非叶子节点下标
  let i = Math.floor((arr.length - 2) / 2)
  // 构建最大堆
  for (; i >= 0; i--) {
    downAdjust(arr, i, arr.length)
  }
  for (let i=arr.length-1; i>0; i--) {
    let temp = arr[i]
    arr[i] = arr[0]
    arr[0] = temp
    downAdjust(arr, 0, i)
  }
  return arr
}
function downAdjust(arr, parentIndex, len) {
  let temp = arr[parentIndex]
  let childIndex = 2 * parentIndex + 1
  while(childIndex < len) {
    if (childIndex + 1 < len && arr[childIndex+1] > arr[childIndex]) {
      childIndex++
    }
    if (temp >= arr[childIndex]) break
    arr[parentIndex] = arr[childIndex]

    parentIndex = childIndex
    childIndex = 2 * parentIndex + 1
  }
  arr[parentIndex] = temp
}