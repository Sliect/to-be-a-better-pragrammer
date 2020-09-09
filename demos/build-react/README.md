# [build-your-own-react](https://pomb.us/build-your-own-react/) v16.8

## createElement 函数

createElement 传递 tag name, props, children 返回一个 vnode 对象

```js
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

// 自己的 React
const Didact = {
  createElement
}
// babel会调用 Didact.createElement 的方法来对 jsx对象进行编译
/** @jsx Didact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
)
```

## render 函数

``` js
function render(element, container) {
  const dom = element.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(element.type)
  // 赋值dom属性
  const isProperty = key => key !== 'children' 
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })
  // 递归渲染dom节点
  element.props.children.forEach(child => render(child, dom))
  container.append(dom)
}
const Didact = {
  createElement, 
  render
}

```

## 并发模式

上面的渲染如果元素过多，会堵塞浏览器，所以要将任务拆分成多个小单元，每完成一个单元，如果需要执行其它操作，就让浏览器中断操作  

window.requestIdleCallback()方法将在浏览器的空闲时段内调用的函数排队  

``` js
let nextUnitOfWork = null
function workLoop(deadline) {
  let shouldYield = false
  // 当有单元任务和不需要让出资源时
  while(nextUnitOfWork && !shoulwYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    // 判断用户代理(浏览器)还剩余多少闲置时间可以用来执行耗时任务
    shouleYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)

function performUnitOfWork(nextUnitOfWork) {
  // 执行单元任务 且返回一个新的单元任务
}
```

## Fibers

用 fiber tree 来划分任务单元，child 和 sibling 来找到下一个任务单元，以 dfs 递归树  

``` js
function createDom(fiber) {
  const dom = fiber.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(fiber.type)

  const isProperty = key => key !== 'children'
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = fiber.props[name]
    })

  return dom
}
// 设置fiber tree的 root 为 nextUnitOfWork
function render(element, container) {
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element]
    }
  }
}

function performUnitOfWork(fiber) {
  // 新增 dom 
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom)
  }
  // 创建 fiber
  const elements = fiber.props.children
  let index = 0
  let prevSibling = null
  while(index < elements.length) {
    const element = elements[index]
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null
    }
    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
    index++
  }
  // 返回 nextUnitOfWork
  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber
  while(nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}
```

## Render and Commit Phases

问题：用户可能会看到不完整的UI  
解决：不直接加node子节点，而是追踪当前活动的 fiber 节点  

``` js
function commitRoot() {
  // add nodes
  commitWork(wipRoot.child)
  wipRoot = null
}
function commitWork(fiber) {
  if (!fiber) return
  const domParent = fiber.parent.dom
  domParent.appendChild(fiber.dom)
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}
function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    }
  }
  nextUnitOfWork = wipRoot
}
function workLoop(deadline) {
  let shouldYield = false
  while(nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = peformUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }
  // 遍历完所有任务单元 
  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }
  requestIdleCallback(workLoop)
}
let nextUnitOfWork = null
let wipRoot = null
```

## Reconciliation

