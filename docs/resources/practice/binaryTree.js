function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}

// 用栈实现先序遍历
// 1. 根节点入栈
// 2. 出栈 如果节点有右孩子则右孩子入栈，如果有左孩子则左孩子入栈
// 3. 重复第二步
function preorderTraversal(root) {
  let stack = []
  let res = []
  stack.push(root)

  while(stack.length) {
    let top = stack.pop()
    res.push(top.val)
    if (top.right) {
      stack.push(top.right)
    } 
    if (top.left) {
      stack.push(top.left)
    }
  }
  return res
}

// 后序遍历
// 倒着输入结果集
function postorderTraversal(root) {
  let stack = []
  let res = []
  stack.push(root)

  while(stack.length) {
    let top = stack.pop()
    res.unshift(top.val)
    if (top.left) {
      stack.push(top.left)
    }
    if (top.right) {
      stack.push(top.right)
    } 
  }
  return res
}

// 中序遍历
function inorderTraversal(root) {
  let stack = []
  let res = []
  let cur = root 

  while(cur || stack.length) {
    // 沿途左节点入栈
    while(cur) {
      stack.push(cur)
      cur = cur.left
    }
    // 取出栈顶节点
    cur = stack.pop()
    res.push(cur.val)
    // 返回查看右孩子
    cur = cur.right
  }
  return res
}

// 层次遍历
//  二叉树：[3,9,20,null,null,15,7],
// [
//  [3],
//  [9,20],
//  [15,7]
// ]
function levelOrder(root) {
  let res = []
  const queue = []
  queue.push(root)

  while(queue.length) {
    const len = queue.length
    const level = []

    for (let i = 0; i < len; i++) {
      let curr = queue.shift()
      level.push(curr.val)
      if (curr.left) {
        queue.push(curr.left)
      }
      if (curr.right) {
        queue.push(curr.right)
      }
    }
    res.push(level)
  }
  return res
}

// 翻转二叉树
function invertTree(root) {
  if (!root) return root
  // 必须缓存 直接赋值会导致取的是新值
  let left = invertTree(root.left)
  let right = invertTree(root.right)
  root.left = right 
  root.right = left
  return root
}