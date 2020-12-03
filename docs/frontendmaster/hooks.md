useRef      通过useRef创建的对象，其值只有一份，而且在所有Renderer之间共享  
useReducer  将依赖隐藏，只暴露dispath方法  
useEffect   监听依赖变化后执行回调  
useCallback 缓存函数，将函数的参数依赖隐藏，只暴露方法名的依赖  
useMemo     缓存变量，优化渲染  
useContext  局部上下文  

``` jsx
// 获取最新的值，而不是渲染后闭包中的值
const useCurrentValue = (val) => {
  const [value, setValue] = useState(val)
  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref
}

// 确保 MyComponent 组件的默认引用相同
// ES6的默认赋值在每次渲染的时候引用都发生改变
MyComponent.defaultProps = {
  params: {
    x: 0,
    y: 0
  }
}
// 确保父组件传给子组件的引用不变
// bad 每次父组件更新的时候，传给子组件的 params 引用都会发生变化
function App() {
  const [count, setCount] = useState(0)
  const params = { x: 0 }
  return (
    <div>
      <Child params={params} />
      <div onClick={() => setCount(count + 1)}>{count}</div>
    </div>
  )
}
// good 传给子组件的 params 引用不变
function App() {
  const [count, setCount] = useState(0)
  const params = useRef({ x: 0 })
  return (
    <div>
      <Child params={params} />
      <div onClick={() => setCount(count + 1)}>{count}</div>
    </div>
  )
}
```


## 分层

### 状态与操作封装

``` js
export default useMethods = (methods, initialValue) => {
  const [val, setVal] = useState(initialValue)
  const boundMethods = useMemo(
    () => Object.entries(methods).reduce((acc, [name, fn]) => {
      const method = (...args) => {
        setVal(val => fn(val, ...args))
      }
      acc[name] = method
      return acc
    }, {}),
    [methods]
  )
  return [val, boundMethods, setVal]
}
```

### 封装常用数据结构

``` js
const useArray = (initialValue = []) => useMethods({
  push(state, item) {
    return state.concat(item)
  },
  remove(state, item) {
    const idx = state.indexOf(item)
    if (idx < 0) {
      return state
    }
    // 优化：用useImmer
    return [...state.slice(0, idx), ...state.slice(idx + 1)]
  }
}, initialValue)
const useNumber = (initialValue = 0) => useMethods({
  increment(val) {
    return val + 1
  },
  decrement(val) {
    return val - 1
  }
}, initialValue)
```

### 通用过程封装

``` js
const useTaskPending = task => {
  const [pendingCount, { increment, decrement }] = useNumber(0)
  const taskWithPending = useCallback(async (...args) => {
    increment()
    const result = await task(...args)
    decrement()
    return result
  }, [task, increment, decrement])
  return [taskWithPending, pendingCount > 0]
}

const useTaskPendingState = (task, storeResult) => {
  const [taskWithPending, pending] = useTaskPending(task)
  const callAndStore = useCallback((...args) => {
    const result = await taskWithPending(...args)
    storeResult(result)
  }, [taskWithPending, storeResult])
  return [callAndStore, pending]
}
```

### 拼装成业务

``` js
const useUserList = () => {
  const [users, { push, remove }, setUsers] = useArray([])
  const [load, pending] = useTaskPendingState(getUsers, setUsers)
  return [users, { pending, load, addUser: push, deleteUser: remove }]
}
```

## 状态粒度细分

同类型的状态保存，避免状态拆分的过细，导致连续多个状态的更新，最佳实践是选择 useReducer  
同时过粗的拆分会导致耦合性过大，不利于复用  

