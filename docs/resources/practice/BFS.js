// 广度遍历优先
// 与队列有关
function BFC(root) {
  const queue = []
  queue.push(root)
  while(queue.length) {
    let top = queue.shift()
    console.log(top.val)
    if (top.left) {
      queue.push(top.left)
    }
    if (top.right) {
      queue.push(top.right)
    }
  }
}