更新、删除操作  
``` js
const isEvent = key => key.startsWith('on')
const isProperty = key => key !== 'children' && !isEvent(key)
const isNew = (prev, next) => key => prev[key] !== next[key]
const isGone = (prev, next) => key => !(key in next)
function updateDom(dom, prevProps, nextProps) {
  // 监听事件改变
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2)
      dom.removeEventListener(eventType, prevProps[name])
    })

  // 删除在 nextProps 中不存在的 prevProps 字段
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      dom[name] = ''
    })

  // 新增或修改 nextProps 中的值
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      dom[name] = nextProps[name]
    })

  // 新增绑定事件
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2)
      dom.addEventListener(eventType, nextProps[name])
    })
}
function commitWork(fiber) {
  if (!fiber) return 
  const domParent = fiber.parent.dom

  if (fiber.effectTag === 'PLACEMENT' && fiber.dom != null) {
    domParent.appendChild(fiber.dom)
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props)
  } else if (fiber.effectTag === 'DELETION') {
    domParent.removeChild(fiber.dom)
  }

  commitWork(fiber.child)
  commitWork(fiber.sibling)
}
function commitRoot() {
  deletions.forEach(commitWork)
  commitWork(wipRoot.child)
  currentRoot = wipRoot
  wipRoot = null
}
let currentRoot = null
let deletions = null
function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: currentRoot
  }
  deletions = []
  nextUnitOfWork = wipRoot
}
// 执行单元任务 返回下一个单元任务
function peformUnitOfWork(fiber) {
  // add dom
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  } 

  const elements = fiber.props.children
  // 将当前 fiber 的子节点加入到 fiber tree 中
  reconcileChildren(fiber, elements)
  
  // return nextUnitOfWork 
  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber
  while(nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}
function reconcileChildren(wipFiber, elements) {
  let index = 0
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child
  let prevSibling = null

  while(index < elements.length || oldFiber != null) {
    const element = elements[index]
    let newFiber = null

    // 对比element 和 oldFiber
    const sameType = oldFiber && element && element.type === oldFiber.type

    // 更新
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: 'UPDATE'
      }
    }
    // 新增
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: 'PLACEMENT'
      }
    }
    // 删除
    if (oldFiber && !sameType) {
      oldFiber.effectTag = 'DELETION'
      deletions.push(oldFiber)
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }

    if (index === 0) {
      wipFiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
    index++
  }
}
```

## Function Components

``` js
function App(props) {
  return Didact.createElement(
    'h1', 
    null,
    'hi ',
    props.name
  )
}
const element = Didact.createElement(App, {
  name: 'foo'
})
function performUnitOfWork(fiber) {
  const isFunctionComponent = fiber.type instanceof Function
  if (isFunctionComponent) {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
  }

  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber
  while(nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}
function updateFunctionComponent(fiber) {
  const children = [fiber.type(fiber.props)]
  reconcileChildren(fiber, children)
}
function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  } 
  reconcileChildren(fiber, fiber.props.children)
}

function commitWork(fiber) {
  if (!fiber) return 
  let parentDomFiber = fiber.parent
  while(!parentDomFiber.dom) {
    parentDomFiber = parentDomFiber.parent
  }
  const parentDom = parentDomFiber.dom
  
  if (fiber.effectTag === 'PLACEMENT' && fiber.dom != null) {
    parentDom.appendChild(fiber.dom)
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props)
  } else if (fiber.effectTag === 'DELETION') {
    commitDeletion(fiber, parentDom)
  }
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}
function commitDeletion(fiber, parentDom) {
  if (fiber.dom) {
    parentDom.removeChild(fiber.dom)
  } else {
    commitDeletion(fiber.child, parentDom)
  }
}


```

## Hooks

``` js
let wipFiber = null
let hookIndex = null
function updateFunctionComponent(fiber) {
  wipFiber = fiber
  hookIndex = 0
  wipFiber.hooks = []
  const children = [fiber.type(fiber.props)]
  reconcileChildren(fiber, children)
}
function useState(initial) {
  const oldHook = wipFiber.alternate && wipFiber.alternate.hooks && wipFiber.alternate.hooks[hookIndex]
  const hook = {
    state: oldHook ? oldHook.state: initial,
    queue: []
  }

  const actions = oldHook ? oldHook.queue: []
  actions.forEach(action => {
    hook.state = action(hook.state)
  })

  const setState = action => {
    hook.queue.push(action)
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot
    }
    nextUnitOfWork = wipRoot
    deletions = []
  }

  wipFiber.hooks.push(hook)
  hookIndex++
  return [hook.state, setState]
}
const Didact = {
  createElement,
  render,
  useState
}
/** @jsx Didact.createElement */
function Counter () {
  const [state, setState] = useState(1)
  return (
    <h1 onClick={() => setState(c => c + 1)}>
      Count: {state}
    </h1>
  )
}
const element = <Counter />
```